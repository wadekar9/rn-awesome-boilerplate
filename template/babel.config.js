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
          "$assets": "./app/assets",
          "$components": "./app/components",
          "$constants": "./app/constants",
          "$context": "./app/context",
          "$dev": "./app/dev",
          "$helpers": "./app/helpers",
          "$hooks": "./app/hooks",
          "$locales": "./app/locales",
          "$mock": "./app/mock",
          "$navigation": "./app/navigation",
          "$screens": "./app/screens",
          "$styles": "./app/styles",
          "$types": "./app/types",
          "$utils": "./app/utils"
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
