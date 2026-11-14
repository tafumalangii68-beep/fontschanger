import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = "Fonts Changer: fancy text you can copy and paste";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** Generated once at build time and used as the default social sharing image. */
export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-mark-512.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
          background: "linear-gradient(135deg, #ede3ff 0%, #f8f5ff 60%)",
          color: "#17143b",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
          <img src={logoSrc} width={96} height={96} alt="" />
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>
            Fonts<span style={{ color: "#6425e8", marginLeft: 12 }}>Changer</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 36, lineHeight: 1.1 }}>
          Fancy text you can copy and paste
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#65627a", marginTop: 28 }}>
          Cursive · Bold · Aesthetic · Text Decorator · Bio Generator
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#6425e8", marginTop: 36 }}>
          {siteConfig.url.replace("https://", "")}
        </div>
      </div>
    ),
    size,
  );
}
