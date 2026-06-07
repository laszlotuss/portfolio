import { readFileSync } from "fs";
import { join } from "path";

let cached: string | undefined;

/** JPEG data URL for `public/profile.jpg` — used by favicon routes. */
export const readProfileDataUrl = (): string => {
  if (!cached) {
    cached =
      "data:image/jpeg;base64," +
      readFileSync(join(process.cwd(), "public", "profile.jpg")).toString(
        "base64"
      );
  }
  return cached;
};

const siteOrigin = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  const port = process.env.PORT ?? "3000";
  return `http://localhost:${port}`;
};

/** Normalize an app icon for ImageResponse (needs absolute http(s) or data). */
export const resolveAppIconSrc = (icon?: string): string => {
  if (!icon) return readProfileDataUrl();
  if (/^https?:\/\//i.test(icon)) return icon;
  if (icon.startsWith("/")) return `${siteOrigin()}${icon}`;
  return readProfileDataUrl();
};
