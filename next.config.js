const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 10000,
  env: {
    PORT: process.env.PORT,
    API_URL: process.env.API_URL,
  }
}

module.exports = nextConfig;
