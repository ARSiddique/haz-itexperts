const nextConfig = {
  trailingSlash: false,

  // ✅ Stop Next.js from doing /foo/ -> /foo automatically
  skipTrailingSlashRedirect: true,

  async redirects() {
    return [
      // ---- 1-step redirects (no trailing slash) ----
      { source: "/locations/philadelphia-pa", destination: "/areas", permanent: true },
      { source: "/locations/wilmington-de", destination: "/areas", permanent: true },
      { source: "/areas/philadelphia", destination: "/areas", permanent: true },
      { source: "/areas/wilmington", destination: "/areas", permanent: true },

      // ---- 1-step redirects (WITH trailing slash) ----
      { source: "/locations/philadelphia-pa/", destination: "/areas", permanent: true },
      { source: "/locations/wilmington-de/", destination: "/areas", permanent: true },
      { source: "/areas/philadelphia/", destination: "/areas", permanent: true },
      { source: "/areas/wilmington/", destination: "/areas", permanent: true },

      // ---- catch nested variants (both with/without slash at end) ----
      { source: "/areas/philadelphia/:path*", destination: "/areas", permanent: true },
      { source: "/areas/wilmington/:path*", destination: "/areas", permanent: true },
      { source: "/areas/philadelphia/:path*/", destination: "/areas", permanent: true },
      { source: "/areas/wilmington/:path*/", destination: "/areas", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/(sitemap.xml|robots.txt)",
        headers: [{ key: "Cache-Control", value: "public, max-age=300, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
