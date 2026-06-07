import { ImageResponse } from "next/og";
import { getApp } from "../app";
import { resolveAppIconSrc } from "../profileImage";

// Same-origin, rounded favicon for an app page (remote App Store icons are
// square and unreliable as a cross-origin favicon). Falls back to profile.jpg.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon({
  params,
}: {
  params: Promise<{ app: string }>;
}) {
  const { app: id } = await params;
  const app = await getApp(id);
  const src = resolveAppIconSrc(app?.icon);

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
          src={src}
          width={64}
          height={64}
          style={{ width: 64, height: 64, objectFit: "cover" }}
        />
      </div>
    ),
    { ...size }
  );
}
