import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.PhilAldridge.ks2spelling',
  appName: 'KS2 Spelling',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
