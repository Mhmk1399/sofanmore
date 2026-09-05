import ClayButton from "@/components/ui/ClayButton";
import {
  Bell,
  Building2,
  Clock3,
  DoorOpen,
  Sofa,
  Sparkles,
  UsersRound,
  Wine,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type HospitalityArea = {
  label: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const hospitalityAreas: HospitalityArea[] = [
  {
    label: "Lobby Areas",
    icon: Building2,
  },
  {
    label: "Reception Spaces",
    icon: Bell,
  },
  {
    label: "Hotel Lounges",
    icon: Sofa,
  },
  {
    label: "Bars",
    icon: Wine,
  },
  {
    label: "Waiting Areas",
    icon: Clock3,
  },
  {
    label: "Guest Areas",
    icon: UsersRound,
  },
  {
    label: "Private Lounges",
    icon: DoorOpen,
  },
  {
    label: "Social Spaces",
    icon: Sparkles,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function HotelHospitalityCommercialSofasSection({
  id = "hotel-hospitality-seating",
}: {
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby="hotel-hospitality-sofas-heading"
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
                  CONTENT
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
                    Hotel & Hospitality
                  </span>
                </div>

                {/* H2 */}

                <h2
                  id="hotel-hospitality-sofas-heading"
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
                  Commercial Sofas for Hotels & Hospitality Spaces
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                {/* INTRO */}

                <p
                  className="
                    mt-6

                    max-w-[570px]

                    font-brand-display

                    text-[19px]
                    font-medium
                    italic
                    leading-[1.4]

                    text-[var(--brand-navy)]

                    sm:text-[21px]
                  "
                >
                  The lobby or lounge is often one of the first environments a
                  guest experiences.
                </p>

                {/* BODY */}

                <div
                  className="
                    mt-5

                    max-w-[610px]

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
                    The seating needs to communicate the character of the space
                    immediately.
                  </p>

                  <p>
                    Bespoke hotel sofas can be developed around the layout,
                    atmosphere and guest experience of the wider interior.
                  </p>
                </div>

                {/* =================================================
                    KEY MESSAGE
                ================================================== */}

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

                      tracking-[0.16em]

                      text-[var(--brand-gold-700)]
                    "
                  >
                    First Impression
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
                    Seating should feel connected to the interior, not added to
                    it afterwards.
                  </p>
                </div>

                {/* FINAL COPY */}

                <p
                  className="
                    mt-6

                    max-w-[610px]

                    font-brand-sans

                    text-[12px]
                    font-medium
                    leading-[1.75]

                    text-[var(--brand-text-muted)]

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  From a sculptural statement sofa to an understated lounge
                  configuration, the seating can be developed to feel like a
                  natural part of the wider hospitality environment.
                </p>
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
                    ariaLabel="Discuss a restaurant or cafe sofa project"
                  >
                    Discuss a Hotel or Hospitality Spaces
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  HOSPITALITY PANEL
              ================================================== */}

              <div
                className="
                  mx-auto

                  w-full
                  max-w-[650px]
                "
              >
                <HospitalityAreasPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   HOSPITALITY AREAS
========================================================= */

function HospitalityAreasPanel() {
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
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div
          className="
            flex
            items-start
            justify-between

            gap-4
          "
        >
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
              Developed For
            </span>

            <h3
              className="
                mt-2

                max-w-[410px]

                font-brand-display

                text-[25px]
                font-semibold
                leading-[1.12]

                tracking-[-0.025em]

                text-white

                sm:text-[28px]
              "
            >
              Guest-facing hospitality spaces.
            </h3>
          </div>

          <span
            className="
              hidden

              h-11
              w-11

              shrink-0

              items-center
              justify-center

              rounded-full

              bg-[var(--brand-gold)]

              text-[var(--brand-navy)]

              sm:flex
            "
          >
            <Building2 size={17} strokeWidth={1.5} />
          </span>
        </div>

        <p
          className="
            mt-3

            max-w-[470px]

            font-brand-sans

            text-[13px]
            font-medium
            leading-[1.65]

            text-white/55

            sm:text-[11px]
          "
        >
          Sofa layouts and configurations can be developed for different moments
          in the guest journey.
        </p>

        {/* =====================================================
            GRID
        ====================================================== */}

        <div
          className="
            mt-5

            grid
            grid-cols-2

            gap-2

            sm:gap-2.5
          "
        >
          {hospitalityAreas.map(({ label, icon: Icon }) => (
            <HospitalityArea key={label} label={label} icon={Icon} />
          ))}
        </div>

        {/* =====================================================
            RESULT
        ====================================================== */}

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
              <Sparkles size={13} strokeWidth={1.7} />
            </span>

            <div>
              <span
                className="
                  font-brand-sans

                  text-[13px]
                  font-bold
                  uppercase

                  tracking-[0.16em]

                  text-[var(--brand-gold)]
                "
              >
                The Goal
              </span>

              <p
                className="
                  mt-1

                  max-w-[450px]

                  font-brand-display

                  text-[17px]
                  font-medium
                  leading-[1.3]

                  text-white

                  sm:text-[19px]
                "
              >
                A considered environment that feels intentional from the moment
                guests arrive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HOSPITALITY AREA
========================================================= */

function HospitalityArea({ label, icon: Icon }: HospitalityArea) {
  return (
    <div
      className="
        flex
        min-h-[52px]

        items-center

        gap-3

        rounded-[15px]

        border
        border-white/[0.07]

        bg-white/[0.045]

        px-3
        py-2.5

        shadow-[inset_1px_1px_0_rgba(255,255,255,0.04)]
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

          text-[11px]
          font-semibold
          leading-[1.3]

          text-white/80

          sm:text-[12px]
        "
      >
        {label}
      </span>
    </div>
  );
}
