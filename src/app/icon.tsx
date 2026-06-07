import { ImageResponse } from "next/og";
import { readProfileDataUrl } from "./profileImage";

// Default tab favicon — the profile photo, rounded, same approach as the
// per-app icons so it matches (and stays a PNG, which Safari handles).
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const profile = readProfileDataUrl();
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile}
          width={64}
          height={64}
          style={{ width: 64, height: 64, objectFit: "cover" }}
        />
      </div>
    ),
    { ...size }
  );
}
