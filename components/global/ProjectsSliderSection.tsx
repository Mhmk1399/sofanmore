import ProjectsSliderClient from "./ProjectsSliderClient";

import { listPublishedProjects } from "@/lib/project-repository";
import { projectServiceLabels } from "@/lib/project-service";
import ClayButton from "../ui/ClayButton";

/* =========================================================
   TYPES
========================================================= */

export type ProjectSliderItem = {
  id: string;

  projectCode: number;

  title: string;

  slug?: string;

  coverImageUrl: string;

  excerpt: string;

  serviceLabel?: string;

  locationLabel?: string;
};

/* =========================================================
   DEMO FALLBACK

   Used ONLY when there are no real published projects
   or when the repository cannot be reached.
========================================================= */

export const demoProjects: ProjectSliderItem[] = [
  {
    id: "demo-project-1",

    projectCode: 1001,

    title: "Bespoke Sofa Project",

    coverImageUrl: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/8.webp",

    excerpt:
      "A made-to-measure sofa developed around the proportions, layout and character of the space.",

    serviceLabel: "Bespoke Sofas",
  },

  {
    id: "demo-project-2",

    projectCode: 1002,

    title: "Commercial Seating Project",

    coverImageUrl: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/12.webp",

    excerpt:
      "Bespoke seating created for a commercial interior with comfort, durability and visual balance in mind.",

    serviceLabel: "Commercial Sofas",
  },

  {
    id: "demo-project-3",

    projectCode: 1003,

    title: "Interior Design Project",

    coverImageUrl: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/13.webp",

    excerpt:
      "A considered interior developed around the way the space needs to look, feel and function.",

    serviceLabel: "Interior Design",
  },

  {
    id: "demo-project-4",

    projectCode: 1004,

    title: "Sofa Restoration Project",

    coverImageUrl: "https://sofanmore.s3.eu-west-2.amazonaws.com/Image/1.webp",

    excerpt:
      "A sofa carefully renewed through professional repair, upholstery and finishing work.",

    serviceLabel: "Sofa Repair & Restoration",
  },
];

/* =========================================================
   LOAD SLIDER PROJECTS

   Priority:

   1. Featured + published real projects
   2. Published real projects
   3. Demo fallback

   Maximum 6 items keeps the homepage slider lightweight.
========================================================= */

async function getSliderProjects(): Promise<ProjectSliderItem[]> {
  try {
    const projects = await listPublishedProjects();

    if (!projects.length) {
      return demoProjects;
    }

    const featuredProjects = projects.filter(
      (project) => project.featured === true,
    );

    const source = featuredProjects.length > 0 ? featuredProjects : projects;

    return source.slice(0, 6).map((project) => ({
      id: project.id,

      projectCode: project.projectCode,

      title: project.title,

      slug: project.slug,

      coverImageUrl: project.coverImageUrl,

      excerpt: project.excerpt,

      serviceLabel: projectServiceLabels[project.service],

      locationLabel: project.locationLabel ?? undefined,
    }));
  } catch (error) {
    console.warn("Could not load homepage projects", error);

    return demoProjects;
  }
}

/* =========================================================
   SERVER COMPONENT
========================================================= */

export default async function ProjectsSliderSection() {
  const sliderProjects = await getSliderProjects();

  if (!sliderProjects.length) {
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
        lg:py-14
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

        <header
          className="
            mb-7

            flex justify-between items-center
            gap-1

            sm:mb-8

             
            
            lg:gap-10
          "
        >
          <div
            className="
              max-w-[760px]
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
                  h-px
                  w-8

                  bg-[var(--brand-gold)]
                "
              />

              <p
                className="
                  inline-flex
                  min-h-7
                  items-center
                  rounded-full
                  bg-[#fff8ec]
                  px-3

                  font-brand-sans

                  text-[10px]
                  font-bold
                  uppercase

                  tracking-[0.1em]

                  text-[var(--brand-navy)]

                  shadow-[inset_1px_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(75,53,30,0.08)]

                  sm:text-[11px]
                "
              >
                Selected Projects
              </p>
            </div>

            {/* TITLE */}

            <h2
              id="projects-slider-title"
              className="
                mt-3.5

                max-w-[700px]

                font-brand-display

                text-[25px]
                font-medium
                leading-[0.98]

                tracking-[-0.04em]

                text-[var(--brand-navy)]

                sm:text-[44px]

                lg:text-[50px]
              "
            >
              Made for real spaces. Built around people.
            </h2>
          </div>

          {/* DESCRIPTION */}

          <ClayButton
            href="/projects"
            variant="gold"
            target="_blank"
            ariaLabel="View all projects"
          >
            View all
          </ClayButton>
        </header>

        {/* =================================================
            SLIDER CLIENT ISLAND
        ================================================== */}

        <ProjectsSliderClient projects={sliderProjects} />
      </div>
    </section>
  );
}
