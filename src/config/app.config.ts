import { registerAs } from '@nestjs/config';

export const APP_CONFIG = registerAs('APP', () => {
  return {
    APP_NAME: process.env['APP_NAME'],
    APP_URL: process.env['APP_URL'],
    APP_EMAIL: {
      SUPPORT: process.env['SUPPORT_EMAIL'],
    },
    APP_PORT: process.env['PORT'],
    APP_AUTH_KEY: process.env['APP_AUTH_KEY'],
    isProd: process.env['PROD'] === 'true',
    APP_ENV: process.env['NODE_ENV'],
  };
});
