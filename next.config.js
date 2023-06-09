/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:['tlappshop-imagenes.s3.amazonaws.com',"https://m.youtube.com/", "tlapps.com.mx"],
    dangerouslyAllowSVG: true,
   

  }
}

module.exports = nextConfig
