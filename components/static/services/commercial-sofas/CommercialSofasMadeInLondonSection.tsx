import Image from "next/image";

import { Check, Hammer, MapPin, MessageSquareText } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   DATA
========================================================= */

const projectQuestions = [
  "What needs to fit here?",
  "How will people use it?",
  "What should the space feel like?",
  "What visual direction should the seating support?",
];

/* =========================================================
   ROOT
========================================================= */

export default function CommercialSofasMadeInLondonSection() {
  return (
    <section
      aria-labelledby="commercial-sofas-made-london-heading"
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
        {/* =====================================================
            MAIN SHELL
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
                TOP BRAND LINE
            ================================================== */}

            <div
              className="
                mb-7

                flex
                flex-wrap

                items-center
                justify-between

                gap-4

                border-b
                border-[var(--brand-navy)]/10

                pb-5
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
                    flex
                    h-9
                    w-9

                    items-center
                    justify-center

                    rounded-full

                    bg-[var(--brand-navy)]

                    text-[var(--brand-gold)]
                  "
                >
                  <Hammer size={15} strokeWidth={1.5} />
                </span>

                <div>
                  <span
                    className="
                      block

                      font-brand-sans

                      text-[7px]
                      font-bold
                      uppercase

                      tracking-[0.2em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    Sofa N More
                  </span>

                  <span
                    className="
                      mt-1
                      block

                      font-brand-sans

                      text-[9px]
                      font-semibold

                      text-[var(--brand-navy)]
                    "
                  >
                    Bespoke Sofa Workshop · London
                  </span>
                </div>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <MapPin
                  size={13}
                  strokeWidth={1.5}
                  className="
                    text-[var(--brand-gold-700)]
                  "
                />

                <span
                  className="
                    font-brand-sans

                    text-[7px]
                    font-bold
                    uppercase

                    tracking-[0.14em]

                    text-[var(--brand-text-muted)]
                  "
                >
                  North West London
                </span>
              </div>
            </div>

            {/* =================================================
                MAIN GRID
            ================================================== */}

            <div
              className="
                grid
                gap-8

                lg:grid-cols-[0.92fr_1.08fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  WORKSHOP IMAGE
              ================================================== */}

              <div
                className="
                  order-2

                  lg:order-1
                "
              >
                <WorkshopImage />
              </div>

              {/* =================================================
                  CONTENT
              ================================================== */}

              <div
                className="
                  order-1

                  lg:order-2
                "
              >
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
                    Our London Workshop
                  </span>
                </div>

                {/* HEADING */}

                <h2
                  id="commercial-sofas-made-london-heading"
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
                  Commercial Sofas Made in London
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                {/* INTRO */}

                <p
                  className="
                    mt-6

                    max-w-[620px]

                    font-brand-display

                    text-[19px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[21px]
                  "
                >
                  Sofa N More is based in North West London, where our bespoke
                  sofas are created around the individual requirements of each
                  project.
                </p>

                {/* BODY */}

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
                    For a commercial client, a bespoke approach means the
                    project is not limited to a catalogue of standard sofa
                    dimensions.
                  </p>

                  <p>
                    Instead, the conversation can begin with your actual room.
                  </p>
                </div>

                {/* =================================================
                    QUESTIONS
                ================================================== */}

                <div
                  className="
                    mt-6

                    rounded-[20px]

                    bg-[var(--brand-navy)]

                    px-4
                    py-5

                    sm:px-5
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
                      <MessageSquareText size={14} strokeWidth={1.6} />
                    </span>

                    <div>
                      <span
                        className="
                          block

                          font-brand-sans

                          text-[6px]
                          font-bold
                          uppercase

                          tracking-[0.17em]

                          text-[var(--brand-gold)]
                        "
                      >
                        Every Project Starts With
                      </span>

                      <p
                        className="
                          mt-1

                          font-brand-display

                          text-[18px]
                          font-semibold

                          text-white

                          sm:text-[20px]
                        "
                      >
                        The right questions.
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      mt-4

                      grid
                      gap-2

                      sm:grid-cols-2
                    "
                  >
                    {projectQuestions.map((question) => (
                      <ProjectQuestion key={question}>
                        {question}
                      </ProjectQuestion>
                    ))}
                  </div>
                </div>

                {/* FINAL MESSAGE */}

                <p
                  className="
                    mt-5

                    max-w-[610px]

                    font-brand-display

                    text-[20px]
                    font-semibold
                    leading-[1.35]

                    text-[var(--brand-navy)]

                    sm:text-[22px]
                  "
                >
                  From there, the sofa can be developed around the answer.
                </p>

                {/* =================================================
                    ADDRESS
                ================================================== */}

                <div
                  className="
                    mt-6

                    flex
                    items-start
                    gap-3
                  "
                >
                  <span
                    className="
                      mt-0.5

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
                    <MapPin size={15} strokeWidth={1.6} />
                  </span>

                  <address
                    className="
                      not-italic
                    "
                  >
                    <strong
                      className="
                        block

                        font-brand-display

                        text-[17px]
                        font-semibold

                        text-[var(--brand-navy)]
                      "
                    >
                      Sofa N More
                    </strong>

                    <p
                      className="
                        mt-1.5

                        font-brand-sans

                        text-[10px]
                        font-medium
                        leading-[1.65]

                        text-[var(--brand-text-muted)]

                        sm:text-[11px]
                      "
                    >
                      Unit G19, Atlas Business Centre
                      <br />
                      Oxgate Lane, Staples Corner West
                      <br />
                      London NW2 7HJ
                    </p>
                  </address>
                </div>

                {/* CTA */}

                <div
                  className="
                    mt-7

                    sm:w-fit
                  "
                >
                  <ClayButton
                    href="/contact-us"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Contact the Sofa N More London workshop"
                  >
                    Contact Our London Workshop
                  </ClayButton>
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
   PROJECT QUESTION
========================================================= */

function ProjectQuestion({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        flex
        items-center
        gap-2.5

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
          h-5
          w-5

          shrink-0

          items-center
          justify-center

          rounded-full

          bg-white/[0.08]

          text-[var(--brand-gold)]
        "
      >
        <Check size={10} strokeWidth={2} />
      </span>

      <span
        className="
          font-brand-sans

          text-[8px]
          font-semibold
          leading-[1.4]

          text-white/80

          sm:text-[9px]
        "
      >
        {children}
      </span>
    </div>
  );
}

/* =========================================================
   WORKSHOP IMAGE
========================================================= */

function WorkshopImage() {
  return (
    <figure
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

          overflow-hidden

          rounded-[21px]

          bg-[#E5DBCE]

          p-[5px]

          sm:rounded-[24px]
          sm:p-[6px]
        "
      >
        {/* IMAGE */}

        <div
          className="
            relative

            aspect-[4/3]

            w-full

            overflow-hidden

            rounded-[17px]

            bg-[#DED4C7]

            sm:rounded-[20px]
          "
        >
          <Image
            src="/assets/images/Repair.webp"
            alt="Sofa N More bespoke sofa workshop in London"
            fill
            sizes="(max-width: 1023px) 100vw, 45vw"
            className="
               object-cover
            "
          />
        </div>

        {/* CAPTION */}

        <figcaption
          className="
            flex
            items-center
            justify-between

            gap-4

            px-2
            pb-1
            pt-4

            sm:px-3
          "
        >
          <div>
            <span
              className="
                block

                font-brand-sans

                text-[6px]
                font-bold
                uppercase

                tracking-[0.16em]

                text-[var(--brand-gold-700)]
              "
            >
              Sofa N More
            </span>

            <p
              className="
                mt-1

                font-brand-display

                text-[17px]
                font-semibold

                text-[var(--brand-navy)]

                sm:text-[19px]
              "
            >
              Our London workshop.
            </p>
          </div>

          <span
            className="
              hidden

              font-brand-sans

              text-[6px]
              font-bold
              uppercase

              tracking-[0.13em]

              text-[var(--brand-text-muted)]

              sm:block
            "
          >
            NW London
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
