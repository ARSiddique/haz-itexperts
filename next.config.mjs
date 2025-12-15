// next.config.mjs
export default {
  trailingSlash: false,

  async headers() {
    return [
      {
        source: "/(sitemap.xml|robots.txt)",
        headers: [{ key: "Cache-Control", value: "public, max-age=300, must-revalidate" }],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/locations/philadelphia-pa",
        destination: "/areas",
        permanent: true, // 308
      },
      {
        source: "/locations/wilmington-de",
        destination: "/areas",
        permanent: true,
      },
    ];
  },
};
