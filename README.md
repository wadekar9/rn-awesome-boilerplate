# React Native Awesome Boilerplate

<img width="100%" height="386" alt="banner" src="https://github.com/user-attachments/assets/685c62cb-7c24-48a9-9794-60b4ea6e1d97" />


A production-ready React Native template with TypeScript, modern tooling, and best practices built-in. Start building your cross-platform mobile app in minutes.

## ✨ Features

- 📱 **Cross-platform**: iOS and Android support out of the box
- 🔷 **TypeScript**: Full type safety across the codebase
- 🎨 **Theming**: Built-in theme system with context API
- 🌍 **i18n Ready**: Multi-language support (EN, ES, HI)
- 🧭 **Navigation**: React Navigation with typed routes
- 🗃️ **State Management**: Redux Toolkit with typed slices
- 🔌 **API Client**: Pre-configured Axios instance
- 🧪 **Testing**: Jest setup with TypeScript support
- 📏 **Code Quality**: ESLint + Prettier pre-configured
- 🎯 **Modern Architecture**: Feature-based folder structure

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- React Native development environment ([setup guide](https://reactnative.dev/docs/environment-setup))
- iOS: Xcode 14+ and CocoaPods
- Android: Android Studio and JDK 11+

### Installation (Recommended)

```bash
npx @react-native-community/cli init MyApp --template rn-awesome-boilerplate
```

> **Tip**: Use `--skip-git-init` if initialization is slow:
> ```bash
> npx @react-native-community/cli init MyApp --template rn-awesome-boilerplate --skip-git-init
> ```

### Alternative: From GitHub (slower if repo has large history)

```bash
npx @react-native-community/cli init MyApp --template https://github.com/wadekar9/rn-awesome-boilerplate
```

### Post-Installation Setup

1. **Install iOS dependencies**
   ```bash
   cd ios && pod install && cd ..
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **iOS setup**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run the app**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   ```

## 📁 Project Structure

```
template/
├── app/                    # Application source code
│   ├── components/        # Reusable UI components
│   ├── screens/          # Screen components
│   ├── navigation/       # Navigation configuration
│   ├── store/           # Redux store & slices
│   ├── hooks/           # Custom React hooks
│   ├── helpers/         # Utility functions
│   ├── constants/       # App constants (colors, endpoints, etc.)
│   ├── locales/         # Translation files
│   ├── types/           # TypeScript type definitions
│   ├── context/         # React Context providers
│   └── utils/           # Core utilities (API, storage, etc.)
├── ios/                 # iOS native project
├── android/             # Android native project
├── patches/             # Package patches (patch-package)
└── App.tsx             # Application entry point
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React Native |
| **Language** | TypeScript |
| **State Management** | Redux Toolkit |
| **Navigation** | React Navigation |
| **HTTP Client** | Axios |
| **Testing** | Jest |
| **Linting** | ESLint |
| **Formatting** | Prettier |
| **Build Tool** | Metro |
| **iOS Dependencies** | CocoaPods |

## 🔧 Available Scripts

```bash
npm run android          # Run on Android
npm run ios             # Run on iOS
npm run start           # Start Metro bundler
npm run test            # Run tests
npm run lint            # Lint code
npm run lint:fix        # Fix linting issues
npm run format          # Format code with Prettier
```

## 🏗️ Key Directories

### `/app/components`
Reusable UI components organized by feature or type. Keep components small, focused, and well-typed.

### `/app/screens`
Screen-level components representing app pages. Organized into public (auth) and private (authenticated) flows.

### `/app/store`
Redux store configuration with feature-based slices. Uses Redux Toolkit for simplified Redux logic.

### `/app/navigation`
Navigation structure using React Navigation. Includes auth flow, main app flow, and root navigator.

### `/app/locales`
i18n translation files in JSON format. Currently supports English, Spanish, and Hindi.

### `/app/helpers`
Pure utility functions for common operations (API calls, file handling, data transformation).

### `/app/constants`
App-wide constants including colors, API endpoints, screen names, and storage keys.

## 🌐 Internationalization

The template includes built-in i18n support with the following languages:

- 🇬🇧 English (en)
- 🇪🇸 Spanish (es)
- 🇮🇳 Hindi (hi)

Translation files are located in `/app/locales/`. Add new languages by creating a new JSON file and registering it in the i18n configuration.

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure your environment-specific variables:

```bash
API_BASE_URL=https://api.example.com
API_TIMEOUT=30000
# Add your variables here
```

## 🧪 Testing

The template includes Jest configuration for unit testing:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🐛 Troubleshooting

### Metro cache issues
```bash
npx react-native start --reset-cache
```

### iOS build failures
```bash
cd ios
pod deintegrate
pod install --repo-update
cd ..
npm run ios
```

### Android build failures
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Clear all caches
```bash
npm run clean
npm install
cd ios && pod install && cd ..
```

## 📝 Next Steps

After setting up the template, consider:

1. **Configure app metadata**: Update `app.json` with your app name, bundle ID, and version
2. **Set up CI/CD**: Add GitHub Actions, Bitrise, or Fastlane for automated builds
3. **Add analytics**: Integrate Firebase Analytics or similar
4. **Configure error tracking**: Add Sentry or similar error monitoring
5. **Set up deep linking**: Configure URL schemes and universal links
6. **Implement authentication**: Build on the auth flow scaffold
7. **Add splash screen**: Customize the launch screen for your brand

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

Built with ❤️ using the best tools and practices from the React Native community.

---

**Need help?** Check out the [React Native documentation](https://reactnative.dev/docs/getting-started) or open an issue in this repository.
