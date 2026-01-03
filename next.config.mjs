const nextConfig = {
  trailingSlash: false,

  async redirects() {
    return [
      // Existing location redirects
      { source: "/locations/philadelphia-pa", destination: "/areas", permanent: true },
      { source: "/locations/wilmington-de", destination: "/areas", permanent: true },

      // Area redirects
      { source: "/areas/philadelphia", destination: "/areas", permanent: true },
      { source: "/areas/wilmington", destination: "/areas", permanent: true },

      // Catch nested variants too
      { source: "/areas/philadelphia/:path*", destination: "/areas", permanent: true },
      { source: "/areas/wilmington/:path*", destination: "/areas", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: [{ key: "Cache-Control", value: "public, max-age=300, must-revalidate" }],
      },
      {
        source: "/robots.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=300, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
