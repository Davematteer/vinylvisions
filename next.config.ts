import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains:["i.scdn.co"],
    remotePatterns:[{
      protocol:"https",
      hostname:"cdn.sanity.io",
      pathname:"/images/**"
    }]
  },
  eslint:{
    ignoreDuringBuilds:true
  },
  typescript:{
    ignoreBuildErrors:true
  }
};

export default nextConfig;
