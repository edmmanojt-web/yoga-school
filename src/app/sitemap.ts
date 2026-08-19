import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticPages = [
    { url: base, priority: 1 },
    { url: `${base}/yoga`, priority: 0.9 },
    { url: `${base}/breathwork`, priority: 0.9 },
    { url: `${base}/mindfulness`, priority: 0.9 },
    { url: `${base}/yoga-beyond-the-mat`, priority: 0.95 },
    { url: `${base}/workshops`, priority: 0.8 },
    { url: `${base}/retreats`, priority: 0.8 },
    { url: `${base}/schedule`, priority: 0.85 },
    { url: `${base}/community`, priority: 0.7 },
    { url: `${base}/about`, priority: 0.7 },
    { url: `${base}/contact`, priority: 0.7 },
    { url: `${base}/faq`, priority: 0.6 },
    { url: `${base}/offerings`, priority: 0.85 },
    { url: `${base}/privacy`, priority: 0.3 },
    { url: `${base}/terms`, priority: 0.3 },
  ];

  return staticPages.map((page) => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page.priority,
  }));
}
