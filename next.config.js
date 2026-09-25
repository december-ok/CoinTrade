/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 기존 컴포넌트 라이프사이클 및 차트 중복 마운트 방지
  swcMinify: true,
};

module.exports = nextConfig;
