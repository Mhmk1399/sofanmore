import Image from "next/image";

import { Camera, Check, Hammer, Images } from "lucide-react";

import ClayButton from "@/components/ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

export type WorkshopPhoto = {
  src: string;
  alt: string;
  label?: string;
};

type WorkshopPhotographySectionProps = {
  images?: WorkshopPhoto[];
};

/* =========================================================
   DATA
========================================================= */

const workshopMoments = [
  "Upholstery fabrics being prepared",
  "Craftspeople working on sofa and chair details",
  "Seating at different stages of production",
  "Repair and restoration work in progress",
  "Commercial seating projects",
  "Catalogue and material consultations",
  "Completed bespoke work",
  "The genuine day-to-day character of the workshop",
];

/* =========================================================
   ROOT
========================================================= */

export default function WorkshopPhotographySection({
  images = [],
}: WorkshopPhotographySectionProps) {
  return (
    <section
      aria-labelledby="workshop-photography-heading"
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
            CLAY SHELL
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

          {/* =================================================
              HEADER
          ================================================== */}

          <div
            className="
              relative
              z-10

              grid
              gap-5

              lg:grid-cols-[0.9fr_1.1fr]
              lg:items-end
              lg:gap-12
            "
          >
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
                  Inside the Sofa N More Workshop
                </span>
              </div>

              <h2
                id="workshop-photography-heading"
                className="
                  mt-4

                  max-w-[680px]

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
                See Where the Work Happens
                <span className="text-[var(--brand-gold)]">.</span>
              </h2>
            </div>

            <div className="max-w-[650px] lg:justify-self-end">
              <p
                className="
                  font-brand-display

                  text-[18px]
                  font-medium
                  leading-[1.45]

                  text-[var(--brand-navy)]

                  sm:text-[20px]
                "
              >
                A bespoke sofa is the result of many individual decisions and
                many hours of hands-on work.
              </p>

              <p
                className="
                  mt-3

                  font-brand-sans

                  text-[13px]
                  font-medium
                  leading-[1.7]

                  text-[var(--brand-text-muted)]

                  sm:text-[11px]

                  lg:text-[12px]
                "
              >
                Inside our London workshop, you can see the practical
                environment behind Sofa N More — from upholstery preparation and
                restoration to seating taking shape for homes and commercial
                spaces.
              </p>
            </div>
          </div>

          {/* =================================================
              PHOTO MOSAIC
          ================================================== */}

          <div
            className="
              relative
              z-10

              mt-7

              grid
              gap-3

              lg:grid-cols-[1.35fr_0.65fr]
              lg:gap-4
            "
          >
            {/* FEATURED */}

            <WorkshopPhotoFrame
              photo={images[0]}
              featured
              fallbackLabel="Workshop Photography"
            />

            {/* SUPPORTING */}

            <div
              className="
                grid
                grid-cols-2
                gap-3

                lg:grid-cols-1
              "
            >
              <WorkshopPhotoFrame
                photo={images[1]}
                fallbackLabel="Upholstery & Making"
              />

              <WorkshopPhotoFrame
                photo={images[2]}
                fallbackLabel="Repair & Restoration"
              />

              <div className="col-span-2 lg:col-span-1">
                <WorkshopPhotoFrame
                  photo={images[3]}
                  fallbackLabel="Commercial & Bespoke Work"
                />
              </div>
            </div>
          </div>

          {/* =================================================
              LOWER CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-10

              mt-5

              grid
              gap-4

              lg:grid-cols-[0.9fr_1.1fr]
              lg:items-start
              lg:gap-8
            "
          >
            {/* COPY */}

            <div
              className="
                rounded-[18px]

                bg-[var(--brand-navy)]

                px-4
                py-5

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
                  <Hammer size={14} strokeWidth={1.6} />
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
                    A Genuine Working Space
                  </span>

                  <p
                    className="
                      mt-1.5

                      font-brand-display

                      text-[18px]
                      font-semibold
                      leading-[1.4]

                      text-white

                      sm:text-[20px]
                    "
                  >
                    This is not a staged retail environment.
                  </p>

                  <p
                    className="
                      mt-2

                      max-w-[560px]

                      font-brand-sans

                      text-[12px]
                      font-medium
                      leading-[1.65]

                      text-white/55

                      sm:text-[13px]
                    "
                  >
                    It is a working space where sofas and upholstered seating
                    are discussed, made, repaired and prepared for real homes
                    and businesses.
                  </p>
                </div>
              </div>
            </div>

            {/* MOMENTS */}

            <div
              className="
                clay-inset

                rounded-[18px]

                bg-[#FFFDF8]/55

                px-4
                py-5

                sm:px-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2.5
                "
              >
                <Images
                  size={13}
                  strokeWidth={1.5}
                  className="text-[var(--brand-gold-700)]"
                />

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
                  What Our Workshop Photography Shows
                </span>
              </div>

              <div
                className="
                  mt-4

                  grid
                  gap-x-6

                  sm:grid-cols-2
                "
              >
                {workshopMoments.map((item) => (
                  <MomentItem key={item} text={item} />
                ))}
              </div>
            </div>
          </div>

          {/* =================================================
              CTA
          ================================================== */}

          <div
            className="
              relative
              z-10

              mt-6

              flex
              flex-col
              gap-3

              border-t
              border-[var(--brand-navy)]/10

              pt-5

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
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
                More Completed Work
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
                Explore more bespoke, commercial and restoration projects.
              </p>
            </div>

            <ClayButton
              href="/gallery"
              variant="navy"
              size="lg"
              showArrow
              ariaLabel="View Sofa N More projects"
            >
              View Our Projects
            </ClayButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PHOTO FRAME
========================================================= */

function WorkshopPhotoFrame({
  photo,
  fallbackLabel,
  featured = false,
}: {
  photo?: WorkshopPhoto;
  fallbackLabel: string;
  featured?: boolean;
}) {
  return (
    <figure
      className="
        overflow-hidden

        rounded-[20px]

        border
        border-white/60

        bg-[#E9E0D4]

        p-[4px]

        shadow-[0_7px_18px_rgba(79,57,32,0.06)]
      "
    >
      <div
        className={`
          relative
          overflow-hidden

          rounded-[16px]

          ${
            featured
              ? "aspect-[4/3] lg:h-full lg:min-h-[430px] lg:aspect-auto"
              : "aspect-[4/3] lg:aspect-[16/9]"
          }
        `}
      >
        {photo ? (
          <>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={
                featured
                  ? "(max-width: 1023px) 100vw, 65vw"
                  : "(max-width: 1023px) 50vw, 35vw"
              }
              className="
                object-cover
                object-center
              "
            />

            {photo.label && (
              <>
                <div
                  className="
                    absolute
                    inset-0

                    bg-[linear-gradient(180deg,transparent_60%,rgba(8,20,35,0.58)_100%)]
                  "
                />

                <figcaption
                  className="
                    absolute
                    inset-x-0
                    bottom-0

                    p-3

                    font-brand-sans

                    text-[13px]
                    font-bold
                    uppercase

                    tracking-[0.15em]

                    text-white
                  "
                >
                  {photo.label}
                </figcaption>
              </>
            )}
          </>
        ) : (
          <div
            className="
              absolute
              inset-0

              flex
              flex-col

              items-center
              justify-center

              gap-3

              bg-[linear-gradient(145deg,#EEE5D9,#F8F3EA)]

              p-5

              text-center
            "
          >
            <span
              className="
                flex
                h-10
                w-10

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

                tracking-[0.16em]

                text-[var(--brand-text-muted)]
              "
            >
              {fallbackLabel}
            </span>
          </div>
        )}
      </div>
    </figure>
  );
}

/* =========================================================
   MOMENT
========================================================= */

function MomentItem({ text }: { text: string }) {
  return (
    <div
      className="
        flex
        items-start
        gap-2.5

        border-b
        border-[var(--brand-navy)]/[0.07]

        py-2
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

          -right-[75px]
          -top-[90px]

          hidden

          h-[180px]
          w-[180px]

          rounded-full

          border
          border-[var(--brand-gold)]/10

          lg:block
        "
      />
    </div>
  );
}
