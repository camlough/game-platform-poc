/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback['@mikro-orm/mongodb'] = false;
      config.resolve.fallback['@mikro-orm/mysql'] = false;
      config.resolve.fallback['@mikro-orm/mariadb'] = false;
      config.resolve.fallback['@mikro-orm/sqlite'] = false;
      config.resolve.fallback['module'] = false;
      config.resolve.fallback['@mikro-orm/entity-generator'] = false;
      config.resolve.fallback['@mikro-orm/migrations'] = false;
      config.resolve.fallback['dns'] = false;
      config.resolve.fallback['net'] = false;
      config.resolve.fallback['tls'] = false;
      config.resolve.fallback['pg-native'] = false;
      config.resolve.fallback['mssql/package.json'] = false;
      config.resolve.fallback['typeorm'] = false;
      config.resolve.fallback['slonik'] = false;
      config.resolve.fallback['pg-promise'] = false;
      config.resolve.fallback['dns'] = false;
      config.resolve.fallback['net'] = false;
    }
    return config;
  },
}

module.exports = nextConfig
