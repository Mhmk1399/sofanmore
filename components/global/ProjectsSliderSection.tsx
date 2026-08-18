import ProjectsSliderClient from "./ProjectsSliderClient";

/* =========================================================
   TYPES
========================================================= */
export type ProjectProduct = {
  id: string;
  productCode: number;
  name: string;
  imageUrl: string;
  description: string;
};

export const demoProjects: ProjectProduct[] = [
  {
    id: "demo-project-1",
    productCode: 1001,
    name: "Sculptural Navy Sofa",
    imageUrl: "/assets/images/1.webp",
    description:
      "A made-to-measure sofa shaped around a contemporary London living space, combining deep navy upholstery with generous proportions and a refined architectural silhouette.",
  },

  {
    id: "demo-project-2",
    productCode: 1002,
    name: "Curved Hospitality Seating",
    imageUrl: "/assets/images/2.webp",
    description:
      "Bespoke seating developed for a hospitality interior, balancing comfort, durability and a clean visual rhythm throughout the space.",
  },

  {
    id: "demo-project-3",
    productCode: 1003,
    name: "Warm Contemporary Interior",
    imageUrl: "/assets/images/3.webp",
    description:
      "A layered interior concept built around warm neutrals, considered proportions and bespoke pieces designed to feel naturally connected to the architecture.",
  },

  {
    id: "demo-project-4",
    productCode: 1004,
    name: "Restored Statement Sofa",
    imageUrl: "/assets/images/4.webp",
    description:
      "A carefully restored sofa given a renewed structure, refreshed upholstery and a cleaner finish while preserving the character of the original piece.",
  },
];
type ProjectsSliderSectionProps = {
  products?: ProjectProduct[];
};

/* =========================================================
   SERVER COMPONENT
========================================================= */

export default function ProjectsSliderSection({
  products = [],
}: ProjectsSliderSectionProps) {
  /*
    Later:

    const products = await db.product.findMany(...)
    
    or

    const products = await getProducts();

    Then simply pass them to this component.

    Fake data is only used while there are
    no real products.
  */

  const projects = products.length > 0 ? products : demoProjects;

  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="projects-slider-title"
      className="
        overflow-hidden

        bg-[var(--brand-ivory)]

        px-3
        py-10

        sm:px-5
        sm:py-12

        lg:px-8
        lg:py-16
      "
    >
      <div
        className="
          mx-auto
          max-w-[var(--site-width)]
        "
      >
        {/* =================================================
            HEADER
        ================================================== */}

        <div
          className="
            mb-7

            flex
            flex-col

            gap-5

            sm:mb-9

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div
            className="
              max-w-[720px]
            "
          >
            {/* EYEBROW */}

            <div
              className="
                flex
                items-center

                gap-2.5
              "
            >
              <span
                aria-hidden
                className="
                  h-[1px]
                  w-8

                  bg-[var(--brand-gold)]
                "
              />

              <p
                className="
                  font-brand-sans

                  text-[8px]
                  font-bold
                  uppercase

                  tracking-[0.2em]

                  text-[var(--brand-gold-700)]

                  sm:text-[9px]
                "
              >
                Selected Work
              </p>
            </div>

            {/* TITLE */}

            <h2
              id="projects-slider-title"
              className="
                mt-4

                max-w-[660px]

                font-brand-display

                text-[34px]
                font-medium
                leading-[1.02]

                tracking-[-0.04em]

                text-[var(--brand-navy)]

                sm:text-[44px]

                lg:text-[52px]
              "
            >
              Projects Made
              <br className="hidden sm:block" />
              Around Real Spaces.
            </h2>
          </div>

          {/* SMALL INTRO */}

          <p
            className="
              max-w-[430px]

              font-brand-sans

              text-[11px]
              font-medium
              leading-[1.75]

              text-[var(--brand-text-muted)]

              sm:text-[12px]
            "
          >
            A closer look at bespoke sofas, commercial seating, interiors and
            restoration work developed around individual spaces and
            requirements.
          </p>
        </div>

        {/* =================================================
            SLIDER CLIENT ISLAND
        ================================================== */}

        <ProjectsSliderClient projects={projects} />
      </div>
    </section>
  );
}
