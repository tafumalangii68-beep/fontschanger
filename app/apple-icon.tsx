import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** Home screen icon for iOS, generated at build time. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6425e8",
          color: "#ffffff",
          fontSize: 92,
          fontWeight: 800,
          letterSpacing: -4,
        }}
      >
        Aa
      </div>
    ),
    size,
  );
}
