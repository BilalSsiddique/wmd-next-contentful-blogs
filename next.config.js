/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    MY_SPACE_ID: "et3tvw37a60x",
    CONTENTFUL_ACCESS_KEY: "j-RJw3oN46cUcC2qjMhMc0qq_V8hH1u8hnqLgsrdqLM",
  },
  images: {
    domains: ["images.ctfassets.net"],
  },
};

module.exports = nextConfig;
