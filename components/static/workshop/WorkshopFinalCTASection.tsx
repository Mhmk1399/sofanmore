import { Camera, Check, MapPin, Ruler, Sofa } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   CONFIG
========================================================= */

const DIRECTIONS_URL =
  "https://www.google.com/maps/place/Sofa+N+More/@51.5682084,-0.2360193,16z/data=!4m18!1m11!4m10!1m4!2m2!1d8.6821267!2d50.1109221!4e1!1m3!2m2!1d-0.2328852!2d51.5684328!3e3!3m5!1s0x4876111726173097:0x9b06efce5680b451!8m2!3d51.5683486!4d-0.233041!16s%2Fg%2F11vr7trx_f?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D";

const WHATSAPP_PHOTOS_URL =
  "https://wa.me/447400577844?text=Hi%20Sofa%20N%20More%2C%20I%27d%20like%20to%20send%20photos%20of%20a%20sofa%20or%20upholstered%20piece%20for%20repair%20or%20restoration%20assessment.";

/* =========================================================
   DATA
========================================================= */

const visitPreparation = [
  "Bring your photographs, dimensions or plans",
  "Explore our catalogues and fabric samples",
  "Discuss the project directly with our team",
];

/* =========================================================
   ROOT
========================================================= */

export default function WorkshopFinalCTASection() {
  return (
    <section
      aria-labelledby="workshop-final-cta-heading"
      className="
        bg-[var(--brand-ivory)]

        px-3
        pb-10
        pt-8

        sm:px-5
        sm:pb-12
        sm:pt-10

        lg:px-7
        lg:pb-16
        lg:pt-12
      "
    >
      <div className="mx-auto max-w-[var(--site-width)]">
        {/* =====================================================
            OUTER CLAY SHELL
        ====================================================== */}

        <div
          className="
            clay-surface-strong

            rounded-[28px]

            p-[5px]

            sm:rounded-[34px]
            sm:p-[6px]

            lg:rounded-[38px]
          "
        >
          <div
            className="
              clay-dark

              relative
              overflow-hidden

              rounded-[23px]

              px-5
              py-7

              sm:rounded-[28px]
              sm:px-7
              sm:py-8

              lg:rounded-[32px]
              lg:px-10
              lg:py-10
            "
          >
            <QuietDecoration />

            <div
              className="
                relative
                z-10

                grid
                gap-8

                lg:grid-cols-[1.08fr_0.92fr]
                lg:items-center
                lg:gap-12

                xl:gap-16
              "
            >
              {/* =================================================
                  LEFT — CTA COPY
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

                      bg-[var(--brand-gold)]

                      text-[var(--brand-navy)]
                    "
                  >
                    <MapPin size={15} strokeWidth={1.6} />
                  </span>

                  <span
                    className="
                      font-brand-sans

                      text-[7px]
                      font-bold
                      uppercase

                      tracking-[0.2em]

                      text-[var(--brand-gold)]

                      sm:text-[8px]
                    "
                  >
                    Sofa N More · London NW2
                  </span>
                </div>

                {/* H2 */}

                <h2
                  id="workshop-final-cta-heading"
                  className="
                    mt-5

                    max-w-[760px]

                    font-brand-display

                    text-[36px]
                    font-semibold
                    leading-[0.98]

                    tracking-[-0.04em]

                    text-white

                    sm:text-[46px]

                    lg:text-[54px]
                  "
                >
                  Plan Your Free
                  <span className="block">
                    Workshop Visit
                    <span className="text-[var(--brand-gold)]">.</span>
                  </span>
                </h2>

                {/* COPY */}

                <p
                  className="
                    mt-5

                    max-w-[720px]

                    font-brand-sans

                    text-[11px]
                    font-medium
                    leading-[1.75]

                    text-white/65

                    sm:text-[12px]

                    lg:text-[13px]
                  "
                >
                  Whether you are ordering a bespoke sofa, bringing an existing
                  piece for assessment or planning seating for a commercial
                  space, a workshop visit can help turn the initial idea into a
                  clear next step.
                </p>

                {/* =================================================
                    CTAS
                ================================================== */}

                <div
                  className="
                    mt-7

                    flex
                    flex-col
                    gap-3

                    sm:flex-row
                    sm:flex-wrap
                  "
                >
                  <ClayButton
                    href="/contact-us"
                    variant="gold"
                    size="lg"
                    showArrow
                    className="max-sm:w-full"
                    ariaLabel="Plan a free visit to the Sofa N More workshop"
                  >
                    Plan Your Free Workshop Visit
                  </ClayButton>

                  <ClayButton
                    href={DIRECTIONS_URL}
                    variant="ivory"
                    size="lg"
                    startIcon={<MapPin size={15} strokeWidth={1.6} />}
                    target="_blank"
                    className="max-sm:w-full"
                    ariaLabel="Get directions to the Sofa N More workshop"
                  >
                    Get Directions
                  </ClayButton>
                </div>

                {/* REPAIR CTA */}

                <div
                  className="
                    mt-3

                    flex
                  "
                >
                  <ClayButton
                    href={WHATSAPP_PHOTOS_URL}
                    variant="outline"
                    size="sm"
                    startIcon={<Camera size={14} strokeWidth={1.5} />}
                    target="_blank"
                    className="
                      max-sm:w-full

                      !border-white/20
                      !text-white
                    "
                    ariaLabel="Send photos of your sofa to Sofa N More"
                  >
                    Send Photos of Your Sofa
                  </ClayButton>
                </div>
              </div>

              {/* =================================================
                  RIGHT — SIMPLE PREPARATION PANEL
              ================================================== */}

              <aside
                aria-label="What to bring to your workshop visit"
                className="
                  rounded-[22px]

                  border
                  border-white/10

                  bg-white/[0.06]

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
                    <Sofa size={15} strokeWidth={1.6} />
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
                      Before You Visit
                    </span>

                    <h3
                      className="
                        mt-1.5

                        max-w-[440px]

                        font-brand-display

                        text-[21px]
                        font-semibold
                        leading-[1.2]

                        text-white

                        sm:text-[24px]
                      "
                    >
                      You only need enough information to start the
                      conversation.
                    </h3>
                  </div>
                </div>

                {/* PREPARATION */}

                <div className="mt-5">
                  {visitPreparation.map((item) => (
                    <PreparationItem key={item} text={item} />
                  ))}
                </div>

                {/* WORKSHOP ADDRESS */}

                <div
                  className="
                    mt-5

                    border-t
                    border-white/10

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
                    <MapPin
                      size={13}
                      strokeWidth={1.5}
                      className="
                        mt-[2px]
                        shrink-0

                        text-[var(--brand-gold)]
                      "
                    />

                    <address
                      className="
                        not-italic

                        font-brand-sans

                        text-[8px]
                        font-medium
                        leading-[1.65]

                        text-white/55

                        sm:text-[9px]
                      "
                    >
                      Sofa N More
                      <br />
                      Unit G19, Atlas Business Centre
                      <br />
                      Oxgate Lane, Staples Corner West
                      <br />
                      London NW2 7HJ
                    </address>
                  </div>
                </div>

                {/* HOURS */}

                <div
                  className="
                    mt-4

                    flex
                    items-center
                    gap-2

                    font-brand-sans

                    text-[7px]
                    font-semibold

                    text-white/45

                    sm:text-[8px]
                  "
                >
                  <Ruler
                    size={11}
                    strokeWidth={1.5}
                    className="text-[var(--brand-gold)]"
                  />
                  Monday–Friday 8:00 AM–6:00 PM · Saturday 8:00 AM–5:30 PM
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PREPARATION ITEM
========================================================= */

function PreparationItem({ text }: { text: string }) {
  return (
    <div
      className="
        flex
        items-start
        gap-2.5

        border-b
        border-white/[0.08]

        py-3

        last:border-b-0
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

          bg-[var(--brand-gold)]

          text-[var(--brand-navy)]
        "
      >
        <Check size={8} strokeWidth={2.1} />
      </span>

      <span
        className="
          font-brand-sans

          text-[9px]
          font-medium
          leading-[1.55]

          text-white/70

          sm:text-[10px]
        "
      >
        {text}
      </span>
    </div>
  );
}

/* =========================================================
   QUIET DECORATION
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
      {/* TOP RIGHT ARC */}

      <div
        className="
          absolute

          -right-[85px]
          -top-[100px]

          hidden

          h-[210px]
          w-[210px]

          rounded-full

          border
          border-[var(--brand-gold)]/15

          lg:block
        "
      />

      {/* SECOND ARC */}

      <div
        className="
          absolute

          -right-[35px]
          -top-[50px]

          hidden

          h-[110px]
          w-[110px]

          rounded-full

          border
          border-white/[0.06]

          lg:block
        "
      />

      {/* BOTTOM GLOW */}

      <div
        className="
          absolute

          -bottom-[120px]
          left-[18%]

          hidden

          h-[180px]
          w-[380px]

          rounded-full

          bg-[var(--brand-gold)]/[0.06]

          blur-3xl

          lg:block
        "
      />
    </div>
  );
}
