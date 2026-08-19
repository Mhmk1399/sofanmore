import type { MetadataRoute } from "next";

import { listPublishedProjects } from "@/lib/project-repository";
import { absoluteUrl, siteRoutes } from "@/lib/site";

export const dynamic = "force-dynamic";

const lastModified = new Date("2026-08-19T00:00:00.000Z");

async function getProjectRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    const projects = await listPublishedProjects(500);

    return projects.map((project) => {
      const images = Array.from(
        new Set([
          absoluteUrl(project.coverImageUrl),
          ...project.images.map((image) => absoluteUrl(image.url)),
        ]),
      );

      return {
        url: absoluteUrl(`/projects/${project.slug}`),
        lastModified: new Date(project.updatedAt),
        changeFrequency: "monthly",
        priority: 0.72,
        images,
      };
    });
  } catch (error) {
    console.warn("Could not load projects for sitemap", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = siteRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images: route.images?.map((image) => absoluteUrl(image)),
  }));

  return [...staticRoutes, ...(await getProjectRoutes())];
}
