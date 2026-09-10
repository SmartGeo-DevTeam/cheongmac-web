import type { NextConfig } from 'next';

function supabaseRemotePatterns(): NonNullable<NextConfig['images']>['remotePatterns'] {
  const value = process.env.SUPABASE_URL?.trim();

  if (!value) return [];

  try {
    const url = new URL(value);

    return [
      {
        protocol: url.protocol === 'http:' ? 'http' : 'https',
        hostname: url.hostname,
        pathname: '/storage/v1/object/public/**',
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '12mb',
    },
  },
  images: {
    remotePatterns: supabaseRemotePatterns(),
  },
};

export default nextConfig;
