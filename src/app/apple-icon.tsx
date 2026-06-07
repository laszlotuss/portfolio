import { ImageResponse } from "next/og";
import { readProfileDataUrl } from "./profileImage";

// Apple touch icon — full-bleed, opaque PNG (iOS applies its own rounded mask).
// A PNG is important: iOS ignores a JPEG apple-touch-icon and falls back to the
// favicon on a padded white tile.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const profile = readProfileDataUrl();
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile}
          width={180}
          height={180}
          style={{ width: 180, height: 180, objectFit: "cover" }}
        />
      </div>
    ),
    { ...size }
  );
}
