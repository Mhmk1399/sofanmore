import {
  Camera,
  Check,
  MapPin,
  MessageCircle,
  PackageCheck,
  Truck,
} from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   CONFIG
========================================================= */

const WHATSAPP_PHOTOS_URL =
  "https://wa.me/447400577844?text=Hi%20Sofa%20N%20More%2C%20I%27d%20like%20to%20send%20photos%20of%20a%20sofa%20or%20upholstered%20piece%20for%20repair%20or%20restoration%20assessment.";

/* =========================================================
   DATA
========================================================= */

const whatToSend = [
  "One full photograph of the sofa or upholstered piece",
  "Close-ups of damaged, worn or uncomfortable areas",
  "Approximate dimensions",
  "Your postcode",
  "A short description of what has changed",
  "What you would like to preserve or improve",
];

/* =========================================================
   ROOT
========================================================= */

export default function WorkshopRepairDropOffSection() {
  return (
    <section
      aria-labelledby="workshop-repair-dropoff-heading"
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
            MAIN CLAY SURFACE
        ====================================================== */}

        <div
          className="
            clay-surface-soft

            relative
            overflow-hidden

            rounded-[28px]

            px-5
            py-6

            sm:rounded-[32px]
            sm:px-7
            sm:py-8

            lg:rounded-[36px]
            lg:px-9
            lg:py-9
          "
        >
          <QuietDecoration />

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
                LEFT — COPY
            ================================================== */}

            <div>
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
                  <Camera size={15} strokeWidth={1.5} />
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
                  Repair & Restoration Assessment
                </span>
              </div>

              {/* H2 */}

              <h2
                id="workshop-repair-dropoff-heading"
                className="
                  mt-4

                  max-w-[680px]

                  font-brand-display

                  text-[33px]
                  font-semibold
                  leading-[1]

                  tracking-[-0.035em]

                  text-[var(--brand-navy)]

                  sm:text-[41px]

                  lg:text-[47px]
                "
              >
                Bringing a Sofa, Chair or Cushion for Assessment
                <span className="text-[var(--brand-gold)]">.</span>
              </h2>

              {/* LEAD */}

              <p
                className="
                  mt-5

                  max-w-[620px]

                  font-brand-display

                  text-[19px]
                  font-medium
                  leading-[1.45]

                  text-[var(--brand-navy)]

                  sm:text-[21px]
                "
              >
                For repair and restoration projects, the best first step is
                usually to send us photographs.
              </p>

              {/* BODY */}

              <div
                className="
                  mt-4

                  max-w-[650px]

                  space-y-3

                  font-brand-sans

                  text-[13px]
                  font-medium
                  leading-[1.75]

                  text-[var(--brand-text-muted)]

                  sm:text-[11px]

                  lg:text-[12px]
                "
              >
                <p>
                  This allows our team to understand the general condition
                  before you arrange transport or bring a large item to the
                  workshop.
                </p>

                <p>
                  Once we understand the project, we can advise whether you
                  should bring the item to the workshop or arrange collection.
                </p>
              </div>

              {/* =================================================
                  PRIMARY CTA
              ================================================== */}

              <div
                className="
                  mt-6

                  flex
                  flex-col
                  gap-3

                  sm:flex-row
                  sm:flex-wrap
                "
              >
                <ClayButton
                  href={WHATSAPP_PHOTOS_URL}
                  variant="gold"
                  size="lg"
                  startIcon={<MessageCircle size={15} strokeWidth={1.6} />}
                  showArrow
                  target="_blank"
                  className="max-sm:w-full"
                  ariaLabel="Send photos of your sofa to Sofa N More on WhatsApp"
                >
                  Send Photos of Your Sofa
                </ClayButton>

                <ClayButton
                  href="/contact-us"
                  variant="outline"
                  size="lg"
                  showArrow
                  className="max-sm:w-full"
                  ariaLabel="Arrange a sofa repair drop-off at the Sofa N More workshop"
                >
                  Arrange a Repair Drop-Off
                </ClayButton>
              </div>
            </div>

            {/* =================================================
                RIGHT — WHAT TO SEND
            ================================================== */}

            <div
              className="
                clay-inset

                rounded-[22px]

                bg-[#FFFDF8]/65

                px-4
                py-5

                sm:px-5
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

                    bg-[var(--brand-gold)]

                    text-[var(--brand-navy)]
                  "
                >
                  <Camera size={15} strokeWidth={1.6} />
                </span>

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
                    Before Travelling
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
                    Send a few useful details first.
                  </h3>
                </div>
              </div>

              {/* =================================================
                  CHECKLIST
              ================================================== */}

              <div
                className="
                  mt-5

                  grid
                  gap-x-6

                  sm:grid-cols-2
                "
              >
                {whatToSend.map((item) => (
                  <ChecklistItem key={item} text={item} />
                ))}
              </div>

              {/* =================================================
                  PROCESS
              ================================================== */}

              <div
                className="
                  mt-5

                  grid
                  gap-2.5

                  sm:grid-cols-3
                "
              >
                <ProcessItem number="01" icon={Camera} label="Send Photos" />

                <ProcessItem
                  number="02"
                  icon={PackageCheck}
                  label="We Assess"
                />

                <ProcessItem
                  number="03"
                  icon={Truck}
                  label="Drop-Off or Collection"
                />
              </div>

              {/* =================================================
                  WORKSHOP NOTE
              ================================================== */}

              <div
                className="
                  mt-5

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
                    <MapPin size={14} strokeWidth={1.6} />
                  </span>

                  <div>
                    <span
                      className="
                        font-brand-sans

                        text-[13px]
                        font-bold
                        uppercase

                        tracking-[0.17em]

                        text-[var(--brand-gold)]
                      "
                    >
                      North West London Workshop
                    </span>

                    <p
                      className="
                        mt-1

                        max-w-[520px]

                        font-brand-display

                        text-[17px]
                        font-medium
                        leading-[1.4]

                        text-white

                        sm:text-[19px]
                      "
                    >
                      Suitable items can be dropped off at our workshop, with
                      collection available where required.
                    </p>

                    <p
                      className="
                        mt-2

                        max-w-[520px]

                        font-brand-sans

                        text-[11px]
                        font-medium
                        leading-[1.6]

                        text-white/55

                        sm:text-[12px]
                      "
                    >
                      Walk-ins are welcome, but large-item drop-offs should be
                      discussed in advance so the workshop is prepared to
                      receive the piece.
                    </p>
                  </div>
                </div>
              </div>

              {/* ADDRESS */}

              <div
                className="
                  mt-4

                  flex
                  items-center
                  gap-2

                  border-t
                  border-[var(--brand-navy)]/10

                  pt-4
                "
              >
                <MapPin
                  size={12}
                  strokeWidth={1.5}
                  className="
                    shrink-0
                    text-[var(--brand-gold-700)]
                  "
                />

                <address
                  className="
                    not-italic

                    font-brand-sans

                    text-[11px]
                    font-semibold
                    leading-[1.5]

                    text-[var(--brand-text-muted)]

                    sm:text-[12px]
                  "
                >
                  Unit G19, Atlas Business Centre, Oxgate Lane, Staples Corner
                  West, London NW2 7HJ
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CHECKLIST ITEM
========================================================= */

function ChecklistItem({ text }: { text: string }) {
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
        <Check size={8} strokeWidth={2.1} />
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
   PROCESS ITEM
========================================================= */

function ProcessItem({
  number,
  icon: Icon,
  label,
}: {
  number: string;
  icon: typeof Camera;
  label: string;
}) {
  return (
    <div
      className="
        rounded-[15px]

        border
        border-[var(--brand-navy)]/[0.06]

        bg-white/35

        px-3
        py-3
      "
    >
      <div
        className="
          flex
          items-center
          justify-between

          gap-2
        "
      >
        <span
          className="
            flex
            h-7
            w-7

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
            font-brand-display

            text-[16px]
            font-semibold

            text-[var(--brand-gold-700)]/25
          "
        >
          {number}
        </span>
      </div>

      <strong
        className="
          mt-2
          block

          font-brand-sans

          text-[11px]
          font-bold
          leading-[1.4]

          text-[var(--brand-navy)]

          sm:text-[12px]
        "
      >
        {label}
      </strong>
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
      <div
        className="
          absolute

          -bottom-[95px]
          -right-[90px]

          hidden

          h-[190px]
          w-[190px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />
    </div>
  );
}
