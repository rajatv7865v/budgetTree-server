import { registerAs } from '@nestjs/config';

export const ZOHO_CONFIG = registerAs('ZOHO', () => {
  return {
    ID: process.env['ZOHO_CLIENT_ID'],
    SECRET: process.env['ZOHO_CLIENT_SECRET'],
    URI: process.env['ZOHO_REDIRECT_URL'],
  };
});
