import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'sphaghettihead',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '655025045604-okroi8g3i019jd3mqvigt7t5kq4kls63.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
