const CracoLessPlugin = require('craco-less')
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@fonts': path.resolve(__dirname, './src/assets/fonts/'),
      '@images': path.resolve(__dirname, './src/assets/images/'),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              hack: `true;@import "${require.resolve(
                './src/assets/less/netraga-theme.less'
              )}";`,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
