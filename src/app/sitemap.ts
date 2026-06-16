import type { MetadataRoute } from "next";
import { getApps } from "./app";

const BASE = "https://laszlotuss.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apps = await getApps();

  const appEntries: MetadataRoute.Sitemap = apps.map((app) => ({
    url: `${BASE}/${app.id}`,
    lastModified: new Date(app.releaseDate),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/support`, changeFrequency: "monthly", priority: 0.5 },
    ...appEntries,
  ];
}
