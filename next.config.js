/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: { prependData: `@import './styles/_variables.scss';` },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
