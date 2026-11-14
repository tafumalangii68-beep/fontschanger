import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = "Fonts Changer: fancy text you can copy and paste";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** Generated once at build time and used as the default social sharing image. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#faf8ff",
          color: "#17143b",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, color: "#6425e8" }}>{siteConfig.name}</div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
          Fancy text you can copy and paste
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#65627a", marginTop: 28 }}>
          Cursive · Bold · Aesthetic · Small · Glitch · Upside down
        </div>
      </div>
    ),
    size,
  );
}
