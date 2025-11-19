// next.config.mjs
export default {
  trailingSlash: false,
  async headers() {
    return [
      {
        source: '/(sitemap.xml|robots.txt)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=300, must-revalidate' },
        ],
      },
    ];
  },
};
