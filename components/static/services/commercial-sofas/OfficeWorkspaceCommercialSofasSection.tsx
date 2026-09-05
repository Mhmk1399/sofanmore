import {
  BriefcaseBusiness,
  Building2,
  Coffee,
  Crown,
  MessageSquare,
  Sofa,
  UsersRound,
  Clock3,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

type WorkspaceArea = {
  label: string;
  icon: LucideIcon;
};

/* =========================================================
   DATA
========================================================= */

const workspaceAreas: WorkspaceArea[] = [
  {
    label: "Reception Areas",
    icon: Building2,
  },
  {
    label: "Breakout Spaces",
    icon: Coffee,
  },
  {
    label: "Informal Meetings",
    icon: MessageSquare,
  },
  {
    label: "Collaboration Zones",
    icon: UsersRound,
  },
  {
    label: "Executive Offices",
    icon: Crown,
  },
  {
    label: "Waiting Areas",
    icon: Clock3,
  },
  {
    label: "Shared Lounges",
    icon: Sofa,
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function OfficeWorkspaceCommercialSofasSection({
  id = "office-seating",
}: {
  id?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby="office-workspace-sofas-heading"
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
                    Workplace Seating
                  </span>
                </div>

                {/* HEADING */}

                <h2
                  id="office-workspace-sofas-heading"
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
                  Commercial Sofas for Offices & Workspaces
                  <span className="text-[var(--brand-gold)]">.</span>
                </h2>

                {/* INTRO */}

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
                  The modern workplace is no longer built entirely around desks
                  and meeting rooms.
                </p>

                {/* BODY */}

                <div
                  className="
                    mt-5

                    max-w-[620px]

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
                    Teams also need informal spaces to talk, collaborate,
                    welcome visitors or simply step away from their desk.
                  </p>

                  <p>
                    Bespoke office sofas can create more comfortable
                    environments for different moments throughout the working
                    day.
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
                    Designed Around the Workplace
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
                    Seating can support how people meet, pause, collaborate and
                    welcome visitors.
                  </p>
                </div>

                {/* FINAL COPY */}

                <p
                  className="
                    mt-6

                    max-w-[620px]

                    font-brand-sans

                    text-[12px]
                    font-medium
                    leading-[1.75]

                    text-[var(--brand-text-muted)]

                    sm:text-[13px]

                    lg:text-[14px]
                  "
                >
                  Dimensions can be developed around the workplace layout, while
                  upholstery and finishes help keep the seating visually aligned
                  with the rest of the interior.
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
                    ariaLabel="Discuss an office or workspace sofa project"
                  >
                    Discuss an Office or Workspace Project
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  WORKSPACE PANEL
              ================================================== */}

              <div
                className="
                  mx-auto

                  w-full
                  max-w-[650px]
                "
              >
                <WorkspacePanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   WORKSPACE PANEL
========================================================= */

function WorkspacePanel() {
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
            HEADER
        ====================================================== */}

        <div
          className="
            flex
            items-start
            justify-between

            gap-5
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

                text-[var(--brand-gold-700)]
              "
            >
              Where It Works
            </span>

            <h3
              className="
                mt-2

                max-w-[430px]

                font-brand-display

                text-[25px]
                font-semibold
                leading-[1.12]

                tracking-[-0.025em]

                text-[var(--brand-navy)]

                sm:text-[28px]
              "
            >
              Seating for more than one kind of working moment.
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

              bg-[var(--brand-navy)]

              text-[var(--brand-gold)]

              sm:flex
            "
          >
            <BriefcaseBusiness size={17} strokeWidth={1.5} />
          </span>
        </div>

        {/* =====================================================
            USE CASES
        ====================================================== */}

        <div
          className="
            mt-5

            grid
            grid-cols-1

            gap-2

            min-[390px]:grid-cols-2
          "
        >
          {workspaceAreas.map(({ label, icon }) => (
            <WorkspaceArea key={label} label={label} icon={icon} />
          ))}
        </div>

        {/* =====================================================
            LAST ITEM FULL WIDTH
        ====================================================== */}

        <div
          className="
            mt-2

            rounded-[18px]

            bg-[var(--brand-navy)]

            px-4
            py-4

            sm:px-5
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
              <Sofa size={13} strokeWidth={1.6} />
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
                One Interior Direction
              </span>

              <p
                className="
                  mt-1

                  max-w-[460px]

                  font-brand-display

                  text-[17px]
                  font-medium
                  leading-[1.3]

                  text-white

                  sm:text-[19px]
                "
              >
                Comfort that stays visually connected to the wider workplace.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   WORKSPACE AREA
========================================================= */

function WorkspaceArea({ label, icon: Icon }: WorkspaceArea) {
  return (
    <div
      className="
        clay-surface-soft

        flex
        min-h-[50px]

        items-center
        gap-3

        rounded-[15px]

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
        <Icon size={12} strokeWidth={1.5} />
      </span>

      <span
        className="
          font-brand-sans

          text-[11px]
          font-semibold
          leading-[1.35]

          text-[var(--brand-navy)]

          sm:text-[12px]
        "
      >
        {label}
      </span>
    </div>
  );
}
