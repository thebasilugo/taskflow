/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  
  // Enable image optimization
  images: {
    domains: ['github.com'],
    formats: ['image/avif', 'image/webp'],
    // Disable remote patterns for security in production
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/thebasilugo/**',
      },
    ],
  },
  
  // Enable SWC minification for faster builds
  swcMinify: true,
  
  // Configure compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Configure headers for security
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Configure redirects
  redirects: async () => {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Enable experimental features
  experimental: {
    // Enable optimizeCss for production builds
    optimizeCss: process.env.NODE_ENV === 'production',
    // Enable server components
    serverComponents: true,
    // Enable app directory
    appDir: true,
  },
  
  // Configure webpack for optimizations
  webpack: (config, { dev, isServer }) => {
    // Add optimizations for production builds
    if (!dev && !isServer) {
      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
      };
    }
    
    return config;
  },
};

export default nextConfig;

