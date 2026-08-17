import {
  Building2,
  Camera,
  Check,
  MapPin,
  MessageSquareText,
  Search,
  Sofa,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   DATA
========================================================= */

const startingSteps = [
  {
    number: "01",
    title: "Send Photographs",
    text: "Show us the sofa and any areas that concern you.",
    icon: Camera,
  },
  {
    number: "02",
    title: "Describe the Condition",
    text: "Tell us what you can see, feel or would like to improve.",
    icon: MessageSquareText,
  },
  {
    number: "03",
    title: "We Assess the Starting Point",
    text: "We can then consider whether the sofa is suitable for our repair and restoration service.",
    icon: Search,
  },
] satisfies {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
}[];

/* =========================================================
   ROOT
========================================================= */

export default function SofaRepairLondonBaseSection() {
  return (
    <section
      aria-labelledby="sofa-repair-london-base-heading"
      className="
        bg-[var(--brand-ivory)]
        px-3
        py-9

        sm:px-5
        sm:py-11

        lg:px-7
        lg:py-14
      "
    >
      <div className="mx-auto max-w-[var(--site-width)]">
        {/* =====================================================
            OUTER SHELL
        ====================================================== */}

        <div
          className="
            clay-surface-strong

            rounded-[30px]
            p-[6px]

            sm:rounded-[36px]
            sm:p-[7px]

            lg:rounded-[42px]
            lg:p-[8px]
          "
        >
          <div
            className="
              clay-inset

              relative
              overflow-hidden

              rounded-[24px]

              bg-[linear-gradient(135deg,#FFFDF8_0%,#F7F1E8_58%,#EFE5D8_100%)]

              px-5
              py-6

              sm:rounded-[29px]
              sm:px-7
              sm:py-8

              lg:rounded-[34px]
              lg:px-10
              lg:py-10
            "
          >
            <SubtleBackground />

            {/* =================================================
                MAIN GRID
            ================================================== */}

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[0.96fr_1.04fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  BRAND / LONDON BASE
              ================================================== */}

              <div>
                {/* EYEBROW */}

                <div className="flex items-center gap-3">
                  <span
                    className="
                      flex
                      h-9
                      w-9

                      shrink-0

                      items-center
                      justify-center

                      rounded-full

                      bg-[var(--brand-navy)]

                      text-[var(--brand-gold)]
                    "
                  >
                    <MapPin size={15} strokeWidth={1.5} />
                  </span>

                  <div>
                    <span
                      className="
                        block

                        font-brand-sans

                        text-[8px]
                        font-bold
                        uppercase

                        tracking-[0.2em]

                        text-[var(--brand-gold-700)]

                        sm:text-[9px]
                      "
                    >
                      Sofa N More · London
                    </span>

                    <span
                      className="
                        mt-1
                        block

                        font-brand-sans

                        text-[8px]
                        font-medium

                        text-[var(--brand-text-muted)]

                        sm:text-[9px]
                      "
                    >
                      North West London
                    </span>
                  </div>
                </div>

                {/* HEADING */}

                <h2
                  id="sofa-repair-london-base-heading"
                  className="
                    mt-5

                    max-w-[690px]

                    font-brand-display

                    text-[37px]
                    font-semibold
                    leading-[0.98]

                    tracking-[-0.04em]

                    text-[var(--brand-navy)]

                    min-[390px]:text-[41px]

                    sm:text-[48px]

                    lg:text-[clamp(46px,3.8vw,60px)]
                  "
                >
                  Sofa Repair & Restoration in London
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                {/* INTRO */}

                <p
                  className="
                    mt-6

                    max-w-[630px]

                    font-brand-display

                    text-[19px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[21px]
                  "
                >
                  Sofa N More is based in North West London, working with
                  clients looking to preserve, repair and restore sofas worth
                  keeping.
                </p>

                {/* BODY */}

                <div
                  className="
                    mt-5

                    max-w-[650px]

                    space-y-4

                    font-brand-sans

                    text-[12px]
                    font-medium
                    leading-[1.75]

                    text-[var(--brand-text-muted)]

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  <p>
                    If you are unsure whether your sofa can be restored, start
                    by sending us photographs and a short description of its
                    condition.
                  </p>

                  <p>
                    You do not need to know the technical cause of the problem.
                  </p>
                </div>

                {/* KEY MESSAGE */}

                <div
                  className="
                    mt-6

                    border-l-2
                    border-[var(--brand-gold)]

                    pl-4
                  "
                >
                  <span
                    className="
                      font-brand-sans

                      text-[6px]
                      font-bold
                      uppercase

                      tracking-[0.17em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    Keep It Simple
                  </span>

                  <p
                    className="
                      mt-1.5

                      max-w-[570px]

                      font-brand-display

                      text-[21px]
                      font-semibold
                      leading-[1.3]

                      text-[var(--brand-navy)]

                      sm:text-[23px]
                    "
                  >
                    Show us what you can see and tell us what you would like to
                    achieve.
                  </p>
                </div>

                {/* =================================================
                    ADDRESS
                ================================================== */}

                <div
                  className="
                    mt-6

                    rounded-[20px]

                    bg-[var(--brand-navy)]

                    px-4
                    py-4

                    sm:px-5
                    sm:py-5
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      gap-3
                    "
                  >
                    <span
                      className="
                        flex
                        h-9
                        w-9

                        shrink-0

                        items-center
                        justify-center

                        rounded-full

                        bg-[var(--brand-gold)]

                        text-[var(--brand-navy)]
                      "
                    >
                      <Building2 size={14} strokeWidth={1.5} />
                    </span>

                    <div>
                      <span
                        className="
                          font-brand-sans

                          text-[6px]
                          font-bold
                          uppercase

                          tracking-[0.18em]

                          text-[var(--brand-gold)]
                        "
                      >
                        Our London Base
                      </span>

                      <address
                        className="
                          mt-2

                          not-italic

                          font-brand-sans

                          text-[11px]
                          font-medium
                          leading-[1.65]

                          text-white/70

                          sm:text-[12px]
                        "
                      >
                        <strong
                          className="
                            block

                            font-brand-display

                            text-[18px]
                            font-semibold

                            text-white

                            sm:text-[20px]
                          "
                        >
                          Sofa N More
                        </strong>

                        <span className="mt-1 block">
                          Unit G19, Atlas Business Centre
                        </span>

                        <span className="block">
                          Oxgate Lane, Staples Corner West
                        </span>

                        <span className="block">London NW2 7HJ</span>
                      </address>
                    </div>
                  </div>
                </div>

                {/* CTA */}

                <div className="mt-7">
                  <ClayButton
                    href="#sofa-repair-enquiry"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Request a sofa repair assessment from Sofa N More"
                  >
                    Request a Sofa Repair Assessment
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  STARTING POINT PANEL
              ================================================== */}

              <StartingPointPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STARTING POINT PANEL
========================================================= */

function StartingPointPanel() {
  return (
    <div
      className="
        mx-auto

        w-full
        max-w-[650px]

        clay-surface-strong

        rounded-[27px]
        p-[6px]

        sm:rounded-[31px]
        sm:p-[7px]
      "
    >
      <div
        className="
          clay-inset

          rounded-[21px]

          px-4
          py-5

          sm:rounded-[24px]
          sm:px-6
          sm:py-6
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-start
            gap-3
          "
        >
          <span
            className="
              flex
              h-10
              w-10

              shrink-0

              items-center
              justify-center

              rounded-full

              bg-[var(--brand-navy)]

              text-[var(--brand-gold)]
            "
          >
            <Sofa size={16} strokeWidth={1.5} />
          </span>

          <div>
            <span
              className="
                font-brand-sans

                text-[6px]
                font-bold
                uppercase

                tracking-[0.18em]

                text-[var(--brand-gold-700)]
              "
            >
              Unsure Where to Start?
            </span>

            <h3
              className="
                mt-1.5

                max-w-[470px]

                font-brand-display

                text-[24px]
                font-semibold
                leading-[1.15]

                tracking-[-0.025em]

                text-[var(--brand-navy)]

                sm:text-[27px]
              "
            >
              You only need to show us what you know.
            </h3>

            <p
              className="
                mt-3

                max-w-[500px]

                font-brand-sans

                text-[10px]
                font-medium
                leading-[1.65]

                text-[var(--brand-text-muted)]

                sm:text-[11px]
              "
            >
              There is no need to identify springs, frames, fillings or other
              technical issues before getting in touch.
            </p>
          </div>
        </div>

        {/* =====================================================
            STEPS
        ====================================================== */}

        <div
          className="
            mt-5

            space-y-2.5
          "
        >
          {startingSteps.map(({ number, title, text, icon: Icon }) => (
            <StartingStep
              key={number}
              number={number}
              title={title}
              text={text}
              icon={Icon}
            />
          ))}
        </div>

        {/* =====================================================
            RESULT
        ====================================================== */}

        <div
          className="
            mt-5

            rounded-[17px]

            bg-[var(--brand-navy)]

            px-4
            py-4
          "
        >
          <div
            className="
              flex
              items-start
              gap-3
            "
          >
            <span
              className="
                flex
                h-8
                w-8

                shrink-0

                items-center
                justify-center

                rounded-full

                bg-[var(--brand-gold)]

                text-[var(--brand-navy)]
              "
            >
              <Check size={13} strokeWidth={2} />
            </span>

            <div>
              <span
                className="
                  font-brand-sans

                  text-[6px]
                  font-bold
                  uppercase

                  tracking-[0.17em]

                  text-[var(--brand-gold)]
                "
              >
                The Starting Point
              </span>

              <p
                className="
                  mt-1

                  max-w-[450px]

                  font-brand-display

                  text-[17px]
                  font-medium
                  leading-[1.35]

                  text-white

                  sm:text-[19px]
                "
              >
                A few clear photographs and a short description can begin the
                conversation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STARTING STEP
========================================================= */

function StartingStep({
  number,
  title,
  text,
  icon: Icon,
}: {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
}) {
  return (
    <article
      className="
        clay-surface-soft

        rounded-[17px]

        px-3.5
        py-3.5
      "
    >
      <div
        className="
          flex
          items-start
          gap-3
        "
      >
        <span
          className="
            flex
            h-9
            w-9

            shrink-0

            items-center
            justify-center

            rounded-full

            bg-[var(--brand-navy)]

            text-[var(--brand-gold)]
          "
        >
          <Icon size={13} strokeWidth={1.5} />
        </span>

        <div className="min-w-0 flex-1">
          <div
            className="
              flex
              items-center
              justify-between

              gap-3
            "
          >
            <h4
              className="
                font-brand-display

                text-[17px]
                font-semibold
                leading-[1.2]

                text-[var(--brand-navy)]

                sm:text-[18px]
              "
            >
              {title}
            </h4>

            <span
              className="
                shrink-0

                font-brand-display

                text-[20px]
                font-semibold

                text-[var(--brand-gold-700)]/30
              "
            >
              {number}
            </span>
          </div>

          <p
            className="
              mt-1.5

              max-w-[470px]

              font-brand-sans

              text-[9px]
              font-medium
              leading-[1.6]

              text-[var(--brand-text-muted)]

              sm:text-[10px]
            "
          >
            {text}
          </p>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   BACKGROUND
========================================================= */

function SubtleBackground() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none

        absolute
        inset-0

        overflow-hidden
      "
    >
      <div
        className="
          absolute

          -right-[100px]
          -top-[130px]

          hidden

          h-[270px]
          w-[270px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />

      <div
        className="
          absolute

          -bottom-[130px]
          left-[28%]

          hidden

          h-[240px]
          w-[430px]

          rounded-full

          bg-white/20

          blur-3xl

          lg:block
        "
      />
    </div>
  );
}
