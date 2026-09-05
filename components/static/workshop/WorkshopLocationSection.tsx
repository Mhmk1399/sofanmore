import {
  CalendarDays,
  Car,
  Clock3,
  Mail,
  MapPin,
  Phone,
  TrainFront,
  Truck,
  Users,
} from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   CONFIG
========================================================= */

const PHONE_DISPLAY = "+44 7400 577844";
const PHONE_HREF = "tel:+447400577844";

const EMAIL = "info@sofanmore.co.uk";

const DIRECTIONS_URL =
  "https://www.google.com/maps/place/Sofa+N+More/@51.5682084,-0.2360193,16z/data=!4m18!1m11!4m10!1m4!2m2!1d8.6821267!2d50.1109221!4e1!1m3!2m2!1d-0.2328852!2d51.5684328!3e3!3m5!1s0x4876111726173097:0x9b06efce5680b451!8m2!3d51.5683486!4d-0.233041!16s%2Fg%2F11vr7trx_f?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D";

/* =========================================================
   HOURS
========================================================= */

const openingHours = [
  {
    day: "Monday",
    hours: "8:00 AM – 6:00 PM",
  },
  {
    day: "Tuesday",
    hours: "8:00 AM – 6:00 PM",
  },
  {
    day: "Wednesday",
    hours: "8:00 AM – 6:00 PM",
  },
  {
    day: "Thursday",
    hours: "8:00 AM – 6:00 PM",
  },
  {
    day: "Friday",
    hours: "8:00 AM – 6:00 PM",
  },
  {
    day: "Saturday",
    hours: "8:00 AM – 5:30 PM",
  },
  {
    day: "Sunday",
    hours: "Closed",
  },
];

/* =========================================================
   ROOT
========================================================= */

export default function WorkshopLocationSection() {
  return (
    <section
      aria-labelledby="workshop-location-heading"
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
                HEADER
            ================================================== */}

            <div
              className="
                relative
                z-10

                max-w-[840px]
              "
            >
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
                  <MapPin size={15} strokeWidth={1.5} />
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
                  Sofa N More · London NW2
                </span>
              </div>

              <h2
                id="workshop-location-heading"
                className="
                  mt-4

                  max-w-[760px]

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
                Find Our Workshop Near Cricklewood & Staples Corner
                <span className="text-[var(--brand-gold)]">.</span>
              </h2>

              <p
                className="
                  mt-5

                  max-w-[720px]

                  font-brand-sans

                  text-[13px]
                  font-medium
                  leading-[1.75]

                  text-[var(--brand-text-muted)]

                  sm:text-[11px]

                  lg:text-[12px]
                "
              >
                Our working sofa and upholstery workshop is based in the
                Cricklewood and Staples Corner area of North West London, close
                to Brent Cross.
              </p>
            </div>

            {/* =================================================
                MAIN GRID
            ================================================== */}

            <div
              className="
                relative
                z-10

                mt-7

                grid
                gap-4

                lg:grid-cols-[0.88fr_1.12fr]
                lg:gap-5
              "
            >
              {/* =================================================
                  LEFT — ADDRESS
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
                    h-full

                    rounded-[18px]

                    bg-[#FFFDF8]/70

                    px-4
                    py-5

                    sm:px-5
                    sm:py-6
                  "
                >
                  {/* ADDRESS */}

                  <div className="flex items-start gap-3">
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
                      <MapPin size={16} strokeWidth={1.6} />
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
                        Workshop Address
                      </span>

                      <address className="mt-2 not-italic">
                        <strong
                          className="
                            block

                            font-brand-display

                            text-[23px]
                            font-semibold

                            text-[var(--brand-navy)]

                            sm:text-[26px]
                          "
                        >
                          Sofa N More
                        </strong>

                        <p
                          className="
                            mt-2

                            font-brand-sans

                            text-[13px]
                            font-medium
                            leading-[1.7]

                            text-[var(--brand-text-muted)]

                            sm:text-[11px]
                          "
                        >
                          Unit G19, Atlas Business Centre
                          <br />
                          Oxgate Lane, Staples Corner West
                          <br />
                          London NW2 7HJ
                          <br />
                          United Kingdom
                        </p>
                      </address>
                    </div>
                  </div>

                  {/* CONTACT */}

                  <div
                    className="
                      mt-5

                      grid
                      gap-2
                    "
                  >
                    <ContactRow
                      icon={Phone}
                      label="Telephone"
                      value={PHONE_DISPLAY}
                      href={PHONE_HREF}
                    />

                    <ContactRow
                      icon={Mail}
                      label="Email"
                      value={EMAIL}
                      href={`mailto:${EMAIL}`}
                    />
                  </div>

                  {/* STATION */}

                  <div
                    className="
                      mt-5

                      border-t
                      border-[var(--brand-navy)]/10

                      pt-5
                    "
                  >
                    <div className="flex items-start gap-3">
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
                        <TrainFront size={13} strokeWidth={1.5} />
                      </span>

                      <div>
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
                          Travelling by Rail
                        </span>

                        <p
                          className="
                            mt-1.5

                            max-w-[480px]

                            font-brand-sans

                            text-[12px]
                            font-medium
                            leading-[1.65]

                            text-[var(--brand-text-muted)]

                            sm:text-[13px]
                          "
                        >
                          Brent Cross West is the closest listed rail station to
                          Atlas Business Centre. Please check your preferred
                          route before travelling.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}

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
                      href={DIRECTIONS_URL}
                      variant="gold"
                      size="lg"
                      startIcon={<MapPin size={15} strokeWidth={1.6} />}
                      target="_blank"
                      className="max-sm:w-full"
                      ariaLabel="Get directions to the Sofa N More workshop"
                    >
                      Get Directions
                    </ClayButton>

                    <ClayButton
                      href={PHONE_HREF}
                      variant="outline"
                      size="lg"
                      startIcon={<Phone size={15} strokeWidth={1.6} />}
                      className="max-sm:w-full"
                      ariaLabel="Call the Sofa N More workshop"
                    >
                      Call the Workshop
                    </ClayButton>
                  </div>
                </div>
              </div>

              {/* =================================================
                  RIGHT — VISITING INFO
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
                    h-full

                    rounded-[18px]

                    bg-[#FFFDF8]/70

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

                        bg-[var(--brand-navy)]

                        text-[var(--brand-gold)]
                      "
                    >
                      <Clock3 size={15} strokeWidth={1.5} />
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
                        Visiting Information
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
                        Workshop Hours & Visit Details
                      </h3>
                    </div>
                  </div>

                  {/* =================================================
                      OPENING HOURS
                  ================================================== */}

                  <div className="mt-5">
                    <div
                      className="
                        grid
                        gap-0
                      "
                    >
                      {openingHours.map((item) => (
                        <OpeningHoursRow
                          key={item.day}
                          day={item.day}
                          hours={item.hours}
                        />
                      ))}
                    </div>
                  </div>

                  {/* =================================================
                      VISIT DETAILS
                  ================================================== */}

                  <div
                    className="
                      mt-5

                      grid
                      gap-2

                      sm:grid-cols-2
                    "
                  >
                    <VisitDetail
                      icon={Users}
                      label="Visits"
                      value="Walk-ins & Appointments"
                    />

                    <VisitDetail
                      icon={CalendarDays}
                      label="Consultations"
                      value="Free"
                    />

                    <VisitDetail
                      icon={Car}
                      label="Parking"
                      value="On-Site Parking Available"
                    />

                    <VisitDetail
                      icon={Truck}
                      label="Collection"
                      value="Available"
                    />
                  </div>

                  {/* LARGE ITEM */}

                  <div
                    className="
                      mt-5

                      rounded-[17px]

                      bg-[var(--brand-navy)]

                      px-4
                      py-4
                    "
                  >
                    <div className="flex items-start gap-3">
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
                        <Truck size={13} strokeWidth={1.6} />
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
                          Large-Item Drop-Off
                        </span>

                        <p
                          className="
                            mt-1

                            max-w-[520px]

                            font-brand-display

                            text-[16px]
                            font-medium
                            leading-[1.4]

                            text-white

                            sm:text-[18px]
                          "
                        >
                          Large sofas and upholstered pieces should be arranged
                          with the workshop before travelling.
                        </p>

                        <p
                          className="
                            mt-1.5

                            font-brand-sans

                            text-[11px]
                            font-medium
                            leading-[1.55]

                            text-white/55

                            sm:text-[12px]
                          "
                        >
                          This helps us prepare for the item and confirm the
                          most appropriate drop-off or collection arrangement.
                        </p>
                      </div>
                    </div>
                  </div>
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
   OPENING HOURS ROW
========================================================= */

function OpeningHoursRow({ day, hours }: { day: string; hours: string }) {
  const isClosed = hours === "Closed";

  return (
    <div
      className="
        flex
        items-center
        justify-between

        gap-5

        border-b
        border-[var(--brand-navy)]/[0.07]

        py-2.5
      "
    >
      <span
        className="
          font-brand-sans

          text-[12px]
          font-semibold

          text-[var(--brand-navy)]

          sm:text-[13px]
        "
      >
        {day}
      </span>

      <span
        className={`
          font-brand-sans

          text-[12px]
          font-bold

          sm:text-[13px]

          ${
            isClosed
              ? "text-[var(--brand-text-muted)]"
              : "text-[var(--brand-gold-700)]"
          }
        `}
      >
        {hours}
      </span>
    </div>
  );
}

/* =========================================================
   CONTACT ROW
========================================================= */

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="
        group

        flex
        items-center
        gap-3

        rounded-[15px]

        border
        border-[var(--brand-navy)]/[0.06]

        bg-white/35

        px-3
        py-3

        transition-colors
        duration-200

        hover:bg-white/60

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--brand-gold)]
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

      <div>
        <span
          className="
            block

            font-brand-sans

            text-[13px]
            font-bold
            uppercase

            tracking-[0.14em]

            text-[var(--brand-text-muted)]
          "
        >
          {label}
        </span>

        <strong
          className="
            mt-0.5
            block

            font-brand-sans

            text-[12px]
            font-semibold

            text-[var(--brand-navy)]

            transition-colors
            duration-200

            group-hover:text-[var(--brand-gold-700)]

            sm:text-[13px]
          "
        >
          {value}
        </strong>
      </div>
    </a>
  );
}

/* =========================================================
   VISIT DETAIL
========================================================= */

function VisitDetail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
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
      <Icon
        size={12}
        strokeWidth={1.5}
        className="text-[var(--brand-gold-700)]"
      />

      <span
        className="
          mt-2
          block

          font-brand-sans

          text-[13px]
          font-bold
          uppercase

          tracking-[0.14em]

          text-[var(--brand-text-muted)]
        "
      >
        {label}
      </span>

      <strong
        className="
          mt-1
          block

          font-brand-sans

          text-[11px]
          font-semibold
          leading-[1.4]

          text-[var(--brand-navy)]

          sm:text-[12px]
        "
      >
        {value}
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

          -right-[90px]
          -top-[100px]

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
