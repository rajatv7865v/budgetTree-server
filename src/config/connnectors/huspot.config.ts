import { registerAs } from '@nestjs/config';

export const HUBSPOT_CONFIG = registerAs('HUBSPOT', () => {
  return {
    ID: process.env['HUBSPOT_CLIENT_ID'],
    SECRET: process.env['HUBSPOT_CLIENT_SECRET'],
    URI: process.env['HUBSPOT_REDIRECT_URL'],
  };
});
