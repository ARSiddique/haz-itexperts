/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // force apex domain (www -> non-www)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.supremeitexperts.com' }],
        destination: 'https://supremeitexperts.com/:path*',
        permanent: true,
      },
      // force https on apex (http -> https)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'supremeitexperts.com' }],
        destination: 'https://supremeitexperts.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
