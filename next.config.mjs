/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true }, // Next не запускает ESLint на build
};
export default nextConfig;
