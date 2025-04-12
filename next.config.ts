/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
    config.resolve.alias['@firebase/util'] = require.resolve('@firebase/util');
    config.resolve.alias['pinia'] = require.resolve('pinia');

      return config;
    },
    experimental: {
        appDir: true,
    },
    typescript: {
        compilerOptions: {
            baseUrl: ".",
            paths: {
                "*": ["./*"]
            }
        }
    }

}

module.exports = nextConfig
