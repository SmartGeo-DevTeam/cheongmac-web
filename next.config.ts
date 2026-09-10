import type { NextConfig } from 'next';

function supabaseRemotePatterns(): NonNullable<
  NonNullable<NextConfig['images']>['remotePatterns']
> {
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

const azureAssetBaseUrl = (
  process.env.NEXT_PUBLIC_AZURE_ASSET_BASE_URL ||
  'https://cheongmacmedia.blob.core.windows.net/assets'
).replace(/\/+$/, '');

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '25mb',
    },
  },
  images: {
    remotePatterns: [
      ...supabaseRemotePatterns(),
      {
        protocol: 'https',
        hostname: 'cheongmacmedia.blob.core.windows.net',
        pathname: '/assets/**',
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/assets/:path*',
          destination: `${azureAssetBaseUrl}/static/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
