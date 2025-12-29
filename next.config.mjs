const nextConfig = {
  trailingSlash: false,

  async redirects() {
    return [
      // Existing location redirects
      { source: "/locations/philadelphia-pa", destination: "/areas", permanent: true },
      { source: "/locations/wilmington-de", destination: "/areas", permanent: true },

      // ✅ NEW: area redirects (fix the 404 you saw in curl)
      { source: "/areas/philadelphia", destination: "/areas", permanent: true },
      { source: "/areas/wilmington", destination: "/areas", permanent: true },

      // ✅ Optional: if any old nested variants exist, catch them too
      { source: "/areas/philadelphia/:path*", destination: "/areas", permanent: true },
      { source: "/areas/wilmington/:path*", destination: "/areas", permanent: true },
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
