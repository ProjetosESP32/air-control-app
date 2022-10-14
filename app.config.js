import 'dotenv/config'

export default {
  expo: {
    name: 'Controle do Ar',
    slug: 'air-control',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        'expo-image-picker',
        {
          photosPermission: 'O app acessa suas fotos para a foto do usuário',
          cameraPermission: 'O app acessa sua camera para a foto do usuário',
        },
      ],
    ],
    extra: {
      API_URL: process.env.API_URL,
      BASE_URL: process.env.BASE_URL,
    },
  },
}
