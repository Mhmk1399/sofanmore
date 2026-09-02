import type { NextConfig } from "next";

const s3Bucket = (
  process.env.S3_BUCKET ||
  process.env.AWS_S3_BUCKET ||
  process.env.UPLOAD_BUCKET
)?.trim();
const s3Region = (
  process.env.S3_REGION ||
  process.env.AWS_REGION ||
  process.env.NEXT_PUBLIC_S3_REGION ||
  process.env.UPLOAD_REGION
)?.trim();
const s3Prefix = (process.env.S3_PREFIX?.trim() || "Image").replace(
  /^\/+|\/+$/g,
  "",
);

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.70.122",
  ],
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storadge.arziplus.com",
        port: "",
        pathname: "/project-uploads/**",
      },
      ...(s3Bucket && s3Region
        ? [
            {
              protocol: "https" as const,
              hostname: `${s3Bucket}.s3.${s3Region}.amazonaws.com`,
              port: "",
              pathname: `/${s3Prefix}/**`,
            },
          ]
        : []),
    ],
  },

  async redirects() {
    return [
      {
        source: "/our-services",
        destination: "/services",
        permanent: true,
      },
      
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
      {
        source: "/icons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
