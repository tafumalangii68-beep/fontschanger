import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: false,
  // Short aliases for existing pages, so shared links never break.
  async redirects() {
    return [
      // fontschanger.app (non-www) is the only canonical domain. www and the default Vercel
      // address serve full copies of the site, so send them there with a 301 and the same path.
      // Exact hosts only: preview deployment URLs keep working.
      ...["www.fontschanger.app", "fontschanger.vercel.app"].map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: "https://fontschanger.app/:path*",
        statusCode: 301 as const,
      })),
      { source: "/font-styles", destination: "/fonts", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
    ];
  },
};

export default nextConfig;
