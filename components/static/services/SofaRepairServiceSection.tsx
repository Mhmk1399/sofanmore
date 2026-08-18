import Image from "next/image";

import {
  Camera,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  Sofa,
  Sparkles,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type AssessmentItem = {
  title: string;
  icon: LucideIcon;
};

type RestorationType = {
  title: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const assessmentItems: AssessmentItem[] = [
  {
    title: "The present condition of the sofa",
    icon: Search,
  },
  {
    title: "What has changed",
    icon: Sofa,
  },
  {
    title: "What you would like to preserve",
    icon: Heart,
  },
  {
    title: "What you would like to improve",
    icon: Sparkles,
  },
  {
    title: "Whether restoration is practical for the piece",
    icon: ShieldCheck,
  },
];

const restorationTypes: RestorationType[] = [
  {
    title: "Worn sofas",
    icon: Sofa,
  },
  {
    title: "Damaged upholstered areas",
    icon: ShieldCheck,
  },
  {
    title: "Older or character sofas",
    icon: Heart,
  },
  {
    title: "Existing bespoke sofas",
    icon: Sofa,
  },
  {
    title: "Sofas that have lost comfort or appearance",
    icon: Sparkles,
  },
  {
    title: "Much-loved pieces worth preserving",
    icon: Heart,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function SofaRepairServiceSection() {
  return (
    <section
      aria-labelledby="sofa-repair-service-heading"
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
                TOP
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
                  CONTENT
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
                    <Sofa size={15} strokeWidth={1.5} />
                  </span>

                  <div>
                    <span
                      className="
                        block

                        font-brand-sans

                        text-[8px]
                        font-bold
                        uppercase

                        tracking-[0.22em]

                        text-[var(--brand-gold-700)]

                        sm:text-[9px]
                      "
                    >
                      Sofa Repair & Restoration
                    </span>

                    <div
                      className="
                        mt-1

                        flex
                        items-center
                        gap-1.5
                      "
                    >
                      <MapPin
                        size={10}
                        strokeWidth={1.5}
                        className="
                          text-[var(--brand-text-muted)]
                        "
                      />

                      <span
                        className="
                          font-brand-sans

                          text-[8px]
                          font-medium

                          text-[var(--brand-text-muted)]

                          sm:text-[9px]
                        "
                      >
                        Cricklewood · North West London
                      </span>
                    </div>
                  </div>
                </div>

                {/* HEADING */}

                <h2
                  id="sofa-repair-service-heading"
                  className="
                    mt-4

                    max-w-[730px]

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
                  Sofa Repair & Restoration
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                {/* SUBHEADING */}

                <p
                  className="
                    mt-6

                    max-w-[650px]

                    font-brand-display

                    text-[21px]
                    font-semibold
                    leading-[1.3]

                    text-[var(--brand-navy)]

                    sm:text-[24px]
                  "
                >
                  Give a Sofa Worth Keeping Another Life
                </p>

                {/* LEAD */}

                <p
                  className="
                    mt-5

                    max-w-[640px]

                    font-brand-display

                    text-[18px]
                    font-medium
                    italic
                    leading-[1.45]

                    text-[var(--brand-navy)]

                    sm:text-[20px]
                  "
                >
                  A worn or damaged sofa does not always need to be replaced.
                </p>

                {/* BODY */}

                <div
                  className="
                    mt-5

                    max-w-[680px]

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
                    It may still fit the room perfectly. You may still value its
                    proportions, comfort or character. It may have been made
                    specifically for your space.
                  </p>

                  <p>
                    Or it may carry personal meaning that a new sofa cannot
                    reproduce.
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
                    Assessment Comes First
                  </span>

                  <p
                    className="
                      mt-1.5

                      max-w-[590px]

                      font-brand-display

                      text-[21px]
                      font-semibold
                      leading-[1.3]

                      text-[var(--brand-navy)]

                      sm:text-[23px]
                    "
                  >
                    The first step is understanding the individual sofa before
                    deciding what restoration should involve.
                  </p>
                </div>

                {/* CTA */}

                <div className="mt-7">
                  <ClayButton
                    href="/services/sofa-repair-restoration"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Explore sofa repair and restoration in Cricklewood and North West London"
                  >
                    Explore Sofa Repair & Restoration
                  </ClayButton>

                  <p
                    className="
                      mt-2.5

                      font-brand-sans

                      text-[8px]
                      font-semibold

                      text-[var(--brand-text-muted)]

                      sm:text-[9px]
                    "
                  >
                    Cricklewood · Staples Corner · North West London
                  </p>
                </div>
              </div>

              {/* =================================================
                  VISUAL / LOCAL ASSESSMENT
              ================================================== */}

              <RepairVisual />
            </div>

            {/* =================================================
                ASSESSMENT + PROJECT TYPES
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-7

                grid
                gap-4

                lg:mt-9
                lg:grid-cols-2
              "
            >
              {/* =================================================
                  ASSESSMENT
              ================================================== */}

              <div
                className="
                  clay-surface-soft

                  rounded-[22px]

                  p-[5px]
                "
              >
                <div
                  className="
                    clay-inset

                    h-full

                    rounded-[18px]

                    px-4
                    py-5

                    sm:px-5
                    sm:py-6
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
                      <Search size={15} strokeWidth={1.5} />
                    </span>

                    <div>
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
                        What We Need to Understand
                      </span>

                      <h3
                        className="
                          mt-1.5

                          font-brand-display

                          text-[22px]
                          font-semibold
                          leading-[1.2]

                          text-[var(--brand-navy)]

                          sm:text-[24px]
                        "
                      >
                        Start with the condition of the sofa.
                      </h3>
                    </div>
                  </div>

                  <div
                    className="
                      mt-5

                      grid
                      gap-2
                    "
                  >
                    {assessmentItems.map(({ title, icon: Icon }) => (
                      <AssessmentRow key={title} title={title} icon={Icon} />
                    ))}
                  </div>
                </div>
              </div>

              {/* =================================================
                  PROJECT TYPES
              ================================================== */}

              <div
                className="
                  clay-surface-soft

                  rounded-[22px]

                  p-[5px]
                "
              >
                <div
                  className="
                    clay-inset

                    h-full

                    rounded-[18px]

                    px-4
                    py-5

                    sm:px-5
                    sm:py-6
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
                        h-10
                        w-10

                        shrink-0

                        items-center
                        justify-center

                        rounded-full

                        bg-[var(--brand-gold)]

                        text-[var(--brand-navy)]
                      "
                    >
                      <Heart size={15} strokeWidth={1.6} />
                    </span>

                    <div>
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
                        Sofas Worth Exploring
                      </span>

                      <h3
                        className="
                          mt-1.5

                          font-brand-display

                          text-[22px]
                          font-semibold
                          leading-[1.2]

                          text-[var(--brand-navy)]

                          sm:text-[24px]
                        "
                      >
                        Different sofas need different answers.
                      </h3>
                    </div>
                  </div>

                  <div
                    className="
                      mt-5

                      grid
                      gap-2

                      sm:grid-cols-2
                    "
                  >
                    {restorationTypes.map(({ title, icon: Icon }) => (
                      <RestorationTypeItem
                        key={title}
                        title={title}
                        icon={Icon}
                      />
                    ))}
                  </div>

                  {/* BESPOKE CROSS-LINK */}

                  <div
                    className="
                      mt-5

                      border-t
                      border-[var(--brand-navy)]/[0.08]

                      pt-5
                    "
                  >
                    <p
                      className="
                        max-w-[520px]

                        font-brand-sans

                        text-[9px]
                        font-medium
                        leading-[1.6]

                        text-[var(--brand-text-muted)]

                        sm:text-[10px]
                      "
                    >
                      If you are considering replacing an existing
                      made-to-measure sofa rather than restoring it, our bespoke
                      sofa service may also be relevant.
                    </p>

                    <div className="mt-3">
                      <ClayButton
                        href="/services/bespoke-sofas"
                        variant="outline"
                        size="sm"
                        showArrow
                        ariaLabel="Explore bespoke sofas from Sofa N More"
                      >
                        Explore Bespoke Sofas
                      </ClayButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                LOCAL STARTING POINT
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-5

                rounded-[20px]

                bg-[var(--brand-navy)]

                px-4
                py-5

                sm:px-5
                sm:py-6
              "
            >
              <div
                className="
                  grid
                  gap-5

                  lg:grid-cols-[auto_1fr_auto]
                  lg:items-center
                  lg:gap-6
                "
              >
                <span
                  className="
                    flex
                    h-11
                    w-11

                    shrink-0

                    items-center
                    justify-center

                    rounded-full

                    bg-[var(--brand-gold)]

                    text-[var(--brand-navy)]
                  "
                >
                  <Camera size={17} strokeWidth={1.5} />
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
                    Sofa Repair in Cricklewood & Nearby
                  </span>

                  <h3
                    className="
                      mt-1.5

                      max-w-[850px]

                      font-brand-display

                      text-[20px]
                      font-semibold
                      leading-[1.3]

                      text-white

                      sm:text-[23px]
                    "
                  >
                    Start by showing us the sofa as it is today.
                  </h3>

                  <p
                    className="
                      mt-2

                      max-w-[850px]

                      font-brand-sans

                      text-[9px]
                      font-medium
                      leading-[1.65]

                      text-white/55

                      sm:text-[10px]
                    "
                  >
                    Send clear photographs of the complete sofa and close-ups of
                    the affected sections so we can begin understanding the
                    condition.
                  </p>
                </div>

                <div className="lg:justify-self-end">
                  <ClayButton
                    href="/contact-us"
                    variant="ivory"
                    size="sm"
                    showArrow
                    ariaLabel="Send Sofa N More photographs and details of your sofa"
                  >
                    Send Sofa Details
                  </ClayButton>
                </div>
              </div>
            </div>

            {/* =================================================
                CLOSING MESSAGE
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-5

                flex
                items-start
                gap-3

                border-l-2
                border-[var(--brand-gold)]

                pl-4
              "
            >
              <div>
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
                  No Generic Promise
                </span>

                <p
                  className="
                    mt-1.5

                    max-w-[900px]

                    font-brand-display

                    text-[18px]
                    font-semibold
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[21px]
                  "
                >
                  Not every sofa needs the same work and not every piece will
                  suit the same restoration process — which is why the
                  assessment comes first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   REPAIR VISUAL
========================================================= */

function RepairVisual() {
  return (
    <figure
      className="
        mx-auto

        w-full
        max-w-[680px]

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

          overflow-hidden

          rounded-[21px]

          p-[5px]

          sm:rounded-[24px]
          sm:p-[6px]
        "
      >
        <div
          className="
            relative

            aspect-[4/3]

            overflow-hidden

            rounded-[17px]

            bg-[#E7DED2]

            sm:rounded-[20px]
          "
        >
          <Image
            src="/assets/images/Repair.webp"
            alt="Sofa repair and restoration by Sofa N More in North West London"
            fill
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="
              object-contain
              object-center
            "
          />
        </div>

        <figcaption
          className="
            px-2
            pb-1
            pt-4

            sm:px-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <MapPin
              size={11}
              strokeWidth={1.5}
              className="
                text-[var(--brand-gold-700)]
              "
            />

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
              North West London
            </span>
          </div>

          <p
            className="
              mt-1.5

              max-w-[520px]

              font-brand-display

              text-[18px]
              font-semibold
              leading-[1.3]

              text-[var(--brand-navy)]

              sm:text-[20px]
            "
          >
            Preserve what makes the sofa worth keeping. Address what prevents
            you from enjoying it.
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

/* =========================================================
   ASSESSMENT ROW
========================================================= */

function AssessmentRow({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3

        rounded-[14px]

        bg-white/35

        px-3
        py-2.5
      "
    >
      <span
        className="
          flex
          h-7
          w-7

          shrink-0

          items-center
          justify-center

          rounded-full

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        <Icon size={11} strokeWidth={1.5} />
      </span>

      <span
        className="
          font-brand-sans

          text-[8px]
          font-semibold
          leading-[1.45]

          text-[var(--brand-navy)]

          sm:text-[9px]
        "
      >
        {title}
      </span>
    </div>
  );
}

/* =========================================================
   RESTORATION TYPE
========================================================= */

function RestorationTypeItem({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-2.5

        rounded-[13px]

        bg-white/35

        px-3
        py-2.5
      "
    >
      <span
        className="
          mt-[1px]

          flex
          h-5
          w-5

          shrink-0

          items-center
          justify-center

          rounded-full

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        <Icon size={9} strokeWidth={1.5} />
      </span>

      <span
        className="
          font-brand-sans

          text-[8px]
          font-semibold
          leading-[1.45]

          text-[var(--brand-navy)]

          sm:text-[9px]
        "
      >
        {title}
      </span>
    </div>
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

          -right-[110px]
          -top-[140px]

          hidden

          h-[290px]
          w-[290px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />

      <div
        className="
          absolute

          -bottom-[125px]
          left-[28%]

          hidden

          h-[230px]
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
