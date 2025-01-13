module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          "$assets": "./src/assets",
          "$components": "./src/components",
          "$constants": "./src/constants",
          "$context": "./src/context",
          "$dev": "./src/dev",
          "$helpers": "./src/helpers",
          "$hooks": "./src/hooks",
          "$locales": "./src/locales",
          "$mock": "./src/mock",
          "$navigation": "./src/navigation",
          "$screens": "./src/screens",
          "$styles": "./src/styles",
          "$types": "./src/types",
          "$utils": "./src/utils"
        }
      }
    ]
  ],
  env: {
    production: {
      plugins: ['transform-remove-console']
    }
  }
};
