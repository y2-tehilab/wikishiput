/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: { prependData: `@import './styles/_variables.scss';` },
};

module.exports = nextConfig;
