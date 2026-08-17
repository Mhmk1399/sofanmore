# مستندات فنی پروژه Sofa N More

آخرین به روزرسانی: 2026-08-17

این سند نمای کلی پروژه، معماری بک اند و فرانت اند، مدل های دیتابیس، APIها، سیستم فرم های لید، آپلود فایل، احراز هویت، پنل ادمین و مخصوصا فایل های `lib` را توضیح می دهد.

## 1. نمای کلی

پروژه یک اپلیکیشن Next.js برای سایت Sofa N More است که علاوه بر صفحات محتوایی و سرویس ها، یک پلتفرم lead capture قابل استفاده مجدد دارد. لیدها از فرم های مختلف وارد یک مدل مشترک می شوند و تفاوت هر سرویس داخل `Lead.serviceData` ذخیره می شود.

سرویس های اصلی لید:

- `CONTACT_ENQUIRY`: پیام صفحه تماس
- `BESPOKE_SOFA`: فرم سفارش مبل سفارشی
- `COMMERCIAL_SOFA`: فرم مبل/نشستن تجاری
- `INTERIOR_DESIGN`: فرم طراحی داخلی
- `SOFA_REPAIR_RESTORATION`: فرم تعمیر و بازسازی مبل

بخش های مهم سیستم:

- MongoDB برای ذخیره لیدها، آپلودها و کاربران
- S3-compatible storage برای آپلود فایل های فرم
- Cookie based authentication برای ورود کاربر
- Role based access برای ادمین
- داشبورد `/admin` برای مشاهده، فیلتر، تحلیل، آپدیت وضعیت و حذف لیدها و مدیریت کاربران
- Toast system مشترک برای نمایش خطا، موفقیت و پیام های اطلاعاتی

## 2. تکنولوژی ها

فایل مرجع: `package.json`

- Next.js `16.3.0`
- React `19.2.8`
- TypeScript
- MongoDB native driver `mongodb`
- Mongoose برای تعریف schema/modelهای typed
- AWS S3 SDK برای signed upload URL
- Lenis برای smooth scroll در صفحات عمومی
- Lucide React برای آیکن ها
- Vitest برای تست
- Tailwind style classes و CSS variables برای دیزاین claymorphism

اسکریپت ها:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

## 3. ساختار کلی فولدرها

```text
app/
  api/
    admin/users/
    auth/
    leads/
    uploads/
  admin/
  login/
  services/
  contact-us/

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
  security.ts
  site.ts
  upload-storage.ts
  user-repository.ts

models/
  lead.ts
  user.ts

tests/
  auth.test.ts
  lead-admin.test.ts
  lead-validation.test.ts
```

## 4. متغیرهای محیطی

مقادیر واقعی نباید داخل داکیومنت یا git ذخیره شوند.

متغیرهای استفاده شده در کد:

- `DATABASE_URL`: آدرس اتصال MongoDB. اگر username/password کاراکتر خاص مثل `@`, `#`, `:` یا `/` دارد باید URL-encoded شود.
- `MONGODB_DB` یا `MONGO_DB`: نام دیتابیس MongoDB.
- `AUTH_SESSION_SECRET`: secret برای امضای session cookie. در production باید حداقل 32 کاراکتر باشد.
- `IP_HASH_SECRET`: secret برای hash کردن IP و upload session. در production باید تنظیم شود.
- `NEXT_PUBLIC_SITE_URL`: آدرس اصلی سایت برای canonical URL، origin check و metadata.
- `ALLOWED_FORM_ORIGINS`: originهای مجاز اضافه برای submit فرم ها، جدا شده با comma.
- `UPLOAD_BUCKET`: bucket فایل ها.
- `UPLOAD_REGION`: region استوریج.
- `UPLOAD_ENDPOINT`: endpoint اختیاری برای S3-compatible provider.
- `UPLOAD_ACCESS_KEY_ID`: access key استوریج.
- `UPLOAD_SECRET_ACCESS_KEY`: secret key استوریج.
- `UPLOAD_PUBLIC_BASE_URL`: base URL عمومی برای نمایش لینک فایل در ادمین.
- `UPLOAD_FORCE_PATH_STYLE`: اگر provider نیاز دارد مقدار `true`.

نکته عملیاتی: در حال حاضر `.env.example` در ریشه پروژه دیده نشد. بهتر است بعدا یک نسخه امن بدون مقدار محرمانه ساخته شود.

## 5. مدل های دیتابیس

### 5.1 Lead

فایل: `models/lead.ts`

کالکشن: `leads`

این مدل رکورد اصلی هر درخواست/لید را نگه می دارد.

فیلدهای اصلی:

- `service`: یکی از سرویس های تعریف شده در `LEAD_SERVICES`
- `status`: وضعیت لید
- `name`
- `email`
- `phone`
- `postcode`
- `message`
- `sourcePage`
- `referrer`
- `utmSource`, `utmMedium`, `utmCampaign`, `utmTerm`, `utmContent`
- `serviceData`: اطلاعات اختصاصی هر فرم
- `consentPrivacy`
- `consentMarketing`
- `idempotencyKey`: جلوگیری از ثبت تکراری فرم
- `ipHash`
- `userAgent`
- `attachmentCount`
- `statusUpdatedAt`
- `createdAt`
- `updatedAt`

وضعیت های لید:

- `NEW`
- `CONTACTED`
- `QUALIFIED`
- `QUOTED`
- `WON`
- `LOST`
- `SPAM`

ایندکس های مهم:

- `{ service: 1, status: 1, createdAt: -1 }`
- `{ postcode: 1, createdAt: -1 }` با `sparse`
- `{ createdAt: -1 }`
- `{ idempotencyKey: 1 }` با `unique`

### 5.2 LeadAttachment

فایل: `models/lead.ts`

کالکشن: `lead_uploads`

این مدل فایل های آپلود شده برای فرم های لید را نگه می دارد. فایل ابتدا به شکل موقت ذخیره می شود و بعد از ثبت موفق lead به همان lead وصل می شود.

فیلدهای اصلی:

- `uploadToken`
- `uploadSessionHash`
- `leadId`
- `originalName`
- `safeName`
- `storageKey`
- `mimeType`
- `sizeBytes`
- `width`
- `height`
- `service`
- `status`
- `ipHash`
- `userAgent`
- `etag`
- `expiresAt`
- `completedAt`
- `attachedAt`
- `createdAt`
- `updatedAt`

وضعیت های attachment:

- `PENDING`: رکورد ساخته شده، فایل هنوز تایید نشده
- `COMPLETE`: فایل در storage تایید شده، هنوز به lead وصل نشده
- `ATTACHED`: فایل به lead وصل شده
- `FAILED`: آپلود نامعتبر یا شکست خورده

ایندکس های مهم:

- `{ uploadSessionHash: 1, status: 1, createdAt: -1 }`
- `{ leadId: 1, createdAt: -1 }` با `sparse`
- `{ expiresAt: 1 }` با `sparse`

### 5.3 User

فایل: `models/user.ts`

کالکشن: `users`

برای ثبت نام، ورود و مدیریت سطح دسترسی استفاده می شود.

نقش ها:

- `USER`
- `ADMIN`

فیلدهای اصلی:

- `name`
- `phone`
- `phoneNormalized`
- `passwordHash`
- `role`
- `isActive`
- `lastLoginAt`
- `createdAt`
- `updatedAt`

ایندکس های مهم:

- `{ phoneNormalized: 1 }` با `unique`
- `{ role: 1, createdAt: -1 }`
- `{ createdAt: -1 }`

## 6. فایل های lib

### 6.1 `lib/mongodb.ts`

مسئول اتصال MongoDB و ساخت collection/indexهاست.

خروجی های اصلی:

- `getDatabaseUrl()`: مقدار `DATABASE_URL` را می خواند و protocol را چک می کند.
- `getMongoClient()`: اتصال MongoDB را در `globalThis` cache می کند.
- `getDb()`: دیتابیس را بر اساس `MONGODB_DB` یا `MONGO_DB` برمی گرداند.
- `getLeadCollections()`: کالکشن های `leads` و `lead_uploads`
- `getUserCollections()`: کالکشن `users`
- `ensureLeadIndexes()`: ایندکس های lead و upload
- `ensureUserIndexes()`: ایندکس های user

نکته: سیستم rate limit قبلی حذف شده و دیگر collection مربوط به rate limit در این فایل استفاده نمی شود.

### 6.2 `lib/api-response.ts`

قرارداد پاسخ API را یکپارچه می کند.

کدهای خطا:

- `VALIDATION_ERROR`
- `UPLOAD_INVALID`
- `UPLOAD_INCOMPLETE`
- `UPLOAD_FAILED`
- `DUPLICATE_SUBMISSION`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `CONFLICT`
- `NOT_FOUND`
- `SERVER_ERROR`

خروجی ها:

- `ok(data, init)`: پاسخ موفق JSON
- `emptyOk(init)`: پاسخ موفق بدون data
- `errorResponse(problem)`: ساخت پاسخ خطا
- `validationError(fieldErrors)`: ساخت خطای validation
- `handleApiError(error)`: تبدیل exception به response استاندارد
- `ApiProblem`: کلاس خطای اپلیکیشن

### 6.3 `lib/http.ts`

خواندن امن body درخواست JSON.

رفتار:

- فقط `application/json` را قبول می کند.
- content length را بررسی می کند.
- body را با limit پیش فرض `64KB` می خواند.
- JSON نامعتبر را به `VALIDATION_ERROR` تبدیل می کند.

### 6.4 `lib/security.ts`

ابزارهای امنیتی عمومی.

وظایف:

- گرفتن IP از headerها
- hash کردن IP با `IP_HASH_SECRET`
- hash کردن `uploadSessionId`
- کوتاه/نرمال کردن user agent
- `assertSameOrigin(request)` برای جلوگیری از submit از origin غیرمجاز

originهای مجاز از این منابع می آیند:

- `NEXT_PUBLIC_SITE_URL`
- origin خود request
- `ALLOWED_FORM_ORIGINS`

### 6.5 `lib/auth-password.ts`

هش و بررسی رمز عبور.

رفتار:

- از `crypto.scrypt` استفاده می کند.
- salt تصادفی 16 بایتی می سازد.
- فرمت ذخیره شده: `scrypt:v1:<salt>:<hash>`
- بررسی password با `timingSafeEqual` انجام می شود.

### 6.6 `lib/auth-session.ts`

مدیریت session cookie.

مشخصات:

- نام کوکی: `snm_session`
- مدت اعتبار: 7 روز
- token شامل payload امضا شده با HMAC SHA-256 است.
- کوکی `HttpOnly`, `SameSite=Lax`, `Path=/` است.
- در production کوکی `Secure` می شود.
- اگر `AUTH_SESSION_SECRET` در production کوتاه یا خالی باشد خطا می دهد.

خروجی ها:

- `createAuthSessionToken(userId)`
- `readAuthSessionToken(request)`
- `verifyAuthSessionToken(token)`
- `createAuthSessionCookie(userId)`
- `clearAuthSessionCookie()`

### 6.7 `lib/auth-validation.ts`

اعتبارسنجی فرم ثبت نام، ورود و patch کاربر.

ثبت نام:

- `name` اجباری، حداقل 2 کاراکتر
- `phone` اجباری و normalize شده
- `password` اجباری و قوی

قانون password قوی:

- حداقل 10 کاراکتر
- حداکثر 128 کاراکتر
- حروف کوچک
- حروف بزرگ
- عدد
- symbol

ورود:

- `phone`
- `password`

برای login قدرت password دوباره چک نمی شود تا کاربرهای قدیمی با رمز موجود هم بتوانند وارد شوند.

patch کاربر:

- `role`: فقط `USER` یا `ADMIN`
- `isActive`: boolean

### 6.8 `lib/user-repository.ts`

لایه دیتابیس کاربران.

وظایف:

- `createUserAccount(input)`: ساخت کاربر جدید با role پیش فرض `USER`
- `authenticateUser(input)`: login با phone/password و آپدیت `lastLoginAt`
- `getUserById(userId)`
- `getAuthenticatedUser(request)`: خواندن session cookie و گرفتن کاربر فعال
- `listUsers(query)`: لیست کاربران با search و role filter
- `updateUser(userId, patch)`: آپدیت role یا active state
- `deleteUser(userId)`: حذف کاربر

قانون مهم:

- سیستم اجازه نمی دهد آخرین admin فعال حذف شود یا سطح دسترسی/active بودنش طوری تغییر کند که هیچ admin فعالی باقی نماند.

### 6.9 `lib/lead-config.ts`

مرکز تنظیمات فرم های لید و آپلود.

تنظیمات عمومی:

- `MAX_UPLOAD_COUNT = 8`
- `MAX_UPLOAD_SIZE_BYTES = 10MB`
- `COMMERCIAL_UPLOAD_COUNT = 10`
- `COMMERCIAL_UPLOAD_SIZE_BYTES = 15MB`
- `INTERIOR_UPLOAD_COUNT = 10`
- `INTERIOR_UPLOAD_SIZE_BYTES = 15MB`
- `UPLOAD_SIGNED_URL_TTL_SECONDS = 15 دقیقه`
- `PENDING_UPLOAD_TTL_HOURS = 24`
- `COMPLETE_UPLOAD_TTL_HOURS = 48`
- `MIN_LEAD_COMPLETION_MS = 3000`
- `MAX_SERVICE_DATA_FIELDS = 24`

تعریف سرویس ها و فیلدها:

- `leadServiceDefinitions`: schema اختصاصی هر سرویس برای `serviceData`
- `leadUploadPolicies`: policy آپلود برای هر سرویس

فیلدهای مهم serviceData:

`CONTACT_ENQUIRY`

- `enquiryType`

`BESPOKE_SOFA`

- `projectType`
- `spaceType`
- `dimensionsKnown`
- `widthCm`
- `depthCm`
- `heightCm`
- `configuration`
- `upholsteryPreference`
- `comfortPreference`
- `accessRestrictions`

`COMMERCIAL_SOFA`

- `companyName`
- `venueType`
- `projectType`
- `projectStage`
- `approximateQuantity`
- `hasFloorPlan`
- `dimensionsKnown`
- `widthCm`
- `depthCm`
- `heightCm`
- `targetInstallationDate`

`INTERIOR_DESIGN`

- `projectType`
- `needs`
- `projectStage`
- `approximateSpaceSize`
- `styleDirection`
- `preferredContactMethod`

`SOFA_REPAIR_RESTORATION`

- `itemType`
- `issues`
- `approximateAge`
- `transportPreference`

ابزارهای فایل:

- `getLeadUploadPolicy(service)`
- `getFileExtension(fileName)`
- `sanitizeFileName(fileName)`
- `uploadValidationError(input)`
- `defaultExtensionForMime(mimeType)`

پسوندهای خطرناک مثل `exe`, `js`, `svg`, `php`, `sh`, `ps1` reject می شوند.

### 6.10 `lib/lead-validation.ts`

اعتبارسنجی اصلی submit لید و آپلود.

خروجی ها:

- `validateUploadSignInput(input)`
- `validateUploadCompleteInput(input)`
- `validateLeadSubmissionInput(input)`
- `getCompletedUploadExpiry()`

رفتارهای مهم:

- body باید object معتبر باشد.
- honeypot اگر پر باشد reject می شود.
- `formStartedAt` اجباری است و ارسال خیلی سریع تر از `MIN_LEAD_COMPLETION_MS` reject می شود.
- `service` باید یکی از `LEAD_SERVICES` باشد.
- `contact.name` و `contact.phone` پایه هستند.
- `email` normalize و lowercase می شود.
- `postcode` با الگوی UK postcode validate می شود.
- `privacyConsent` حتما باید `true` باشد.
- `marketingConsent` باید boolean باشد.
- `idempotencyKey` اجباری و با فرمت امن است.
- `sourcePage`, `referrer`, `utm` پاکسازی و محدود می شوند.
- `serviceData` بر اساس `leadServiceDefinitions` همان سرویس validate می شود.

قوانین اختصاصی:

- `CONTACT_ENQUIRY`: ایمیل و پیام حداقل 10 کاراکتر اجباری است، upload ندارد.
- `COMMERCIAL_SOFA`: ایمیل کاری و پیام حداقل 20 کاراکتر اجباری است. اگر `dimensionsKnown=true` باشد `widthCm` و `depthCm` اجباری می شوند.
- `INTERIOR_DESIGN`: ایمیل و پیام حداقل 20 کاراکتر اجباری است.
- `SOFA_REPAIR_RESTORATION`: postcode معتبر و حداقل یک عکس آپلود شده اجباری است؛ ایمیل و message اختیاری هستند.

### 6.11 `lib/lead-repository.ts`

لایه دیتابیس برای ثبت lead و مدیریت uploadهای موقت.

توابع:

- `createPendingUpload(input)`: ساخت رکورد upload با status `PENDING`
- `completeUpload(input)`: تایید اینکه فایل واقعا در storage وجود دارد و metadata درست است
- `createLeadWithAttachments(input)`: ساخت lead و attach کردن uploadها در transaction

رفتارهای مهم:

- `uploadToken` تصادفی ساخته می شود.
- مالکیت upload با `ipHash`, `userAgent` و `uploadSessionHash` چک می شود.
- upload باید `COMPLETE` باشد تا به lead وصل شود.
- upload نمی تواند قبلا به lead دیگری attach شده باشد.
- `idempotencyKey` جلوی submit تکراری را می گیرد.
- lead و attach شدن فایل ها داخل transaction انجام می شوند.

### 6.12 `lib/upload-storage.ts`

ارتباط با S3-compatible object storage.

توابع:

- `getUploadStorageConfig()`: خواندن envهای استوریج
- `getUploadStorageClient()`: ساخت و cache کردن `S3Client`
- `createStorageKey(input)`: ساخت مسیر فایل مثل `lead-uploads/<service>/<year>/<month>/<random>.<ext>`
- `signUploadUrl(input)`: ساخت signed PUT URL
- `headUploadedObject(storageKey)`: گرفتن metadata فایل بعد از آپلود
- `deleteUploadedObject(storageKey)`: حذف فایل از storage
- `getPublicUploadUrl(storageKey)`: ساخت URL عمومی برای پنل ادمین، اگر `UPLOAD_PUBLIC_BASE_URL` تنظیم شده باشد

### 6.13 `lib/lead-cleanup.ts`

پاکسازی uploadهای orphan.

رفتار:

- uploadهایی که `leadId` ندارند و `expiresAt` آنها گذشته، پیدا می شوند.
- فایل از storage حذف می شود.
- رکورد مربوط از `lead_uploads` حذف می شود.
- cleanup حداکثر هر یک ساعت یک بار schedule می شود.

این cleanup در routeهای leads/uploads صدا زده می شود تا uploadهای موقت باقی مانده خودکار جمع شوند.

### 6.14 `lib/lead-admin.ts`

اعتبارسنجی و guardهای پنل admin برای leadها.

توابع:

- `assertLeadAdmin(request)`: فقط کاربر `ADMIN` فعال اجازه دسترسی دارد.
- `parseLeadListQuery(searchParams)`: page, limit, service, status, search, date range
- `parseLeadAnalyticsQuery(searchParams)`
- `validateLeadObjectId(value)`
- `validateLeadStatusPatch(value)`

محدودیت pagination:

- page size پیش فرض `25`
- page size حداکثر `100`

### 6.15 `lib/lead-admin-repository.ts`

لایه دیتابیس پنل ادمین برای leadها.

توابع:

- `listLeads(query)`: لیست leadها با pagination، فیلتر و attachmentها
- `getLeadAnalytics(query)`: آمار واقعی از دیتابیس
- `getLeadById(leadId)`: جزئیات lead و attachmentها
- `updateLeadStatus(leadId, status)`: تغییر status
- `deleteLead(leadId)`: حذف lead، رکورد attachmentها و فایل های storage

فیلتر search روی این فیلدها اعمال می شود:

- `name`
- `email`
- `phone`
- `postcode`
- `message`
- `sourcePage`
- `referrer`
- `serviceData.companyName`
- `serviceData.projectType`
- `serviceData.venueType`
- `serviceData.itemType`

analytics شامل:

- summary کلی
- شمارش بر اساس status
- شمارش بر اساس service
- مجموع attachmentها
- daily trend
- recent leads

### 6.16 `lib/lead-analytics.ts`

فعلا analytics adapter ساده است.

eventهای تعریف شده:

- `UPLOAD_SIGNED`
- `UPLOAD_COMPLETED`
- `LEAD_SUBMITTED`

در development eventها را با `console.info` لاگ می کند. برای اتصال به ابزار واقعی مثل PostHog یا GA، همین فایل محل مناسب توسعه است.

### 6.17 `lib/lead-notifications.ts`

adapter ارسال notification برای lead جدید.

فعلا در development فقط log می کند:

- `leadId`
- `service`
- `sourcePage`
- `attachmentCount`

برای ایمیل، Slack یا CRM باید implementation همین notifier عوض شود.

### 6.18 `lib/site.ts`

تنظیمات عمومی سایت و SEO.

شامل:

- نام سایت
- URL
- description
- locale/language
- ایمیل و تلفن
- آدرس
- area served
- routeهای sitemap
- `absoluteUrl(path)`
- `defaultOgImage`

## 7. API Routes

### 7.1 Lead API

#### `POST /api/leads`

مسیر ثبت همه لیدها، شامل فرم تماس و 4 فرم سرویس.

جریان:

1. بررسی same-origin
2. schedule cleanup آپلودهای orphan
3. خواندن JSON body
4. اعتبارسنجی با `validateLeadSubmissionInput`
5. ساخت lead و attach کردن فایل ها با `createLeadWithAttachments`
6. ثبت analytics event
7. ارسال notification اگر duplicate نبود
8. پاسخ `{ leadId }`

#### `GET /api/leads`

فقط admin.

queryهای پشتیبانی شده:

- `page`
- `limit`
- `service`
- `status`
- `q` یا `search`
- `dateFrom` یا `from`
- `dateTo` یا `to`

پاسخ شامل:

- `leads`
- `pagination`

#### `GET /api/leads/[leadId]`

فقط admin. جزئیات یک lead همراه attachmentها.

#### `PATCH /api/leads/[leadId]`

فقط admin.

body:

```json
{
  "status": "CONTACTED"
}
```

#### `DELETE /api/leads/[leadId]`

فقط admin.

lead، رکورد attachmentها و فایل های storage را حذف می کند.

#### `GET /api/leads/analytics`

فقط admin.

همان فیلترهای lead list را می گیرد و summary/dashboard data واقعی از دیتابیس می سازد.

### 7.2 Upload API

#### `POST /api/uploads/sign`

برای شروع upload.

body:

```json
{
  "service": "COMMERCIAL_SOFA",
  "fileName": "floor-plan.pdf",
  "mimeType": "application/pdf",
  "sizeBytes": 123456,
  "uploadSessionId": "upload:client-generated-id"
}
```

پاسخ:

```json
{
  "uploadToken": "...",
  "uploadUrl": "...",
  "storageKey": "...",
  "expiresIn": 900,
  "requiredHeaders": {
    "Content-Type": "application/pdf"
  }
}
```

#### `POST /api/uploads/complete`

بعد از PUT فایل روی signed URL صدا زده می شود.

body:

```json
{
  "uploadToken": "..."
}
```

این route با `HeadObject` چک می کند فایل واقعا در storage هست و metadata آن با policy سرویس سازگار است.

### 7.3 Auth API

#### `POST /api/auth/signup`

ثبت نام کاربر.

body:

```json
{
  "name": "User Name",
  "phone": "07123456789",
  "password": "StrongPassword!2026"
}
```

کاربر جدید همیشه با role `USER` ساخته می شود. بعد از signup کوکی session ست می شود.

#### `POST /api/auth/login`

ورود با شماره و پسورد.

body:

```json
{
  "phone": "07123456789",
  "password": "StrongPassword!2026"
}
```

بعد از login کوکی session ست می شود.

#### `POST /api/auth/logout`

کوکی session را پاک می کند.

#### `GET /api/auth/me`

کاربر فعلی را از روی session cookie برمی گرداند.

### 7.4 Admin Users API

#### `GET /api/admin/users`

فقط admin.

queryها:

- `search`
- `role`

#### `PATCH /api/admin/users/[userId]`

فقط admin و same-origin.

body:

```json
{
  "role": "ADMIN",
  "isActive": true
}
```

هر دو فیلد اختیاری هستند، اما حداقل یکی باید ارسال شود.

#### `DELETE /api/admin/users/[userId]`

فقط admin و same-origin.

حذف آخرین admin فعال مجاز نیست.

## 8. فرانت اند

### 8.1 Root Layout

فایل: `app/layout.tsx`

layout اصلی اینها را در تمام سایت mount می کند:

- `PwaRegister`
- `ToastProvider`
- JSON-LD سایت
- `SmoothScrollProvider`
- `Navbar`
- `MobileFloatingLogo`
- `Breadcrumbs`
- `FloatingContactMenu`
- محتوای صفحه
- `Footer`

نکته admin:

- `SmoothScrollProvider` روی مسیرهای `/admin` غیرفعال می شود.
- `Breadcrumbs`, `FloatingContactMenu`, `MobileFloatingLogo` روی `/admin` نمایش داده نمی شوند.

### 8.2 Toast System

فایل: `components/ui/ToastProvider.tsx`

Toastها از event سراسری `sofanmore-toast` می آیند.

hook:

```ts
const toast = useToast();
toast.success("Saved");
toast.error("Failed");
toast.info("Loading");
```

این سیستم در فرم های lead، فرم تماس، login و admin استفاده شده است.

### 8.3 Login Page

فایل ها:

- `app/login/page.tsx`
- `components/auth/LoginPageContent.tsx`

قابلیت ها:

- login با شماره و password
- signup با نام، شماره و password
- validation سمت کلاینت
- ارسال به `/api/auth/login` یا `/api/auth/signup`
- نمایش toast برای خطا/موفقیت
- redirect به `next` اگر query امن باشد

### 8.4 Admin Dashboard

فایل ها:

- `app/admin/page.tsx`
- `components/admin/LeadAdminDashboard.tsx`

محافظت سمت سرور:

- صفحه `/admin` ابتدا cookie `snm_session` را می خواند.
- اگر session وجود نداشته باشد redirect می کند به `/login?next=%2Fadmin`.
- اگر کاربر فعال نباشد یا role او `ADMIN` نباشد redirect می کند به login.
- admin token دستی وجود ندارد.

قابلیت های داشبورد:

- overview با metrics واقعی از دیتابیس
- trend chart روزانه
- breakdown بر اساس service
- breakdown بر اساس status
- recent leads
- جدول leadها
- filter با service, status, search, dateFrom, dateTo
- pagination
- باز کردن جزئیات lead
- مشاهده contact, message, source, UTM, serviceData, attachments
- تغییر status lead
- حذف lead
- مدیریت کاربران
- فیلتر کاربران با search و role
- تغییر role کاربر
- active/disabled کردن کاربر
- حذف کاربر
- logout

### 8.5 Shared Lead Form System

فایل ها:

- `components/lead-capture/LeadFormShell.tsx`
- `components/lead-capture/ClayFormControls.tsx`

`LeadFormShell` قاب مشترک فرم هاست:

- عنوان و توضیح فرم
- container claymorphism
- submit button sticky در mobile
- ارسال toast موفقیت/خطا
- دریافت `submitLabel`, `loadingLabel`, `successTitle`, `errorTitle`

`ClayFormControls` کنترل های مشترک فرم را می سازد:

- `ClayInput`
- `ClayTextarea`
- `ClaySelect`
- `ClayDatePicker`
- `ClayRadioGroup`
- `ClayCheckbox`
- `ClayCheckboxGroup`
- `FormSection`
- `ClayFileDropzone`
- `UploadProgressItem`
- `FormErrorState`
- `FormSuccessState`
- `Spinner`

نکته UX:

- dropdownها absolute هستند و نباید layout زیر خود را هل بدهند.
- برای scroll داخلی dropdown/upload باید از `data-lenis-prevent` استفاده شود تا Lenis دخالت نکند.
- PDFها در upload card با file icon نمایش داده می شوند، نه thumbnail تصویری.

## 9. فرم های لید

### 9.1 Bespoke Sofa

فایل: `components/lead-capture/BespokeSofaLeadForm.tsx`

مسیر: `/services/bespoke-sofas`

anchor: `#bespoke-sofa-enquiry`

service: `BESPOKE_SOFA`

بخش ها:

- Contact / Your details
- Project / Sofa brief
- Access / Delivery notes
- Finish / Images and notes
- Consent / Privacy

آپلود:

- فقط image: `jpg`, `jpeg`, `png`, `webp`
- حداکثر 8 فایل
- حداکثر 10MB برای هر فایل
- progress جدا برای هر فایل
- retry/remove

### 9.2 Commercial Sofas

فایل: `components/lead-capture/CommercialSofaLeadForm.tsx`

مسیر: `/services/commercial-sofas`

anchor: `#commercial-sofa-enquiry`

service: `COMMERCIAL_SOFA`

بخش ها:

- `01 Your Details`
- `02 About the Venue`
- `03 Project Requirements`
- `04 Plans & References`
- `05 Final Notes`

فیلد اختصاصی مهم:

- `companyName` داخل `serviceData` ذخیره می شود، نه روی root مدل Lead.

آپلود:

- `jpg`, `jpeg`, `png`, `webp`, `pdf`
- حداکثر 10 فایل
- حداکثر 15MB
- floor plan PDF مجاز است

### 9.3 Interior Design

فایل: `components/lead-capture/InteriorDesignLeadForm.tsx`

مسیر: `/services/interior-design`

anchor: `#interior-design-enquiry`

service: `INTERIOR_DESIGN`

بخش ها:

- `01 Your Details`
- `02 Your Space`
- `03 What You Need`
- `04 Images & Plans`
- `05 Anything Else?`

آپلود:

- `jpg`, `jpeg`, `png`, `webp`, `pdf`
- حداکثر 10 فایل
- حداکثر 15MB

### 9.4 Sofa Repair & Restoration

فایل: `components/lead-capture/SofaRepairLeadForm.tsx`

مسیر: `/services/sofa-repair-restoration`

anchor: `#sofa-repair-enquiry`

service: `SOFA_REPAIR_RESTORATION`

اولویت UX:

- upload عکس در بالای فرم قرار دارد.
- فرم نسبت به بقیه کوتاه تر و موبایل محورتر است.
- حداقل یک عکس الزامی است.

بخش ها:

- `01 Photos First`
- `02 Your Details`
- `03 Sofa Details`
- `04 Anything Else?`

آپلود:

- فقط image: `jpg`, `jpeg`, `png`, `webp`
- حداکثر 8 عکس
- حداکثر 10MB
- progress جدا برای هر فایل
- thumbnail
- file name
- file size
- percent
- status
- retry
- remove

### 9.5 Contact Form

فایل: `components/static/ContactFormSection.tsx`

مسیر: `/contact-us`

service: `CONTACT_ENQUIRY`

فیلدها:

- نام
- ایمیل
- تلفن
- پیام
- privacy consent
- marketing consent

فرم تماس هم به جای مدل جدا، داخل همان `Lead` ذخیره می شود و `serviceData.enquiryType = "general"` دارد.

## 10. جریان آپلود فایل

فرم هایی که فایل دارند از این جریان استفاده می کنند:

1. کاربر فایل را drag/drop یا select می کند.
2. فرم client-side نوع و سایز فایل را چک می کند.
3. فرم به `/api/uploads/sign` درخواست می دهد.
4. بک اند رکورد `LeadAttachment` با status `PENDING` می سازد.
5. بک اند signed PUT URL برمی گرداند.
6. کلاینت فایل را با `XMLHttpRequest` آپلود می کند تا progress واقعی داشته باشد.
7. بعد از upload، کلاینت `/api/uploads/complete` را صدا می زند.
8. بک اند با `HeadObject` فایل را روی storage چک می کند.
9. اگر درست بود status فایل `COMPLETE` می شود.
10. هنگام submit فرم، uploadTokenها همراه payload ارسال می شوند.
11. `createLeadWithAttachments` lead را می سازد و uploadها را به `ATTACHED` تبدیل می کند.

اگر آپلود موفق باشد ولی ثبت lead شکست بخورد، فایل ها `COMPLETE` می مانند و در retry دوباره از همان tokenها استفاده می شود؛ کاربر مجبور به آپلود دوباره نیست.

## 11. جریان ثبت Lead

payload استاندارد فرم:

```json
{
  "service": "INTERIOR_DESIGN",
  "contact": {
    "name": "Client Name",
    "email": "client@example.com",
    "phone": "+44 7400 577844",
    "postcode": "NW2 7HJ"
  },
  "serviceData": {
    "projectType": "residential"
  },
  "message": "Project details...",
  "uploadTokens": [],
  "uploadSessionId": "upload:client-id",
  "privacyConsent": true,
  "marketingConsent": false,
  "idempotencyKey": "lead:client-id",
  "sourcePage": "/services/interior-design",
  "referrer": "https://example.com",
  "utm": {
    "source": "google",
    "medium": "cpc",
    "campaign": "campaign-name"
  },
  "formStartedAt": 1786900000000
}
```

بک اند این payload را تمیز و validate می کند و فقط داده معتبر وارد دیتابیس می شود.

## 12. احراز هویت و دسترسی ادمین

ثبت نام:

- فقط نام، شماره و پسورد لازم است.
- role پیش فرض `USER` است.

ورود:

- فقط شماره و پسورد لازم است.

دسترسی admin:

- فقط کاربری که در دیتابیس role `ADMIN` و `isActive=true` دارد.
- هیچ admin token دستی در UI یا API استفاده نمی شود.
- اگر کاربر session ندارد، به `/login?next=%2Fadmin` redirect می شود.
- اگر کاربر admin نیست یا inactive است، به login redirect می شود.

## 13. صفحات مهم

صفحات عمومی:

- `/`
- `/services`
- `/services/bespoke-sofas`
- `/services/commercial-sofas`
- `/services/interior-design`
- `/services/sofa-repair-restoration`
- `/contact-us`
- `/gallery`
- `/workshop`
- `/about-us`
- `/faqs`
- `/privacy-policy`

صفحات سیستمی:

- `/login`
- `/admin`

هر صفحه سرویس metadata و JSON-LD اختصاصی دارد.

## 14. تست ها

فایل ها:

- `tests/auth.test.ts`
- `tests/lead-admin.test.ts`
- `tests/lead-validation.test.ts`

پوشش تست:

- validation ثبت نام و ورود
- قدرت password
- hash/verify password
- session token و cookie
- validation patch کاربران
- parse/filter queryهای admin
- validation وضعیت lead
- reject کردن admin request بدون session
- validation همه فرم های lead
- قوانین اختصاصی هر service
- upload policy برای contact/commercial/interior/repair

اجرای تست:

```bash
npm run test
```

## 15. نکات عملیاتی

- MongoDB باید replica set یا cluster مناسب transaction داشته باشد، چون ساخت lead و attach فایل ها با transaction انجام می شود.
- اگر در `DATABASE_URL` پسورد کاراکتر خاص دارد، باید URL encode شود. مثلا `@` داخل پسورد باید `%40` شود.
- فایل های آپلود شده orphan با `lead-cleanup.ts` حذف می شوند.
- اگر `UPLOAD_PUBLIC_BASE_URL` تنظیم نباشد، پنل ادمین `publicUrl` برای فایل نمی گیرد، اما `storageKey` را همچنان می بیند.
- rate limit از کد حذف شده و دیگر در routeها استفاده نمی شود.
- پیام های success/error/info در UI از `ToastProvider` می آیند.
- برای اضافه کردن provider واقعی notification یا analytics، باید `lead-notifications.ts` و `lead-analytics.ts` توسعه داده شوند.

## 16. اضافه کردن فرم یا سرویس جدید

برای اضافه کردن یک سرویس lead جدید:

1. مقدار service را به `LEAD_SERVICES` در `models/lead.ts` اضافه کنید.
2. تعریف fieldهای service را در `leadServiceDefinitions` داخل `lib/lead-config.ts` اضافه کنید.
3. upload policy سرویس را در `leadUploadPolicies` تعریف کنید.
4. قوانین اختصاصی validation را در `validateLeadSubmissionInput` اضافه کنید.
5. فرم client را با `LeadFormShell` و `ClayFormControls` بسازید.
6. فرم را در صفحه service mount کنید.
7. anchor دکمه hero را به id فرم وصل کنید.
8. تست های validation و upload policy را در `tests/lead-validation.test.ts` اضافه کنید.
9. اگر لازم است dashboard label/search mapping را در admin توسعه دهید.

## 17. قراردادهای مهم کدنویسی فعلی

- داده های مشترک لید روی root مدل `Lead` ذخیره می شوند.
- داده های اختصاصی هر سرویس داخل `Lead.serviceData` می روند.
- فایل ها هیچ وقت مستقیم با submit فرم ارسال نمی شوند؛ همیشه upload دو مرحله ای دارند.
- خطای API باید از `ApiProblem` یا `handleApiError` عبور کند.
- هر route که body دارد از `readJsonBody` استفاده می کند.
- routeهای mutation حساس از `assertSameOrigin` استفاده می کنند.
- admin access فقط از session cookie و role دیتابیس می آید.
- فرم ها باید مقدارهای کاربر و uploadهای موفق را بعد از خطای submit حفظ کنند.
- طراحی فرم ها باید از claymorphism مشترک استفاده کند و کنترل ها تا جای ممکن reusable باشند.

