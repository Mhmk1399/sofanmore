import {
  LayoutGrid,
  Layers3,
  Palette,
  Settings2,
  Sofa,
  Sparkles,
  SunMedium,
  UsersRound,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const commercialFactors = [
  {
    label: "Brand Character",
    icon: Sparkles,
  },
  {
    label: "Layout",
    icon: LayoutGrid,
  },
  {
    label: "Customer Experience",
    icon: UsersRound,
  },
  {
    label: "Seating",
    icon: Sofa,
  },
  {
    label: "Materials",
    icon: Layers3,
  },
  {
    label: "Colour",
    icon: Palette,
  },
  {
    label: "Atmosphere",
    icon: SunMedium,
  },
  {
    label: "Practical Use",
    icon: Settings2,
  },
] satisfies {
  label: string;
  icon: LucideIcon;
}[];

const experienceExamples = [
  {
    label: "Restaurant",
    text: "Sets expectations through atmosphere.",
  },
  {
    label: "Hotel",
    text: "Shapes the first impression of a stay.",
  },
  {
    label: "Reception",
    text: "Communicates something about the company.",
  },
  {
    label: "Café",
    text: "Creates a mood before anything is ordered.",
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function CommercialInteriorDesignSection({
  id = "commercial",
}: {
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby="commercial-interior-design-heading"
      className="
        scroll-mt-24
        bg-[var(--brand-ivory)]

        px-3
        py-9

        sm:px-5
        sm:py-11

        lg:px-7
        lg:py-14
      "
    >
      <div
        className="
          mx-auto
          max-w-[var(--site-width)]
        "
      >
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
            {/* =================================================
                MAIN GRID
            ================================================== */}

            <div
              className="
                grid
                gap-8

                lg:grid-cols-[0.94fr_1.06fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  CONTENT
              ================================================== */}

              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <span
                    className="
                      h-px
                      w-9

                      bg-[var(--brand-gold)]
                    "
                  />

                  <span
                    className="
                      font-brand-sans

                      text-[11px]
                      font-bold
                      uppercase

                      tracking-[0.22em]

                      text-[var(--brand-gold-700)]

                      sm:text-[12px]
                    "
                  >
                    Commercial Interiors
                  </span>
                </div>

                {/* HEADING */}

                <h2
                  id="commercial-interior-design-heading"
                  className="
                    mt-4

                    max-w-[680px]

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
                  Commercial Interior Design in London
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                {/* INTRO */}

                <p
                  className="
                    mt-6

                    max-w-[600px]

                    font-brand-display

                    text-[19px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[21px]
                  "
                >
                  A commercial space communicates something about the business
                  before a conversation even begins.
                </p>

                {/* EXAMPLES */}

                <div
                  className="
                    mt-6

                    grid
                    gap-2

                    sm:grid-cols-2
                  "
                >
                  {experienceExamples.map((item) => (
                    <ExperienceExample
                      key={item.label}
                      label={item.label}
                      text={item.text}
                    />
                  ))}
                </div>

                {/* BODY */}

                <div
                  className="
                    mt-6

                    max-w-[640px]

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
                    A café can feel intimate, energetic, premium or relaxed
                    before a customer has ordered anything.
                  </p>

                  <p>
                    That makes interior design part of the wider customer
                    experience.
                  </p>
                </div>

                {/* KEY STATEMENT */}

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

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.17em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    Our Approach
                  </span>

                  <p
                    className="
                      mt-1.5

                      max-w-[580px]

                      font-brand-display

                      text-[21px]
                      font-semibold
                      leading-[1.3]

                      text-[var(--brand-navy)]

                      sm:text-[23px]
                    "
                  >
                    Every major decision should contribute to the same
                    experience.
                  </p>
                </div>
              </div>

              {/* =================================================
                  CONNECTED EXPERIENCE PANEL
              ================================================== */}

              <div
                className="
                  mx-auto

                  w-full
                  max-w-[650px]
                "
              >
                <ConnectedExperiencePanel />
              </div>
            </div>

            {/* =================================================
                FINAL STATEMENT
            ================================================== */}

            <div
              className="
                mt-7

                rounded-[19px]

                bg-[var(--brand-navy)]

                px-4
                py-4

                sm:px-5
                sm:py-5

                lg:mt-9
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
                    mt-1

                    h-2
                    w-2

                    shrink-0

                    rounded-full

                    bg-[var(--brand-gold)]
                  "
                />

                <div>
                  <span
                    className="
                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.18em]

                      text-[var(--brand-gold)]
                    "
                  >
                    The Strongest Spaces
                  </span>

                  <p
                    className="
                      mt-1

                      max-w-[920px]

                      font-brand-display

                      text-[18px]
                      font-semibold
                      leading-[1.35]

                      text-white

                      sm:text-[21px]

                      lg:text-[23px]
                    "
                  >
                    They do not feel like a collection of unrelated design
                    decisions.{" "}
                    <span
                      className="
                        text-[var(--brand-gold)]
                      "
                    >
                      They feel intentional.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCE EXAMPLE
========================================================= */

function ExperienceExample({ label, text }: { label: string; text: string }) {
  return (
    <div
      className="
        flex
        items-start

        gap-3

        rounded-[15px]

        border
        border-[var(--brand-navy)]/[0.06]

        bg-white/25

        px-3
        py-3
      "
    >
      <span
        className="
          mt-[5px]

          h-1.5
          w-1.5

          shrink-0

          rounded-full

          bg-[var(--brand-gold)]
        "
      />

      <div>
        <strong
          className="
            block

            font-brand-sans

            text-[13px]
            font-bold
            uppercase

            tracking-[0.12em]

            text-[var(--brand-navy)]
          "
        >
          {label}
        </strong>

        <p
          className="
            mt-1

            font-brand-sans

            text-[12px]
            font-medium
            leading-[1.5]

            text-[var(--brand-text-muted)]

            sm:text-[13px]
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   CONNECTED EXPERIENCE PANEL
========================================================= */

function ConnectedExperiencePanel() {
  return (
    <div
      className="
        clay-surface-strong

        rounded-[27px]
        p-[6px]

        sm:rounded-[31px]
        sm:p-[7px]
      "
    >
      <div
        className="
          overflow-hidden

          rounded-[21px]

          bg-[var(--brand-navy)]

          px-4
          py-5

          sm:rounded-[24px]
          sm:px-6
          sm:py-6
        "
      >
        {/* HEADER */}

        <div>
          <span
            className="
              font-brand-sans

              text-[13px]
              font-bold
              uppercase

              tracking-[0.18em]

              text-[var(--brand-gold)]
            "
          >
            One Connected Experience
          </span>

          <h3
            className="
              mt-2

              max-w-[480px]

              font-brand-display

              text-[25px]
              font-semibold
              leading-[1.12]

              tracking-[-0.025em]

              text-white

              sm:text-[28px]
            "
          >
            The interior should work as one complete system.
          </h3>

          <p
            className="
              mt-3

              max-w-[500px]

              font-brand-sans

              text-[13px]
              font-medium
              leading-[1.65]

              text-white/55

              sm:text-[11px]
            "
          >
            We consider how each of these decisions contributes to the
            atmosphere, identity and practical use of the space.
          </p>
        </div>

        {/* FACTORS */}

        <div
          className="
            mt-5

            grid
            grid-cols-2

            gap-2

            sm:gap-2.5
          "
        >
          {commercialFactors.map(({ label, icon: Icon }) => (
            <CommercialFactor key={label} label={label} icon={Icon} />
          ))}
        </div>

        {/* BOTTOM */}

        <div
          className="
            mt-5

            border-t
            border-white/10

            pt-5
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
              <Sparkles size={13} strokeWidth={1.6} />
            </span>

            <p
              className="
                max-w-[450px]

                font-brand-display

                text-[17px]
                font-medium
                leading-[1.3]

                text-white

                sm:text-[19px]
              "
            >
              Brand, layout and experience should speak the same visual
              language.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   COMMERCIAL FACTOR
========================================================= */

function CommercialFactor({
  label,
  icon: Icon,
}: {
  label: string;
  icon: LucideIcon;
}) {
  return (
    <div
      className="
        flex
        min-h-[50px]

        items-center
        gap-3

        rounded-[14px]

        border
        border-white/[0.07]

        bg-white/[0.045]

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

          bg-white/[0.07]

          text-[var(--brand-gold)]
        "
      >
        <Icon size={12} strokeWidth={1.5} />
      </span>

      <span
        className="
          font-brand-sans

          text-[13px]
          font-semibold
          leading-[1.3]

          text-white/80

          sm:text-[11px]

          lg:text-[12px]
        "
      >
        {label}
      </span>
    </div>
  );
}
