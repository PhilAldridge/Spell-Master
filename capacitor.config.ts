import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.PhilAldridge.spellmaster',
  appName: 'Spell Master',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
