import { Layers3, MoveRight, Palette, Route, Sparkles } from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const designConsiderations = [
  "Architecture",
  "Movement",
  "Colour",
  "Materials",
  "Texture",
  "Lighting",
  "Bespoke Sofas",
];

const outcomes = [
  {
    label: "Considered",
    text: "Without feeling forced.",
  },
  {
    label: "Personal",
    text: "Without becoming impractical.",
  },
  {
    label: "Distinctive",
    text: "Without losing comfort.",
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function BespokeInteriorDesignPhilosophySection() {
  return (
    <section
      aria-labelledby="bespoke-interior-philosophy-heading"
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
      <div
        className="
          mx-auto
          max-w-[var(--site-width)]
        "
      >
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

                lg:grid-cols-[0.96fr_1.04fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  COPY
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

                      text-[8px]
                      font-bold
                      uppercase

                      tracking-[0.22em]

                      text-[var(--brand-gold-700)]

                      sm:text-[9px]
                    "
                  >
                    Our Design Approach
                  </span>
                </div>

                <h2
                  id="bespoke-interior-philosophy-heading"
                  className="
                    mt-4

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
                  Bespoke Interior Design, Not a Preset Style
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                <p
                  className="
                    mt-6

                    max-w-[590px]

                    font-brand-display

                    text-[19px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[21px]
                  "
                >
                  Your interior should not look like a template.
                </p>

                <div
                  className="
                    mt-5

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
                    It should respond to the architecture, the way the space is
                    used and the atmosphere you want to create.
                  </p>

                  <p>
                    Some clients arrive with an exact vision. Others know what
                    they like but need help bringing different ideas together.
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

                      text-[6px]
                      font-bold
                      uppercase

                      tracking-[0.17em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    Our Role
                  </span>

                  <p
                    className="
                      mt-1.5

                      font-brand-display

                      text-[23px]
                      font-semibold
                      leading-[1.25]

                      text-[var(--brand-navy)]

                      sm:text-[25px]
                    "
                  >
                    Our role is to create clarity.
                  </p>
                </div>

                <p
                  className="
                    mt-5

                    max-w-[650px]

                    font-brand-sans

                    text-[12px]
                    font-medium
                    leading-[1.75]

                    text-[var(--brand-text-muted)]

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  We consider how the room connects, how people move through it,
                  where attention should naturally fall and how colour,
                  materials, textures, lighting and bespoke sofas can work
                  together as one complete environment.
                </p>
              </div>

              {/* =================================================
                  DESIGN PANEL
              ================================================== */}

              <div
                className="
                  mx-auto
                  w-full
                  max-w-[650px]
                "
              >
                <DesignPhilosophyPanel />
              </div>
            </div>

            {/* =================================================
                OUTCOMES
            ================================================== */}

            <div
              className="
                mt-7

                grid
                gap-2.5

                sm:grid-cols-3

                lg:mt-9
              "
            >
              {outcomes.map((item) => (
                <Outcome key={item.label} label={item.label} text={item.text} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DESIGN PHILOSOPHY PANEL
========================================================= */

function DesignPhilosophyPanel() {
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
          clay-inset

          rounded-[21px]

          px-4
          py-5

          sm:rounded-[24px]
          sm:px-6
          sm:py-6
        "
      >
        {/* =====================================================
            FROM / TO
        ====================================================== */}

        <div
          className="
            grid
            gap-3

            sm:grid-cols-[1fr_auto_1fr]
            sm:items-center
          "
        >
          {/* PRESET */}

          <div
            className="
              rounded-[18px]

              border
              border-[var(--brand-navy)]/8

              bg-white/25

              px-4
              py-4
            "
          >
            <span
              className="
                font-brand-sans

                text-[6px]
                font-bold
                uppercase

                tracking-[0.16em]

                text-[var(--brand-text-muted)]
              "
            >
              Not
            </span>

            <p
              className="
                mt-1.5

                font-brand-display

                text-[20px]
                font-semibold

                text-[var(--brand-navy)]
              "
            >
              A preset look.
            </p>
          </div>

          {/* ARROW */}

          <div
            className="
              flex
              justify-center
            "
          >
            <span
              className="
                flex
                h-9
                w-9

                items-center
                justify-center

                rounded-full

                bg-[var(--brand-gold)]

                text-[var(--brand-navy)]
              "
            >
              <MoveRight
                size={15}
                strokeWidth={1.7}
                className="
                  rotate-90

                  sm:rotate-0
                "
              />
            </span>
          </div>

          {/* BESPOKE */}

          <div
            className="
              rounded-[18px]

              bg-[var(--brand-navy)]

              px-4
              py-4
            "
          >
            <span
              className="
                font-brand-sans

                text-[6px]
                font-bold
                uppercase

                tracking-[0.16em]

                text-[var(--brand-gold)]
              "
            >
              Instead
            </span>

            <p
              className="
                mt-1.5

                font-brand-display

                text-[20px]
                font-semibold

                text-white
              "
            >
              Your own direction.
            </p>
          </div>
        </div>

        {/* =====================================================
            TITLE
        ====================================================== */}

        <div
          className="
            mt-5

            border-t
            border-[var(--brand-navy)]/10

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
              <Sparkles size={14} strokeWidth={1.5} />
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
                One Complete Environment
              </span>

              <h3
                className="
                  mt-1

                  font-brand-display

                  text-[22px]
                  font-semibold
                  leading-[1.2]

                  text-[var(--brand-navy)]

                  sm:text-[24px]
                "
              >
                Every decision should belong to the same conversation.
              </h3>
            </div>
          </div>
        </div>

        {/* =====================================================
            CONSIDERATIONS
        ====================================================== */}

        <div
          className="
            mt-5

            flex
            flex-wrap

            gap-2
          "
        >
          {designConsiderations.map((item) => (
            <span
              key={item}
              className="
                clay-surface-soft

                rounded-full

                px-3
                py-2

                font-brand-sans

                text-[7px]
                font-bold
                uppercase

                tracking-[0.1em]

                text-[var(--brand-navy)]

                sm:text-[8px]
              "
            >
              {item}
            </span>
          ))}
        </div>

        {/* =====================================================
            SIMPLE PRINCIPLES
        ====================================================== */}

        <div
          className="
            mt-5

            grid
            grid-cols-3

            gap-2
          "
        >
          <SmallPrinciple
            icon={<Route size={13} strokeWidth={1.5} />}
            label="Flow"
          />

          <SmallPrinciple
            icon={<Palette size={13} strokeWidth={1.5} />}
            label="Character"
          />

          <SmallPrinciple
            icon={<Layers3 size={13} strokeWidth={1.5} />}
            label="Coherence"
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SMALL PRINCIPLE
========================================================= */

function SmallPrinciple({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="
        text-center
      "
    >
      <span
        className="
          mx-auto

          flex
          h-8
          w-8

          items-center
          justify-center

          rounded-full

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        {icon}
      </span>

      <span
        className="
          mt-2
          block

          font-brand-sans

          text-[6px]
          font-bold
          uppercase

          tracking-[0.11em]

          text-[var(--brand-text-muted)]

          sm:text-[7px]
        "
      >
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   OUTCOME
========================================================= */

function Outcome({ label, text }: { label: string; text: string }) {
  return (
    <div
      className="
        clay-surface-soft

        rounded-[18px]

        px-4
        py-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <span
          className="
            h-2
            w-2

            shrink-0

            rounded-full

            bg-[var(--brand-gold)]
          "
        />

        <div>
          <strong
            className="
              block

              font-brand-display

              text-[18px]
              font-semibold

              text-[var(--brand-navy)]

              sm:text-[19px]
            "
          >
            {label}
          </strong>

          <span
            className="
              mt-1
              block

              font-brand-sans

              text-[9px]
              font-medium

              text-[var(--brand-text-muted)]

              sm:text-[10px]
            "
          >
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}
