# Sofa N More

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

