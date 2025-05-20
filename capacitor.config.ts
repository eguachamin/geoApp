import { Geolocation } from '@capacitor/geolocation';
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'geoApp',
  webDir: 'www',
  plugins:{
    Geolocation
  }
};

export default config;
