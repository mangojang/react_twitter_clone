const withBundleAnalyzer = require('@next/bundle-analyzer');

const nextConfig = withBundleAnalyzer( {
  enabled: process.env.ANALYZE === 'true',
  distDir : '.next',
  webpack(config){
    // console.log('config',config);
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',

    }
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
});
  
module.exports = nextConfig