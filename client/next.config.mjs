/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  allowedDevOrigins: [
    "https://activities-saves-see-procedure.trycloudflare.com",
    "*.trycloudflare.com",
  ],
};

export default nextConfig;
