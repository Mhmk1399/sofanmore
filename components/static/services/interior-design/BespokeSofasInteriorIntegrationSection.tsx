import Image from "next/image";

import {
  Building2,
  Check,
  Hotel,
  Palette,
  Sofa,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   DATA
========================================================= */

const sofaApplications = [
  {
    title: "London Living Rooms",
    text: "A sofa proportioned specifically around the room.",
    icon: Sofa,
  },

  {
    title: "Statement Spaces",
    text: "A curved sofa that helps anchor an open interior.",
    icon: Sparkles,
  },

  {
    title: "Restaurants",
    text: "Integrated banquette seating developed around the layout.",
    icon: UtensilsCrossed,
  },

  {
    title: "Hotels",
    text: "Lounge sofas shaped around the wider hospitality interior.",
    icon: Hotel,
  },

  {
    title: "Workplaces",
    text: "Reception seating aligned with the identity of the space.",
    icon: Building2,
  },

  {
    title: "Material Direction",
    text: "Upholstery selected to complement the wider palette.",
    icon: Palette,
  },
] satisfies {
  title: string;
  text: string;
  icon: LucideIcon;
}[];

/* =========================================================
   ROOT
========================================================= */

export default function BespokeSofasInteriorIntegrationSection() {
  return (
    <section
      aria-labelledby="bespoke-sofas-interior-heading"
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
                TOP GRID
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
                    Sofa & Interior
                  </span>
                </div>

                <h2
                  id="bespoke-sofas-interior-heading"
                  className="
                    mt-4

                    max-w-[700px]

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
                  Bespoke Sofas as Part of the Interior
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
                  A sofa is often one of the largest visual elements in a room.
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
                    It influences proportion, circulation, comfort and the
                    overall character of the space.
                  </p>

                  <p>
                    That is why we believe it should be considered as part of
                    the interior design rather than selected separately at the
                    end.
                  </p>

                  <p>
                    Through Sofa N More&apos;s bespoke sofa service, dimensions,
                    shape, upholstery and details can be developed around the
                    wider design direction.
                  </p>
                </div>

                {/* =============================================
                    KEY IDEA
                ============================================== */}

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
                    Designed Together
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
                    The sofa should respond to the room, not arrive after the
                    room has already been designed.
                  </p>
                </div>
              </div>

              {/* =================================================
                  IMAGE
              ================================================== */}

              <div
                className="
                  mx-auto

                  w-full
                  max-w-[680px]
                "
              >
                <IntegratedSofaVisual />
              </div>
            </div>

            {/* =================================================
                APPLICATIONS
            ================================================== */}

            <div
              className="
                mt-7

                border-t
                border-[var(--brand-navy)]/10

                pt-6

                lg:mt-9
                lg:pt-8
              "
            >
              <div
                className="
                  flex
                  flex-col

                  gap-2

                  sm:flex-row
                  sm:items-end
                  sm:justify-between
                "
              >
                <div>
                  <span
                    className="
                      font-brand-sans

                      text-[7px]
                      font-bold
                      uppercase

                      tracking-[0.18em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    That Might Mean
                  </span>

                  <h3
                    className="
                      mt-1.5

                      max-w-[620px]

                      font-brand-display

                      text-[23px]
                      font-semibold
                      leading-[1.2]

                      text-[var(--brand-navy)]

                      sm:text-[27px]
                    "
                  >
                    One sofa. Different roles. Always connected to the space.
                  </h3>
                </div>
              </div>

              <div
                className="
                  mt-5

                  grid
                  gap-2.5

                  sm:grid-cols-2

                  lg:grid-cols-3
                "
              >
                {sofaApplications.map(({ title, text, icon: Icon }) => (
                  <SofaApplication
                    key={title}
                    title={title}
                    text={text}
                    icon={Icon}
                  />
                ))}
              </div>
            </div>

            {/* =================================================
                FINAL STATEMENT
            ================================================== */}

            <div
              className="
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

                    bg-[var(--brand-gold)]

                    text-[var(--brand-navy)]
                  "
                >
                  <Check size={14} strokeWidth={2} />
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
                    The Objective
                  </span>

                  <p
                    className="
                      mt-0.5

                      font-brand-display

                      text-[20px]
                      font-semibold
                      leading-[1.25]

                      text-white

                      sm:text-[23px]
                    "
                  >
                    The sofa should belong to the room.
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
   IMAGE
========================================================= */

function IntegratedSofaVisual() {
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
            src="/assets/images/bespokesofa.webp"
            alt="Bespoke sofa designed as part of a complete interior by Sofa N More"
            fill
            sizes="
              (max-width: 1023px) 100vw,
              52vw
            "
            className="
              object-cover
             "
          />
        </div>

        {/* ===============================================
            CAPTION
        ================================================ */}

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
              <Sofa size={14} strokeWidth={1.5} />
            </span>

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
                Part of the Interior
              </span>

              <p
                className="
                  mt-1

                  font-brand-display

                  text-[16px]
                  font-semibold

                  text-[var(--brand-navy)]

                  sm:text-[18px]
                "
              >
                Proportion. Shape. Upholstery.
              </p>
            </div>
          </div>

          <span
            className="
              hidden

              font-brand-sans

              text-[6px]
              font-bold
              uppercase

              tracking-[0.14em]

              text-[var(--brand-text-muted)]

              sm:block
            "
          >
            Sofa N More · London
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

/* =========================================================
   APPLICATION
========================================================= */

function SofaApplication({
  title,
  text,
  icon: Icon,
}: {
  title: string;
  text: string;
  icon: LucideIcon;
}) {
  return (
    <article
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

            bg-[var(--brand-navy)]

            text-[var(--brand-gold)]
          "
        >
          <Icon size={13} strokeWidth={1.5} />
        </span>

        <div>
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

          <p
            className="
              mt-1.5

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
