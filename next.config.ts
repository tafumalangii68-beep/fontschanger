import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
  // Short aliases for existing pages, so shared links never break.
  async redirects() {
    return [
      // The default Vercel address serves a full copy of the site; send it to the real domain.
      // Only this exact host: preview deployment URLs keep working.
      {
        source: "/:path*",
        has: [{ type: "host", value: "fontschanger.vercel.app" }],
        destination: "https://fontschanger.app/:path*",
        statusCode: 301,
      },
      { source: "/font-styles", destination: "/fonts", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
    ];
  },
};

export default nextConfig;
