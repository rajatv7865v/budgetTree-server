import { registerAs } from '@nestjs/config';

export const TYPEFORM_CONFIG = registerAs('TYPEFORM', () => {
  return {
    ID: process.env['TYPEFORM_CLIENT_ID'],
    SECRET: process.env['TYPEFORM_CLIENT_SECRET'],
    URI: process.env['TYPEFORM_REDIRECT_URL'],
  };
});
