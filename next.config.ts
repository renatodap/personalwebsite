import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "renatodap.me", pathname: "/s3/personalwebsite-media/**" },
    ],
  },

  /**
   * The document must never be served from the browser's cache without asking.
   *
   * `export const revalidate` on the page produced
   * `s-maxage=900, stale-while-revalidate=31535100`, and that second number is
   * about a year. It is an explicit instruction to a returning browser: paint
   * the copy you already have, and check for a new one afterwards. So the first
   * load after every deploy showed the PREVIOUS build, and the load after that
   * showed the new one. Renato saw a shipped change was missing more than once,
   * and it was on screen the whole time, one refresh away.
   *
   * `max-age=0, must-revalidate` makes the browser ask every time. That is not
   * expensive: the response carries an ETag, so an unchanged page answers 304
   * with no body. What it buys is that what you see is always what was last
   * deployed.
   *
   * Everything with a content hash in its name is exempt and keeps the
   * long immutable caching Next gives it, which is where the real bytes are.
   * The drawings are exempt too: they are the payload, they are content
   * addressed by name, and they change only when a trace is redrawn.
   */
  async headers() {
    return [
      {
        source: "/((?!_next/static|_next/image|drawings).*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      {
        source: "/drawings/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
    ];
  },
};

export default nextConfig;
