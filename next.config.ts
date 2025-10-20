import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allow production builds to complete even with ESLint warnings/errors
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Allow production builds to complete even with TypeScript errors
    ignoreBuildErrors: false,
  },
  sassOptions: {
    // Suppress Sass deprecation warnings
    silenceDeprecations: ['legacy-js-api', 'import'],
  },
};

export default nextConfig;
