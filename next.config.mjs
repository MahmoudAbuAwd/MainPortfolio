/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Short, shareable résumé links: abuawd.com/resume and abuawd.com/cv
  async redirects() {
    return [
      { source: "/resume", destination: "/Resume.pdf", permanent: false },
      { source: "/cv", destination: "/Resume.pdf", permanent: false },
    ]
  },
}

export default nextConfig
