/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (isServer) {
        config.externals.push({
          tls: 'empty',
          fs: 'empty',
        });
      }
      return config;
    },
  };
  
  export default nextConfig;