import { Check, Hammer, Layers3, Sofa, Sparkles, Store } from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const workshopActivities = [
  "Browse our full collection of sofa catalogues",
  "Explore fabric samples in person",
  "Discuss dimensions, configuration and comfort",
  "Plan a bespoke sofa around your room",
  "Review options for commercial seating",
  "Arrange a sofa repair or restoration assessment",
  "Bring a suitable sofa, chair or cushion for drop-off",
  "Place an order and make payment at the workshop",
];

/* =========================================================
   ROOT
========================================================= */

export default function WorkingWorkshopSection() {
  return (
    <section
      aria-labelledby="working-workshop-heading"
      className="
        bg-[var(--brand-ivory)]

        px-3
        py-8

        sm:px-5
        sm:py-10

        lg:px-7
        lg:py-12
      "
    >
      <div className="mx-auto max-w-[var(--site-width)]">
        {/* =====================================================
            MAIN CLAY SHELL
        ====================================================== */}

        <div
          className="
            clay-surface-soft

            rounded-[28px]

            p-[5px]

            sm:rounded-[32px]
            sm:p-[6px]

            lg:rounded-[36px]
          "
        >
          <div
            className="
              clay-inset

              relative
              overflow-hidden

              rounded-[23px]

              bg-[linear-gradient(135deg,#FFFDF8_0%,#F7F0E6_100%)]

              px-5
              py-6

              sm:rounded-[27px]
              sm:px-7
              sm:py-8

              lg:rounded-[30px]
              lg:px-9
              lg:py-9
            "
          >
            <QuietDecoration />

            {/* =================================================
                CONTENT
            ================================================== */}

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[0.9fr_1.1fr]
                lg:items-start
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  LEFT — EXPLANATION
              ================================================== */}

              <div>
                {/* EYEBROW */}

                <div
                  className="
                    flex
                    items-center
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
                    <Hammer size={15} strokeWidth={1.5} />
                  </span>

                  <span
                    className="
                      font-brand-sans

                      text-[13px]
                      font-bold
                      uppercase

                      tracking-[0.2em]

                      text-[var(--brand-gold-700)]

                      sm:text-[11px]
                    "
                  >
                    A Working London Workshop
                  </span>
                </div>

                {/* H2 */}

                <h2
                  id="working-workshop-heading"
                  className="
                    mt-4

                    max-w-[720px]

                    font-brand-display

                    text-[34px]
                    font-semibold
                    leading-[1]

                    tracking-[-0.035em]

                    text-[var(--brand-navy)]

                    sm:text-[42px]

                    lg:text-[48px]
                  "
                >
                  A Working Workshop,
                  <span className="block">
                    Not a Conventional Sofa Shop
                    <span className="text-[var(--brand-gold)]">.</span>
                  </span>
                </h2>

                {/* LEAD */}

                <p
                  className="
                    mt-5

                    max-w-[620px]

                    font-brand-display

                    text-[19px]
                    font-medium
                    italic
                    leading-[1.45]

                    text-[var(--brand-navy)]

                    sm:text-[21px]
                  "
                >
                  Sofa N More is a working sofa and upholstery workshop rather
                  than a conventional retail showroom.
                </p>

                {/* BODY */}

                <div
                  className="
                    mt-5

                    max-w-[650px]

                    space-y-4

                    font-brand-sans

                    text-[11px]
                    font-medium
                    leading-[1.75]

                    text-[var(--brand-text-muted)]

                    sm:text-[12px]

                    lg:text-[13px]
                  "
                >
                  <p>
                    You will not find rows of ready-made sofas waiting to be
                    taken home on the same day.
                  </p>

                  <p>
                    Instead, this is where made-to-order projects begin,
                    upholstery options are explored, existing sofas are assessed
                    and commercial seating requirements are developed into clear
                    specifications.
                  </p>
                </div>

                {/* =================================================
                    SIMPLE CONTRAST
                ================================================== */}

                <div
                  className="
                    mt-6

                    grid
                    gap-2.5

                    sm:grid-cols-2
                  "
                >
                  <ContrastItem
                    icon={Store}
                    label="Not a Retail Showroom"
                    text="No rows of ready-made stock to choose from and take home."
                    muted
                  />

                  <ContrastItem
                    icon={Hammer}
                    label="A Working Workshop"
                    text="A place to define, order, assess and develop the right solution."
                  />
                </div>

             
              </div>

              {/* =================================================
                  RIGHT — VISIT CHECKLIST
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
                    rounded-[18px]

                    bg-[#FFFDF8]/70

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
                      <Layers3 size={15} strokeWidth={1.6} />
                    </span>

                    <div>
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
                        During Your Visit
                      </span>

                      <h3
                        className="
                          mt-1.5

                          font-brand-display

                          text-[22px]
                          font-semibold
                          leading-[1.2]

                          text-[var(--brand-navy)]

                          sm:text-[25px]
                        "
                      >
                        What you can do at the workshop.
                      </h3>
                    </div>
                  </div>

                  {/* LIST */}

                  <div
                    className="
                      mt-5

                      grid
                      gap-x-6

                      sm:grid-cols-2
                    "
                  >
                    {workshopActivities.map((activity) => (
                      <ActivityRow key={activity} text={activity} />
                    ))}
                  </div>

                  {/* SMALL NOTE */}

                  <div
                    className="
                      mt-5

                      border-t
                      border-[var(--brand-navy)]/10

                      pt-4
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        gap-2.5
                      "
                    >
                      <Sparkles
                        size={13}
                        strokeWidth={1.5}
                        className="
                          mt-[2px]
                          shrink-0

                          text-[var(--brand-gold-700)]
                        "
                      />

                      <p
                        className="
                          max-w-[580px]

                          font-brand-sans

                          text-[12px]
                          font-medium
                          leading-[1.6]

                          text-[var(--brand-text-muted)]

                          sm:text-[13px]
                        "
                      >
                        Catalogues, upholstery options and project requirements
                        can be explored with the team before an order or next
                        step is agreed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                CLOSING STATEMENT
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-6

                rounded-[19px]

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
                  <Sofa size={14} strokeWidth={1.6} />
                </span>

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
                    The Purpose of Your Visit
                  </span>

                  <p
                    className="
                      mt-1

                      max-w-[1000px]
 

                      text-[18px]
                      font-semibold
                      leading-[1.4]

                      text-white

 
                      lg:text-[16px]
                    "
                  >
                    Not to choose the closest available sofa from stock — but to
                    define the right solution for your space, your existing sofa
                    or your commercial project.
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
   CONTRAST
========================================================= */

function ContrastItem({
  icon: Icon,
  label,
  text,
  muted = false,
}: {
  icon: typeof Store;
  label: string;
  text: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`
        rounded-[16px]

        px-3.5
        py-3.5

        ${
          muted
            ? "border border-[var(--brand-navy)]/[0.07] bg-white/30"
            : "bg-[var(--brand-navy)]"
        }
      `}
    >
      <div
        className="
          flex
          items-start
          gap-2.5
        "
      >
        <span
          className={`
            flex
            h-7
            w-7

            shrink-0

            items-center
            justify-center

            rounded-full

            ${
              muted
                ? "bg-[var(--brand-navy)] text-[var(--brand-gold)]"
                : "bg-[var(--brand-gold)] text-[var(--brand-navy)]"
            }
          `}
        >
          <Icon size={11} strokeWidth={1.5} />
        </span>

        <div>
          <strong
            className={`
              block

              font-brand-sans

              text-[11px]
              font-bold

              ${muted ? "text-[var(--brand-navy)]" : "text-white"}
            `}
          >
            {label}
          </strong>

          <p
            className={`
              mt-1

              font-brand-sans

              text-[11px]
              font-medium
              leading-[1.5]

              ${muted ? "text-[var(--brand-text-muted)]" : "text-white/55"}
            `}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ACTIVITY ROW
========================================================= */

function ActivityRow({ text }: { text: string }) {
  return (
    <div
      className="
        flex
        items-start
        gap-2.5

        border-b
        border-[var(--brand-navy)]/[0.07]

        py-2.5
      "
    >
      <span
        className="
          mt-[1px]

          flex
          h-4
          w-4

          shrink-0

          items-center
          justify-center

          rounded-full

          bg-[var(--brand-navy)]

          text-[var(--brand-gold)]
        "
      >
        <Check size={8} strokeWidth={2} />
      </span>

      <span
        className="
          font-brand-sans

          text-[11px]
          font-semibold
          leading-[1.5]

          text-[var(--brand-navy)]

          sm:text-[12px]
        "
      >
        {text}
      </span>
    </div>
  );
}

/* =========================================================
   DECORATION
========================================================= */

function QuietDecoration() {
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

          -right-[80px]
          -top-[100px]

          hidden

          h-[200px]
          w-[200px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />
    </div>
  );
}
