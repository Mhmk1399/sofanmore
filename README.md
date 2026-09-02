# Sofa N More

Sofa N More is a Next.js and MongoDB website with multi-service lead forms, file uploads, authentication, an admin panel and a management dashboard.

The complete project documentation is available here:

- [Project documentation](docs/PROJECT_DOCUMENTATION.md)

## Latest admin and project additions

- Project model and admin CRUD are available from `/admin`.
- Each project has a required unique `projectCode` that must be `1000` or higher.
- The projects API returns `latestCode` so the admin can see the latest used project code before creating the next project.
- Admin project image upload uses the shared Amazon S3 storage and stores optional storage keys.
- Project uploads are stored under `Image/project-uploads/`; lead uploads use `Image/lead-uploads/`.
- Public project pages are available at `/projects` and `/projects/[slug]` for published projects.
- Admin profile management is available from the sidebar. Admins can update their own name, phone and password.
- Changing name or phone does not require a password change. The current password is required only when setting a new password.
- Admin action feedback uses the shared toast system, including success, error and info messages.
- Logout requires a confirmation modal.
- A `View site` button in the admin header opens the public site in a new tab.

## Run the project

```bash
npm run dev
```

Default local URL:

```text
http://localhost:3000
```

## Main scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

## Main areas

- فرم های lead برای bespoke sofas، commercial sofas، interior design، sofa repair/restoration و contact enquiry
- بک اند مشترک برای ثبت لیدها و attachmentها
- آپلود دو مرحله ای با signed URL و progress سمت کلاینت
- auth با شماره و password
- نقش های `USER` و `ADMIN`
- داشبورد `/admin` برای مشاهده، فیلتر، analytics، آپدیت وضعیت، حذف leadها و مدیریت کاربران

## نکته امنیتی

مقادیر واقعی `.env`، connection string دیتابیس، secretها و کلیدهای upload storage نباید داخل git یا داکیومنت commit شوند.
