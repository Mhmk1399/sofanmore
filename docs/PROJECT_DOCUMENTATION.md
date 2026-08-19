# Sofa N More Technical Documentation

Last updated: 2026-08-19

This document describes the Sofa N More Next.js application, including the public website, lead capture platform, file upload flow, authentication, admin dashboard, project portfolio system, MongoDB models, API routes, and the important `lib` modules.

## 1. Overview

Sofa N More is a Next.js, TypeScript and MongoDB application for a London furniture and interiors business.

The application has three main responsibilities:

- Public marketing pages for services, workshop, gallery, contact, policy and terms content.
- A reusable lead capture platform for contact enquiries and service-specific lead forms.
- An admin dashboard for managing leads, users, admin profile data and published portfolio projects.

The lead system uses a shared `Lead` model. Common lead fields live at the root of the lead document, while service-specific fields are stored in `Lead.serviceData`.

The project system stores completed client work and portfolio/case-study records. These are not retail products.

## 2. Technology Stack

Reference file: `package.json`

- Next.js `16.3.0`
- React `19.2.8`
- TypeScript
- MongoDB native driver
- Mongoose schemas/models for typed database shape definitions
- AWS S3 SDK for S3-compatible object storage
- Lenis for smooth scrolling on public pages
- Lucide React for icons
- Vitest for tests
- CSS variables and utility classes for the Sofa N More claymorphism design system

Common scripts:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

## 3. Folder Structure

```text
app/
  api/
    admin/projects/
    admin/users/
    auth/
    leads/
    uploads/
  admin/
  contact-us/
  login/
  projects/
  services/
  sitemap.ts
  robots.ts

components/
  admin/
  auth/
  global/
  lead-capture/
  static/
  ui/

lib/
  api-response.ts
  auth-password.ts
  auth-session.ts
  auth-validation.ts
  http.ts
  lead-admin.ts
  lead-admin-repository.ts
  lead-analytics.ts
  lead-cleanup.ts
  lead-config.ts
  lead-notifications.ts
  lead-repository.ts
  lead-validation.ts
  mongodb.ts
  project-repository.ts
  project-service.ts
  project-validation.ts
  security.ts
  site.ts
  upload-storage.ts
  user-repository.ts

models/
  lead.ts
  project.ts
  user.ts

tests/
  auth-profile-validation.test.ts
  project-api.test.ts
  project-validation.test.ts
```

## 4. Environment Variables

Real secrets must never be committed to git or copied into documentation.

The application uses these environment variables:

- `DATABASE_URL`: MongoDB connection string. If the username or password contains special characters such as `@`, `#`, `:` or `/`, those characters must be URL-encoded.
- `MONGODB_DB` or `MONGO_DB`: optional database name override.
- `AUTH_SESSION_SECRET`: secret used to sign the auth session cookie. In production it must be strong and at least 32 characters.
- `IP_HASH_SECRET`: secret used for IP hashing and upload session hashing. It should be set in production.
- `NEXT_PUBLIC_SITE_URL`: public site origin used for canonical URLs, metadata and same-origin checks.
- `ALLOWED_FORM_ORIGINS`: optional comma-separated list of extra origins allowed to submit forms.
- `UPLOAD_BUCKET`: S3-compatible upload bucket.
- `UPLOAD_REGION`: upload storage region.
- `UPLOAD_ENDPOINT`: optional S3-compatible provider endpoint.
- `UPLOAD_ACCESS_KEY_ID`: upload storage access key.
- `UPLOAD_SECRET_ACCESS_KEY`: upload storage secret key.
- `UPLOAD_PUBLIC_BASE_URL`: public base URL used to render uploaded lead and project files.
- `UPLOAD_FORCE_PATH_STYLE`: set to `true` if the storage provider requires path-style requests.

## 5. Database Models

### 5.1 Lead

File: `models/lead.ts`

Collection: `leads`

The `Lead` document stores every customer request submitted through contact and service forms.

Lead services:

- `CONTACT_ENQUIRY`
- `BESPOKE_SOFA`
- `COMMERCIAL_SOFA`
- `INTERIOR_DESIGN`
- `SOFA_REPAIR_RESTORATION`

Lead statuses:

- `NEW`
- `CONTACTED`
- `QUALIFIED`
- `QUOTED`
- `WON`
- `LOST`
- `SPAM`

Main fields:

- `service`: lead service/category.
- `status`: current admin status.
- `name`, `email`, `phone`, `postcode`, `message`.
- `sourcePage`, `referrer`.
- UTM fields: `utmSource`, `utmMedium`, `utmCampaign`, `utmTerm`, `utmContent`.
- `serviceData`: flexible record for form-specific fields.
- `consentPrivacy` and `consentMarketing`.
- `idempotencyKey`: prevents duplicate form submissions.
- `ipHash`, `userAgent`.
- `attachmentCount`.
- `statusUpdatedAt`, `createdAt`, `updatedAt`.

Important indexes are created in `lib/mongodb.ts`:

- `idempotencyKey` unique.
- `service + status + createdAt`.
- `postcode + createdAt`.
- `createdAt`.

### 5.2 LeadAttachment

File: `models/lead.ts`

Collection: `lead_uploads`

`LeadAttachment` stores metadata for files uploaded through lead forms. Binary file data is never stored in MongoDB.

Attachment statuses:

- `PENDING`: signed upload has been created, but the object has not been confirmed.
- `COMPLETE`: object exists in storage and is ready to attach to a lead.
- `ATTACHED`: upload has been attached to a lead.
- `FAILED`: upload failed validation or completion.

Main fields:

- `uploadToken`
- `uploadSessionHash`
- `leadId`
- `originalName`, `safeName`
- `storageKey`
- `mimeType`, `sizeBytes`, optional dimensions
- `service`
- `status`
- `ipHash`, `userAgent`
- `etag`
- `expiresAt`, `completedAt`, `attachedAt`
- `createdAt`, `updatedAt`

Important indexes:

- `uploadToken` unique.
- `uploadSessionHash + status + createdAt`.
- `leadId + createdAt`.
- `expiresAt` for orphan upload cleanup.

### 5.3 User

File: `models/user.ts`

Collection: `users`

The user model supports phone/password authentication and role-based access.

Roles:

- `USER`
- `ADMIN`

Main fields:

- `name`
- `phone`
- `phoneNormalized`
- `passwordHash`
- `role`
- `isActive`
- `lastLoginAt`
- `createdAt`
- `updatedAt`

Important indexes:

- `phoneNormalized` unique.
- `role + createdAt`.
- `createdAt`.

### 5.4 Project

File: `models/project.ts`

Collection: `projects`

The `Project` model stores completed Sofa N More client projects and portfolio case studies. A project is not a retail product.

Project services:

- `BESPOKE_SOFA`
- `COMMERCIAL_SOFA`
- `INTERIOR_DESIGN`
- `SOFA_REPAIR_RESTORATION`

Main fields:

- `projectCode`: required unique integer, `1000` or higher.
- `title`: required project title, max 160 characters.
- `slug`: required unique URL-safe slug.
- `service`: required project service.
- `coverImageUrl`: required public cover image URL/path.
- `coverImageStorageKey`: optional storage key for uploaded cover image.
- `images`: ordered gallery images.
- `excerpt`: required short project introduction, max 500 characters.
- `brief`, `approach`, `details`, `result`: optional long-form story fields.
- `locationLabel`: optional broad location label such as `North West London`.
- `featured`: controls homepage Selected Projects visibility.
- `published`: controls public visibility.
- `createdAt`, `updatedAt`.

Project image shape:

```ts
type ProjectImage = {
  id: string;
  url: string;
  storageKey?: string;
  alt: string;
  sortOrder: number;
};
```

Important indexes:

- `projectCode` unique.
- `slug` unique.
- `service + createdAt`.
- `featured + published + createdAt`.
- `published + createdAt`.
- `title + createdAt`.
- `createdAt`.

## 6. Backend Library Modules

### 6.1 `lib/mongodb.ts`

Owns MongoDB connection reuse, database selection, collection access and index creation.

Exports:

- `getMongoClient()`
- `getDb()`
- `getLeadCollections()`
- `getUserCollections()`
- `getProjectCollections()`
- `ensureLeadIndexes()`
- `ensureUserIndexes()`
- `ensureProjectIndexes()`

Notes:

- The database URL must begin with `mongodb://` or `mongodb+srv://`.
- The Mongo client is cached on `globalThis` to avoid reconnecting during development.
- Index creation is also memoized with promises on `globalThis`.

### 6.2 `lib/api-response.ts`

Defines the shared API response contract.

Exports:

- `ApiProblem`
- `ok(body, init?)`
- `emptyOk(init?)`
- `errorResponse(problem)`
- `validationError(fieldErrors, message?)`
- `handleApiError(error)`

Error shape:

```json
{
  "ok": false,
  "code": "VALIDATION_ERROR",
  "message": "Please check the highlighted fields.",
  "fieldErrors": {}
}
```

Success shape:

```json
{
  "ok": true
}
```

Backend code should throw `ApiProblem` for expected application errors. Unexpected errors are logged and returned as `SERVER_ERROR`.

### 6.3 `lib/http.ts`

Small HTTP helpers.

Current responsibility:

- Read and validate JSON request bodies for API routes.

Routes that accept JSON mutation payloads should use this helper.

### 6.4 `lib/security.ts`

Security helpers for same-origin validation.

Mutation routes use `assertSameOrigin(request)` to reject unexpected cross-origin requests.

Origin checks use:

- The request `Origin` header.
- `NEXT_PUBLIC_SITE_URL`.
- Optional `ALLOWED_FORM_ORIGINS`.

### 6.5 `lib/auth-password.ts`

Owns password hashing and password verification.

Responsibilities:

- Generate password salts.
- Hash passwords using Node crypto.
- Verify submitted passwords against stored password hashes.

### 6.6 `lib/auth-session.ts`

Owns cookie-based session management.

Responsibilities:

- Sign session payloads.
- Verify session cookies.
- Create session cookie headers.
- Clear session cookies.
- Enforce stronger secret requirements in production.

Important behavior:

- Admin access does not use a manual admin token.
- Auth state comes from signed cookies and database user role.

### 6.7 `lib/auth-validation.ts`

Validates signup, login, user updates and current-profile updates.

Main rules:

- Signup requires name, phone and strong password.
- Login requires phone and password.
- Phone numbers are normalized before lookup.
- New users sign up as `USER`.
- Admins can promote/demote users.
- Profile name/phone changes do not require password changes.
- Current password is required only when setting a new password.

### 6.8 `lib/user-repository.ts`

Owns user database operations.

Responsibilities:

- Create users.
- Find users by phone.
- Find users by ID.
- List users for admin.
- Update user role and active state.
- Update current profile data.
- Delete users.
- Update `lastLoginAt` on successful login.

Duplicate phone numbers are returned as `409 CONFLICT`.

### 6.9 `lib/lead-config.ts`

Defines lead capture configuration.

Responsibilities:

- Service labels and allowed file types.
- Per-service upload limits.
- Upload token TTL and signed URL TTL.
- File name sanitization.
- File extension helpers.
- Service-specific upload rules.

### 6.10 `lib/lead-validation.ts`

Validates all lead form submissions on the backend.

Responsibilities:

- Validate common lead fields.
- Validate service-specific fields.
- Validate consent fields.
- Validate attachment tokens.
- Preserve flexible `serviceData` while preventing unsafe data shape.

Service-specific validation includes:

- Bespoke sofa project details.
- Commercial seating venue and project requirements.
- Interior design needs and project stage.
- Sofa repair/restoration photo requirement.
- Contact enquiry payload.

### 6.11 `lib/lead-repository.ts`

Owns lead creation and lead attachment finalization.

Responsibilities:

- Insert leads.
- Enforce idempotency keys.
- Attach completed uploads to created leads.
- Count attachments.
- Preserve uploaded files on final lead creation retry where possible.

### 6.12 `lib/lead-admin.ts`

Admin authorization guard for lead/admin routes.

Responsibilities:

- Read the current session cookie.
- Load the user from MongoDB.
- Require active user status.
- Require `ADMIN` role.
- Return `401` or `403` using the shared `ApiProblem` pattern.

### 6.13 `lib/lead-admin-repository.ts`

Admin repository for reading, updating and deleting leads.

Responsibilities:

- List leads with pagination.
- Filter by search, service, status and date range.
- Fetch lead details with attachments.
- Patch lead status.
- Delete leads.
- Delete associated uploaded objects during lead deletion.

### 6.14 `lib/lead-analytics.ts`

Builds real dashboard analytics from MongoDB lead data.

Dashboard metrics include:

- Total lead count.
- New, active, won, lost and spam counts.
- Attachment counts.
- Leads grouped by status.
- Leads grouped by service.
- Daily trend data.
- Recent leads.

No fake analytics data is used.

### 6.15 `lib/lead-cleanup.ts`

Deletes orphan lead uploads that were never attached to a lead after the retention period.

Responsibilities:

- Find expired non-attached uploads.
- Delete matching objects from storage.
- Remove or mark upload records according to repository behavior.

### 6.16 `lib/upload-storage.ts`

Owns S3-compatible upload storage operations.

Exports:

- `getUploadStorageConfig()`
- `getUploadStorageClient()`
- `createStorageKey(input)` for lead uploads.
- `createProjectImageStorageKey(input)` for project images.
- `uploadObject(input)`
- `signUploadUrl(input)`
- `headUploadedObject(storageKey)`
- `deleteUploadedObject(storageKey)`
- `getPublicUploadUrl(storageKey)`

Storage prefixes:

- Lead uploads: `lead-uploads/<service>/<year>/<month>/...`
- Project uploads: `project-uploads/<year>/<month>/...`

### 6.17 `lib/project-validation.ts`

Validates project create/update payloads and project image uploads.

Responsibilities:

- Validate `projectCode` as an integer >= 1000.
- Validate title, slug, service and cover image URL.
- Generate safe slugs from titles.
- Validate gallery image objects.
- Validate optional text fields.
- Allow partial PATCH payloads.
- Validate publish/featured booleans.
- Validate upload MIME type, extension and file size.

### 6.18 `lib/project-repository.ts`

Owns all project database operations.

Exports:

- `serializeProject(project)`
- `listProjects(query)`
- `createProject(input)`
- `getProjectById(projectId)`
- `getPublishedProjectBySlug(slug)`
- `listPublishedProjects(limit?)`
- `listFeaturedProjects(limit?)`
- `updateProject(projectId, input)`
- `deleteProject(projectId)`

Important behavior:

- Create resolves slug collisions safely.
- Update does not change slug unless a slug is explicitly submitted.
- Duplicate project code and slug errors become `409 CONFLICT`.
- Replaced uploaded images are deleted from storage.
- Deleting a project deletes uploaded cover/gallery objects by stored storage keys.
- Manual public image URLs are allowed and do not create storage keys.

### 6.19 `lib/project-service.ts`

Shared project service mapping.

Exports:

- `projectServiceLabels`
- `projectServiceRoutes`

Maps project services to public service pages:

- `BESPOKE_SOFA` -> `/services/bespoke-sofas`
- `COMMERCIAL_SOFA` -> `/services/commercial-sofas`
- `INTERIOR_DESIGN` -> `/services/interior-design`
- `SOFA_REPAIR_RESTORATION` -> `/services/sofa-repair-restoration`

### 6.20 `lib/site.ts`

Central site configuration.

Responsibilities:

- Site name, URL, locale, contact details and address.
- Static sitemap route list.
- `absoluteUrl(path)` helper.
- Default OpenGraph image.

## 7. API Routes

### 7.1 Lead API

#### `POST /api/leads`

Creates a lead from public/contact/service forms.

Behavior:

- Validates JSON body.
- Validates common and service-specific fields.
- Validates attachment tokens.
- Creates lead record.
- Attaches completed uploads.
- Returns structured success or API errors.

#### `GET /api/leads`

Admin-only route for paginated lead listing.

Query parameters:

- `page`
- `limit`
- `search`
- `service`
- `status`
- `dateFrom`
- `dateTo`

#### `GET /api/leads/[leadId]`

Admin-only route for lead details and attachments.

#### `PATCH /api/leads/[leadId]`

Admin-only route for updating lead status.

#### `DELETE /api/leads/[leadId]`

Admin-only route for deleting a lead and its associated uploaded objects.

#### `GET /api/leads/analytics`

Admin-only route for real dashboard analytics.

### 7.2 Upload API

#### `POST /api/uploads/sign`

Creates a lead upload record and returns a signed upload URL.

The client uploads the binary file directly to storage using the signed URL.

#### `POST /api/uploads/complete`

Confirms that the uploaded object exists in storage, validates the object metadata and marks the upload as complete.

### 7.3 Auth API

#### `POST /api/auth/signup`

Creates a normal `USER` account using name, phone and password.

#### `POST /api/auth/login`

Authenticates by phone and password and creates a signed session cookie.

#### `POST /api/auth/logout`

Clears the session cookie.

#### `GET /api/auth/me`

Returns the current authenticated user or `null`.

#### `PATCH /api/auth/me`

Updates the current user's name, phone and optionally password.

### 7.4 Admin Users API

#### `GET /api/admin/users`

Admin-only user list.

Query parameters:

- `search`
- `role`

#### `PATCH /api/admin/users/[userId]`

Admin-only user update. Supports role and active-state changes.

#### `DELETE /api/admin/users/[userId]`

Admin-only user deletion.

### 7.5 Admin Projects API

#### `GET /api/admin/projects`

Admin-only project list.

Query parameters:

- `search`
- `service`
- `published`
- `featured`

Response:

```json
{
  "ok": true,
  "projects": [],
  "total": 0,
  "latestCode": null
}
```

#### `POST /api/admin/projects`

Admin-only project creation.

Required fields:

- `projectCode`
- `title`
- `service`
- `coverImageUrl`
- `excerpt`

Optional fields:

- `slug`
- `coverImageStorageKey`
- `images`
- `brief`
- `approach`
- `details`
- `result`
- `locationLabel`
- `featured`
- `published`

#### `GET /api/admin/projects/[projectId]`

Admin-only project detail.

#### `PATCH /api/admin/projects/[projectId]`

Admin-only project update. Partial updates are supported.

#### `DELETE /api/admin/projects/[projectId]`

Admin-only project deletion. Uploaded cover and gallery objects are deleted when storage keys are present.

#### `POST /api/admin/projects/upload`

Admin-only image upload endpoint for project cover/gallery images.

Rules:

- Field name: `file`.
- MIME types: `image/jpeg`, `image/png`, `image/webp`.
- Extensions: `jpg`, `jpeg`, `png`, `webp`.
- Maximum size: 10MB.
- Returns `imageUrl` and `imageStorageKey`.

## 8. Frontend Architecture

### 8.1 Root Layout

File: `app/layout.tsx`

Root layout includes:

- PWA registration.
- Toast provider.
- JSON-LD site structured data.
- Smooth scroll provider.
- Global navbar.
- Mobile floating logo.
- Breadcrumbs.
- Floating contact menu.
- Footer.

The admin dashboard hides public chrome while open and preserves the toast root.

### 8.2 Toast System

File: `components/ui/ToastProvider.tsx`

Shared UI feedback system for:

- Success messages.
- Error messages.
- Info messages.

Admin actions and lead forms should show request feedback through Toast rather than inline custom notification systems.

### 8.3 Login Page

Files:

- `app/login/page.tsx`
- `components/auth/LoginPageContent.tsx`

Supports:

- Signup with name, phone and password.
- Login with phone and password.
- Strong password validation.
- Redirect to requested admin path when appropriate.

### 8.4 Admin Dashboard

Files:

- `app/admin/page.tsx`
- `components/admin/LeadAdminDashboard.tsx`
- `components/admin/AdminSidebar.tsx`
- `components/admin/AdminOverview.tsx`
- `components/admin/AdminLeads.tsx`
- `components/admin/AdminUsers.tsx`
- `components/admin/AdminProjects.tsx`
- `components/admin/AdminProfile.tsx`
- `components/admin/adminShared.tsx`

Dashboard sections:

- `overview`
- `leads`
- `projects`
- `users`
- `profile`

Dashboard behavior:

- Requires an active `ADMIN` session.
- Redirects unauthenticated users to `/login?next=%2Fadmin`.
- Redirects non-admin users away from admin.
- Uses real database data.
- Uses Toast for CRUD success/error/info messages.
- Uses confirmation modal for logout and destructive deletes.
- Uses native selects inside tables to avoid dropdown clipping.
- Uses custom dropdowns in filters and compact forms where safe.

### 8.5 Admin Projects

File: `components/admin/AdminProjects.tsx`

Capabilities:

- Create projects.
- Edit projects.
- Delete projects.
- Search by title, slug, location label or project code.
- View latest project code.
- Enter custom project code.
- Set service.
- Upload cover image with progress.
- Upload multiple gallery images with progress compatibility.
- Preview uploaded/manual images.
- Edit gallery image alt text.
- Reorder gallery images with move-left/move-right controls.
- Remove gallery images before save.
- Toggle `published` and `featured`.

### 8.6 Shared Lead Form System

Files:

- `components/lead-capture/LeadFormShell.tsx`
- `components/lead-capture/ClayFormControls.tsx`
- Service-specific form components.

Shared features:

- Claymorphism inputs.
- Custom dropdowns and date picker.
- Multi-file upload controls.
- Per-file upload progress.
- Toast-based success/error feedback.
- Server-side validation through `/api/leads`.
- Preservation of entered values and completed uploads after submission errors.

### 8.7 Service Sticky CTA

File: `components/static/services/ServiceStickyCta.tsx`

Service pages include a subtle fixed CTA that links to the lead form anchor on the same page.

Anchors:

- Bespoke sofa: `#bespoke-sofa-enquiry`
- Commercial sofas: `#commercial-sofa-enquiry`
- Interior design: `#interior-design-enquiry`
- Sofa repair/restoration: `#sofa-repair-enquiry`

The CTA is CSS-only and positioned to avoid the mobile bottom navigation and floating contact button.

## 9. Lead Forms

### 9.1 Bespoke Sofa

File: `components/lead-capture/BespokeSofaLeadForm.tsx`

Service: `BESPOKE_SOFA`

Purpose: Capture bespoke sofa enquiries with contact details, sofa configuration, approximate dimensions, references and project message.

### 9.2 Commercial Sofas

File: `components/lead-capture/CommercialSofaLeadForm.tsx`

Service: `COMMERCIAL_SOFA`

Purpose: Capture commercial seating enquiries for restaurants, cafes, hotels, hospitality, offices, retail and other venues.

Commercial-specific data is stored in `Lead.serviceData`, including `companyName`.

### 9.3 Interior Design

File: `components/lead-capture/InteriorDesignLeadForm.tsx`

Service: `INTERIOR_DESIGN`

Purpose: Capture residential and commercial interior design enquiries, including project type, needs, stage, space size, style direction and references.

### 9.4 Sofa Repair & Restoration

File: `components/lead-capture/SofaRepairLeadForm.tsx`

Service: `SOFA_REPAIR_RESTORATION`

Purpose: Capture repair/restoration enquiries with photo upload prioritized.

Important behavior:

- At least one image is required.
- Accepted files are images only.
- Existing temporary uploads can be reused if final lead creation fails.

### 9.5 Contact Enquiry

File: `components/static/ContactFormSection.tsx`

Service: `CONTACT_ENQUIRY`

Purpose: Capture general contact messages from the contact page.

## 10. File Upload Flow

### 10.1 Lead Uploads

Lead uploads are a two-step flow:

1. Client calls `POST /api/uploads/sign`.
2. Client uploads the file directly to storage with the signed URL.
3. Client calls `POST /api/uploads/complete`.
4. Final lead submission references completed upload tokens.
5. Backend attaches completed uploads to the created lead.

This keeps binary file uploads out of the final lead JSON payload.

### 10.2 Project Uploads

Admin project image uploads use:

```text
POST /api/admin/projects/upload
```

The admin frontend uses XMLHttpRequest so upload progress remains available. The route uploads the file server-side to the same S3-compatible storage provider and returns a public URL plus storage key.

## 11. Public Project Pages

### 11.1 `/projects`

File: `app/projects/page.tsx`

Server Component that lists published projects only.

Each card includes:

- Cover image.
- Project code.
- Title.
- Service label.
- Excerpt.
- Optional location label.

Cards link to `/projects/[slug]`.

### 11.2 `/projects/[slug]`

File: `app/projects/[slug]/page.tsx`

Server Component that renders published projects only. Unpublished or missing projects return `notFound()`.

The page can render:

- Project hero.
- Project code.
- Service label.
- Location label.
- Cover image.
- Excerpt.
- Brief.
- Approach.
- Materials/details.
- Result.
- Gallery.
- Related service CTA.

Metadata uses the real project title, excerpt and cover image. It does not invent reviews, ratings, prices or customer names.

### 11.3 Homepage Selected Projects

Files:

- `app/page.tsx`
- `components/global/ProjectsSliderSection.tsx`
- `components/global/ProjectsSliderClient.tsx`

The homepage reads real featured projects where:

```ts
published === true && featured === true
```

If no real featured projects exist, it uses the existing demo fallback. Real and demo projects are not mixed.

## 12. SEO and Routing

Files:

- `app/sitemap.ts`
- `app/robots.ts`
- `lib/site.ts`

SEO behavior:

- Static public routes are listed in `siteRoutes`.
- `/projects` is included in the static sitemap routes.
- Published project detail URLs are added to the sitemap when MongoDB is available.
- Project detail pages generate metadata from real project data.
- Canonical, OpenGraph and Twitter metadata are set for project index/detail pages.

## 13. Authentication and Admin Access

Authentication is phone/password based.

Rules:

- Signup creates a normal `USER`.
- Admin role can be assigned by an existing admin.
- Admin routes require an active session and `ADMIN` role.
- No manual admin token is used anywhere.
- Inactive users cannot access protected areas.
- Logout clears the session cookie after confirmation in the admin UI.

## 14. Admin Data Management

The admin dashboard supports:

- Lead analytics.
- Lead filtering by search, service, status and date range.
- Lead details and attachments.
- Lead status update.
- Lead deletion.
- User search and role filtering.
- User role update.
- User active/inactive toggle.
- User deletion.
- Current admin profile update.
- Project CRUD.
- Project publishing and featured state management.

All mutation feedback should go through Toast.

## 15. Error Handling Contract

Expected API failures should use `ApiProblem`.

Status code guide:

- `400`: validation issue.
- `401`: unauthenticated.
- `403`: authenticated but unauthorized.
- `404`: missing record.
- `409`: uniqueness/conflict issue.
- `500`: unexpected server error.

Frontend behavior:

- Preserve useful API messages.
- Do not replace specific backend validation messages with generic messages.
- Show mutation success/error/info through Toast.

## 16. Testing

Current tests:

- `tests/project-validation.test.ts`
- `tests/project-api.test.ts`
- `tests/auth-profile-validation.test.ts`

Covered areas:

- Project validation success and failure.
- Project code rules.
- Slug generation.
- Partial project update validation.
- Project upload validation.
- Project admin API create/update/delete/upload contract.
- API error messages preserved for Toast display.
- Profile update validation.
- Password-change rules.

Recommended checks:

```bash
npx tsc --noEmit --pretty false
npx vitest run
npx eslint components/admin components/global lib models app/api app/projects app/page.tsx app/sitemap.ts tests
npm run build
```

Known note:

- A broad lint over the whole repository may report an existing `react-hooks/set-state-in-effect` issue in `components/global/Navbar.tsx`. That issue is unrelated to the Project refactor unless changed separately.

## 17. Operational Notes

- MongoDB stores metadata only; binary files live in object storage.
- Lead uploads live under `lead-uploads/`.
- Project uploads live under `project-uploads/`.
- Project `projectCode` must be unique and `>= 1000`.
- Project `slug` must be unique.
- Existing old `products` collection data is not dropped automatically.
- If old product data ever needs to be preserved, write a safe one-time migration from `products` to `projects`.
- Do not store precise customer addresses in project records; use broad `locationLabel` values only.
- Do not use fake admin/dashboard metrics.
- Do not mix demo projects with real featured projects on the homepage.

## 18. Adding a New Lead Service

To add a new lead service:

1. Add the service value to the lead service model/config.
2. Add backend validation in `lib/lead-validation.ts`.
3. Add service upload rules in `lib/lead-config.ts` if uploads are needed.
4. Build the client form using `LeadFormShell` and `ClayFormControls`.
5. Submit to `POST /api/leads`.
6. Store service-specific fields in `Lead.serviceData`.
7. Add admin display labels where needed.
8. Add focused validation tests.

## 19. Adding a New Project Service

To add a new project service:

1. Add the service enum value in `models/project.ts`.
2. Add the label and route in `lib/project-service.ts`.
3. Add the option in `components/admin/adminShared.tsx`.
4. Confirm project validation accepts the new service.
5. Add or update public service pages if needed.

## 20. Current Public Pages

Important public routes:

- `/`
- `/services`
- `/services/bespoke-sofas`
- `/services/commercial-sofas`
- `/services/interior-design`
- `/services/sofa-repair-restoration`
- `/projects`
- `/projects/[slug]`
- `/gallery`
- `/workshop`
- `/about-us`
- `/contact-us`
- `/faqs`
- `/blog`
- `/privacy-policy`
- `/terms-and-conditions`

Important app routes:

- `/login`
- `/admin`

Important API route groups:

- `/api/leads`
- `/api/uploads`
- `/api/auth`
- `/api/admin/users`
- `/api/admin/projects`
