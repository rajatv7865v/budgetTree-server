import { registerAs } from '@nestjs/config';

export const DATABASE_CONFIG = registerAs('DATABASE', () => {
  return {
    URI: process.env['MONGODB_URI'],
  };
});
