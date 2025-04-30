/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing config settings
  
  // Add this section
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'dothetodo.vercel.app',
        'upgraded-space-fishstick-95v5qp59ggrc99q4-3000.app.github.dev',
        // Add any other domains you need to support
      ],
    },
    webpack: (config: import('webpack').Configuration, { isServer }: { isServer: boolean }) => {
      if (isServer) {
        config.externals = config.externals || [];
        if (Array.isArray(config.externals)) {
          config.externals.push('@prisma/client');
        }
      }
      return config;
    },
    output: 'standalone', 
  },
};

module.exports = nextConfig;