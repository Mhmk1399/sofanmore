import type { ComponentType, InputHTMLAttributes } from "react";

import { Armchair, Crown, LockKeyhole } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   CONTENT
========================================================= */

const description =
  "Have questions about our services or want to discuss your project? Fill out the form below or give us a call. We’re committed to providing exceptional customer service and helping you achieve your design goals.";

/* =========================================================
   ROOT
========================================================= */

export default function ContactFormSection() {
  return (
    <section
      aria-label="Contact Sofa N More"
      className="
        relative
        overflow-hidden
        bg-[var(--brand-ivory)]
        px-3
        py-8

        sm:px-5
        sm:py-10

        lg:px-7
        lg:py-14
      "
    >
      {/* page background */}

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(180deg,#FFFDF8_0%,#F5F2EA_55%,#EDE3D5_100%)]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1480px]
        "
      >
        {/* =====================================================
            DESKTOP
        ====================================================== */}

        <div className="hidden lg:block">
          <DesktopContactForm />
        </div>

        {/* =====================================================
            MOBILE
        ====================================================== */}

        <div className="lg:hidden">
          <MobileContactForm />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DESKTOP
========================================================= */

function DesktopContactForm() {
  return (
    <div
      className="
        clay-surface-strong
        relative
        rounded-[46px]
        p-[9px]
      "
    >
      <div
        className="
          clay-inset
          relative
          min-h-[800px]
          overflow-hidden
          rounded-[38px]
          bg-[#F5EDE1]
        "
      >
        {/* =================================================
            ONE COMPLETE ARCHITECTURAL BACKGROUND SVG

            مهم:
            تمام Curveها در یک SVG هستند.
            دیگر تکه‌تکه نمی‌شوند.
        ================================================== */}

        <DesktopBackgroundSvg />

        {/* =================================================
            FULL NAVY BRAND NICHE
        ================================================== */}

        <div
          className="
            absolute
            left-[0px]
            top-[70px]
            z-20
            h-[330px]
            w-[215px]
          "
        >
          {/* outer ivory edge */}

          <div
            className="
              absolute
              inset-0
              rounded-r-[50%]
              bg-[#FFFDF8]
              p-[9px]
              shadow-[8px_8px_20px_rgba(117,96,70,0.12)]
            "
          >
            <div
              className="
                relative
                flex
                h-full
                w-full
                flex-col
                items-center
                justify-center
                rounded-r-[48%]
                bg-[linear-gradient(145deg,#132D4C_0%,#071725_88%)]
                shadow-[inset_-10px_0_20px_rgba(0,0,0,0.17)]
              "
            >
              <Crown
                size={18}
                strokeWidth={1.4}
                className="
                  text-[var(--brand-gold)]
                "
              />

              <div
                className="
                  mt-3
                  text-center
                  font-brand-display
                  text-[25px]
                  leading-[0.92]
                  tracking-[0.12em]
                  text-[var(--brand-gold)]
                "
              >
                SOFA
                <br />N MORE
              </div>

              <div
                className="
                  mt-3
                  h-px
                  w-[100px]
                  bg-[var(--brand-gold)]
                "
              />

              <div
                className="
                  mt-2
                  font-brand-sans
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.34em]
                  text-[var(--brand-gold)]
                "
              >
                London
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            LEFT COPY
        ================================================== */}

        <div
          className="
            absolute
            left-[18%]
            top-[25%]
            z-30
            w-[29%]
            max-w-[390px]
          "
        >
          <p
            className="
              font-brand-sans
              text-[9px]
              font-bold
              uppercase
              tracking-[0.28em]
              text-[var(--brand-gold-700)]
            "
          >
            Contact Form
          </p>

          <div
            className="
              mt-4
              h-[2px]
              w-10
              rounded-full
              bg-[var(--brand-gold)]
            "
          />

          <h2
            className="
              mt-6
              font-brand-display
              text-[clamp(44px,3.7vw,61px)]
              font-medium
              leading-[0.96]
              tracking-[-0.045em]
              text-[var(--brand-navy)]
            "
          >
            We would love
            <br />
            to hear from
            <br />
            you
            <span
              className="
                text-[var(--brand-gold)]
              "
            >
              .
            </span>
          </h2>

          <p
            className="
              mt-5
              max-w-[380px]
              font-brand-sans
              text-[12px]
              font-medium
              leading-[1.75]
              text-[var(--brand-text-muted)]

              xl:text-[13px]
            "
          >
            {description}
          </p>

          <div
            className="
              mt-6
              h-[2px]
              w-10
              rounded-full
              bg-[var(--brand-gold)]
            "
          />

          {/* mini brand item */}

          <div
            className="
              mt-8
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                clay-surface-strong
                flex
                h-[54px]
                w-[54px]
                shrink-0
                items-center
                justify-center
                rounded-full
              "
            >
              <div
                className="
                  flex
                  h-[43px]
                  w-[43px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--brand-navy)]
                "
              >
                <Armchair
                  size={21}
                  strokeWidth={1.4}
                  className="
                    text-[var(--brand-gold)]
                  "
                />
              </div>
            </div>

            <div>
              <p
                className="
                  font-brand-sans
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.13em]
                  text-[var(--brand-navy)]
                "
              >
                Bespoke. Refined. Made for you.
              </p>

              <p
                className="
                  mt-1
                  font-brand-sans
                  text-[7px]
                  text-[var(--brand-text-muted)]
                "
              >
                Crafted in London. Designed around you.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            FORM CARD
        ================================================== */}

        <div
          className="
            absolute
            bottom-[7%]
            right-[6%]
            top-[17%]
            z-30
            w-[49%]
          "
        >
          <div
            className="
              clay-surface-strong
              h-full
              rounded-[38px]
              p-[8px]
              shadow-[0_22px_42px_rgba(70,58,42,0.16)]
            "
          >
            <form
              action="#"
              method="post"
              className="
                clay-inset
                flex
                h-full
                flex-col
                rounded-[31px]
                px-9
                py-9

                xl:px-11
                xl:py-10
              "
            >
              {/* NAME */}

              <FormField
                id="contact-name"
                name="name"
                label="Name"
                autoComplete="name"
                required
              />

              {/* EMAIL / PHONE */}

              <div
                className="
                  mt-6
                  grid
                  grid-cols-2
                  gap-6
                "
              >
                <FormField
                  id="contact-email"
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  required
                />

                <FormField
                  id="contact-phone"
                  name="phone"
                  label="Phone"
                  type="tel"
                  autoComplete="tel"
                  required
                />
              </div>

              {/* MESSAGE */}

              <div className="mt-6">
                <label
                  htmlFor="contact-message"
                  className="
                    block
                    font-brand-sans
                    text-[12px]
                    font-semibold
                    text-[var(--brand-navy)]
                  "
                >
                  Your Message
                </label>

                <div
                  className="
                    clay-inset
                    mt-3
                    rounded-[20px]
                    p-[3px]
                  "
                >
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    className="
                      block
                      min-h-[145px]
                      w-full
                      resize-none
                      rounded-[17px]
                      border-0
                      bg-white/20
                      px-5
                      py-4
                      font-brand-sans
                      text-[15px]
                      text-[var(--brand-navy)]
                      outline-none
                      transition-colors
                      focus:bg-white/35
                    "
                  />
                </div>
              </div>

              {/* BUTTON */}

              <div className="mt-7">
                <ClayButton type="submit" variant="gold" size="lg" fullWidth>
                  Submit
                </ClayButton>
              </div>

              {/* NOTE - now fully inside the card */}

              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-center
                  gap-2.5
                "
              >
                <LockKeyhole
                  size={13}
                  strokeWidth={1.6}
                  className="
                    shrink-0
                    text-[var(--brand-gold-700)]
                  "
                />

                <p
                  className="
                    max-w-[260px]
                    font-brand-sans
                    text-[8px]
                    leading-[1.5]
                    text-[var(--brand-text-muted)]
                  "
                >
                  Please enable JavaScript in your browser to complete this
                  form.
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* =================================================
            FOREGROUND DECOR

            کامل داخل bounds قرار گرفته.
        ================================================== */}

        {/* GOLD RING */}

        <div
          aria-hidden
          className="
            absolute
            bottom-[88px]
            left-[33px]
            z-10
            h-[140px]
            w-[100px]
            rounded-[50%]
            border-[2px]
            border-[var(--brand-gold)]/90
          "
        />

        {/* IVORY SPHERE */}

        <div
          aria-hidden
          className="
            clay-sphere
            absolute
            bottom-[56px]
            left-[64px]
            z-20
            h-[110px]
            w-[110px]
          "
        >
          <div className="clay-sphere-shadow" />
          <div className="clay-sphere-ball" />
        </div>

        {/* GOLD SPHERE */}

        <div
          aria-hidden
          className="
            absolute
            bottom-[58px]
            left-[230px]
            z-20
            h-[48px]
            w-[48px]
            rounded-full
            bg-[radial-gradient(circle_at_30%_25%,#FFE7A8_0%,#D7A04A_48%,#8E5718_100%)]
            shadow-[0_10px_18px_rgba(106,67,17,0.26)]
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   DESKTOP BACKGROUND
========================================================= */

function DesktopBackgroundSvg() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 800"
      preserveAspectRatio="none"
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        h-full
        w-full
      "
    >
      <defs>
        <linearGradient id="contact-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFDF8" />

          <stop offset="46%" stopColor="#F5EDE1" />

          <stop offset="100%" stopColor="#EDE1D2" />
        </linearGradient>

        <linearGradient id="contact-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF8" />

          <stop offset="100%" stopColor="#F1E8DC" />
        </linearGradient>
      </defs>

      {/* BASE */}

      <rect width="1440" height="800" fill="url(#contact-bg)" />

      {/* =============================================
          LEFT LARGE ARCH
      ============================================== */}

      <path
        d="
          M0 45

          C140 13
           297 33
           368 117

          C412 169
           426 227
           426 301

          V515

          C426 563
           410 601
           381 633

          H0
          Z
        "
        fill="#EFE4D6"
      />

      <path
        d="
          M0 69

          C131 40
           278 55
           344 131

          C384 178
           398 230
           398 300
        "
        fill="none"
        stroke="#FFFDF8"
        strokeWidth="7"
      />

      {/* =============================================
          LARGE RIGHT ARCH
      ============================================== */}

      <path
        d="
          M790 535
          V293

          C790 102
           922 42
           1085 42

          C1243 42
           1350 133
           1350 290

          V535
          Z
        "
        fill="#F1E7DA"
      />

      <path
        d="
          M814 535
          V303

          C814 133
           934 70
           1085 70

          C1224 70
           1322 146
           1322 291
        "
        fill="none"
        stroke="#FFFDF8"
        strokeWidth="6"
      />

      {/* GOLD ARC */}

      <path
        d="
          M858 181
          C908 55
           1050 5
           1189 52

          C1261 76
           1310 120
           1342 171
        "
        fill="none"
        stroke="#D7A04A"
        strokeWidth="2"
      />

      {/* =============================================
          RIGHT LOWER CURVE
      ============================================== */}

      <path
        d="
          M1440 380

          C1322 369
           1246 393
           1193 455

          C1131 527
           1104 589
           1034 645

          C970 695
           889 718
           806 731

          L1440 731
          Z
        "
        fill="#EFE5D9"
      />

      <path
        d="
          M1440 399

          C1328 389
           1261 408
           1211 461
        "
        fill="none"
        stroke="#FFFDF8"
        strokeWidth="6"
      />

      {/* =============================================
          FLOOR WAVE
      ============================================== */}

      <path
        d="
          M0 702

          C134 674
           258 684
           359 723

          C459 762
           544 766
           650 727

          C744 692
           852 680
           960 701

          C1077 724
           1195 721
           1294 686

          C1351 666
           1395 663
           1440 669

          L1440 800
          L0 800
          Z
        "
        fill="url(#contact-floor)"
      />

      <path
        d="
          M0 702

          C134 674
           258 684
           359 723

          C459 762
           544 766
           650 727

          C744 692
           852 680
           960 701

          C1077 724
           1195 721
           1294 686

          C1351 666
           1395 663
           1440 669
        "
        fill="none"
        stroke="#FFFDF8"
        strokeWidth="7"
      />

      {/* =============================================
          FLUTED LINES
      ============================================== */}

      <g opacity="0.38" fill="#D9CCBA">
        <rect x="1030" y="0" width="7" height="208" rx="4" />

        <rect x="1045" y="0" width="7" height="208" rx="4" />

        <rect x="1060" y="0" width="7" height="208" rx="4" />

        <rect x="1075" y="0" width="7" height="208" rx="4" />

        <rect x="1090" y="0" width="7" height="208" rx="4" />
      </g>
    </svg>
  );
}

/* =========================================================
   FORM FIELD
========================================================= */

type FormFieldProps = {
  id: string;
  name: string;
  label: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  required?: boolean;
  autoComplete?: string;
};

function FormField({
  id,
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          block
          font-brand-sans
          text-[12px]
          font-semibold
          text-[var(--brand-navy)]
        "
      >
        {label}

        {required && (
          <span
            className="
              ml-1
              text-[var(--brand-gold-700)]
            "
          >
            *
          </span>
        )}
      </label>

      <div
        className="
          clay-inset
          mt-3
          rounded-[19px]
          p-[3px]
        "
      >
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className="
            block
            h-[58px]
            w-full
            rounded-[16px]
            border-0
            bg-white/20
            px-5
            font-brand-sans
            text-[15px]
            text-[var(--brand-navy)]
            outline-none
            transition-colors
            focus:bg-white/35
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE
========================================================= */

function MobileContactForm() {
  return (
    <div
      className="
        clay-surface-strong
        mx-auto
        max-w-[430px]
        rounded-[36px]
        p-[7px]
      "
    >
      <div
        className="
          clay-inset
          relative
          overflow-hidden
          rounded-[29px]
          bg-[#F5EDE1]
        "
      >
        {/* =================================================
            COMPLETE MOBILE BRAND ARCH
        ================================================== */}

        <MobileHeader />

        {/* =================================================
            CONTENT
        ================================================== */}

        <div
          className="
            relative
            z-20
            px-5
            pb-[calc(115px+env(safe-area-inset-bottom))]
            pt-8
          "
        >
          <p
            className="
              font-brand-sans
              text-[8px]
              font-bold
              uppercase
              tracking-[0.27em]
              text-[var(--brand-gold-700)]
            "
          >
            Contact Form
          </p>

          <div
            className="
              mt-3
              h-[2px]
              w-9
              bg-[var(--brand-gold)]
            "
          />

          <h2
            className="
              mt-5
              font-brand-display
              text-[37px]
              font-medium
              leading-[0.98]
              tracking-[-0.04em]
              text-[var(--brand-navy)]

              min-[380px]:text-[41px]
            "
          >
            We would love
            <br />
            to hear from you
            <span
              className="
                text-[var(--brand-gold)]
              "
            >
              .
            </span>
          </h2>

          <p
            className="
              mt-5
              font-brand-sans
              text-[11px]
              font-medium
              leading-[1.68]
              text-[var(--brand-text-muted)]
            "
          >
            {description}
          </p>

          <div
            className="
              mt-5
              h-[2px]
              w-9
              bg-[var(--brand-gold)]
            "
          />

          {/* FORM */}

          <form
            method="post"
            action="#"
            className="
              mt-7
              space-y-5
            "
          >
            <MobileField
              id="mobile-name"
              name="name"
              label="Name"
              autoComplete="name"
              required
            />

            <MobileField
              id="mobile-email"
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              required
            />

            <MobileField
              id="mobile-phone"
              name="phone"
              label="Phone"
              type="tel"
              autoComplete="tel"
              required
            />

            <div>
              <label
                htmlFor="mobile-message"
                className="
                  font-brand-sans
                  text-[11px]
                  font-semibold
                  text-[var(--brand-navy)]
                "
              >
                Your Message
              </label>

              <div
                className="
                  clay-inset
                  mt-2
                  rounded-[17px]
                  p-[3px]
                "
              >
                <textarea
                  id="mobile-message"
                  name="message"
                  rows={6}
                  className="
                    block
                    min-h-[145px]
                    w-full
                    resize-none
                    rounded-[14px]
                    border-0
                    bg-white/20
                    px-4
                    py-3
                    font-brand-sans
                    text-[14px]
                    text-[var(--brand-navy)]
                    outline-none
                    focus:bg-white/35
                  "
                />
              </div>
            </div>

            <ClayButton type="submit" variant="gold" size="lg" fullWidth>
              Submit
            </ClayButton>

            <div
              className="
                flex
                items-start
                justify-center
                gap-2
                pt-1
              "
            >
              <LockKeyhole
                size={12}
                strokeWidth={1.6}
                className="
                  mt-[1px]
                  text-[var(--brand-gold-700)]
                "
              />

              <p
                className="
                  max-w-[220px]
                  font-brand-sans
                  text-[8px]
                  leading-[1.45]
                  text-[var(--brand-text-muted)]
                "
              >
                Please enable JavaScript in your browser to complete this form.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MOBILE HEADER

   این قسمت مهم‌ترین اصلاحه.
========================================================= */

function MobileHeader() {
  return (
    <div
      className="
        relative
        h-[205px]
        w-full
      "
    >
      <svg
        aria-hidden
        viewBox="0 0 430 205"
        preserveAspectRatio="none"
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      >
        {/* NAVY ARCH */}

        <path
          d="
            M0 0
            H430
            V122

            C360 161
             291 181
             215 181

            C138 181
             69 160
             0 122

            Z
          "
          fill="#12253E"
        />

        {/* INNER NAVY DEPTH */}

        <path
          d="
            M8 6
            H422
            V117

            C354 150
             287 167
             215 167

            C143 167
             76 150
             8 117

            Z
          "
          fill="#0B1929"
          opacity="0.54"
        />

        {/* IVORY SCULPTURAL BORDER */}

        <path
          d="
            M0 121

            C69 160
             138 181
             215 181

            C291 181
             360 161
             430 122
          "
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="13"
        />

        <path
          d="
            M0 129

            C70 165
             139 188
             215 188

            C291 188
             360 168
             430 130
          "
          fill="none"
          stroke="#E9DDCE"
          strokeWidth="5"
          opacity="0.7"
        />
      </svg>

      {/* BRAND */}

      <div
        className="
          absolute
          left-1/2
          top-[31px]
          z-10
          -translate-x-1/2
          text-center
        "
      >
        <Crown
          size={14}
          strokeWidth={1.4}
          className="
            mx-auto
            text-[var(--brand-gold)]
          "
        />

        <div
          className="
            mt-2
            whitespace-nowrap
            font-brand-display
            text-[18px]
            tracking-[0.13em]
            text-[var(--brand-gold)]
          "
        >
          SOFA N MORE
        </div>

        <div
          className="
            mt-1
            font-brand-sans
            text-[6px]
            font-bold
            uppercase
            tracking-[0.34em]
            text-[var(--brand-gold)]
          "
        >
          London
        </div>
      </div>

      {/* GOLD BALL */}

      <div
        aria-hidden
        className="
          absolute
          right-[18px]
          top-[92px]
          z-20
          h-[38px]
          w-[38px]
          rounded-full
          bg-[radial-gradient(circle_at_30%_25%,#FFE7A8_0%,#D7A04A_48%,#8C5517_100%)]
          shadow-[0_8px_15px_rgba(105,68,19,0.26)]
        "
      />
    </div>
  );
}

/* =========================================================
   MOBILE FIELD
========================================================= */

function MobileField({
  id,
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          block
          font-brand-sans
          text-[11px]
          font-semibold
          text-[var(--brand-navy)]
        "
      >
        {label}

        {required && (
          <span
            className="
              ml-1
              text-[var(--brand-gold-700)]
            "
          >
            *
          </span>
        )}
      </label>

      <div
        className="
          clay-inset
          mt-2
          rounded-[16px]
          p-[3px]
        "
      >
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className="
            block
            h-[52px]
            w-full
            rounded-[13px]
            border-0
            bg-white/20
            px-4
            font-brand-sans
            text-[14px]
            text-[var(--brand-navy)]
            outline-none
            focus:bg-white/35
          "
        />
      </div>
    </div>
  );
}
