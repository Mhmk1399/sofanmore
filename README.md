# Sofa N More

## Latest admin/project additions

- Project model and admin CRUD are available from `/admin`.
- Each project has a required unique `projectCode` that must be `1000` or higher.
- The projects API returns `latestCode` so the admin can see the latest used project code before creating the next project.
- Admin project image upload uses the shared S3-compatible upload storage and stores optional storage keys.
- Project uploads are stored under `project-uploads/`; lead uploads remain under `lead-uploads/`.
- Public project pages are available at `/projects` and `/projects/[slug]` for published projects.
- Admin profile management is available from the sidebar. Admins can update their own name, phone and password.
- Changing name/phone does not require a password change. Current password is required only when setting a new password.
- Admin action feedback uses the shared Toast system, including success, error and info messages.
- Logout now requires a confirmation modal.
- A `View site` button in the admin header opens the public site in a new tab.

وب سایت و سیستم lead capture اختصاصی Sofa N More با Next.js، MongoDB، فرم های چند سرویس، آپلود فایل، احراز هویت، پنل ادمین و داشبورد مدیریتی.

داکیومنت کامل پروژه در این فایل است:

- [docs/PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md)

## اجرای پروژه

```bash
npm run dev
```

آدرس پیش فرض:

```text
http://localhost:3000
```

## اسکریپت های مهم

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

## بخش های اصلی

- فرم های lead برای bespoke sofas، commercial sofas، interior design، sofa repair/restoration و contact enquiry
- بک اند مشترک برای ثبت لیدها و attachmentها
- آپلود دو مرحله ای با signed URL و progress سمت کلاینت
- auth با شماره و password
- نقش های `USER` و `ADMIN`
- داشبورد `/admin` برای مشاهده، فیلتر، analytics، آپدیت وضعیت، حذف leadها و مدیریت کاربران

## نکته امنیتی

مقادیر واقعی `.env`، connection string دیتابیس، secretها و کلیدهای upload storage نباید داخل git یا داکیومنت commit شوند.
