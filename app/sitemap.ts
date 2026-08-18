import type { MetadataRoute } from "next";

import { absoluteUrl, siteRoutes } from "@/lib/site";

const lastModified = new Date("2026-08-18T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images: route.images?.map((image) => absoluteUrl(image)),
  }));
}
