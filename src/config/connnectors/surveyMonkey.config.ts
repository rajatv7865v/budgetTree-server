import { registerAs } from '@nestjs/config';

export const SURVEY_MONKEY_CONFIG = registerAs('SURVEY_MONKEY', () => {
  return {
    ID: process.env['SURVEY-MONKEY_CLIENT_ID'],
    SECRET: process.env['SURVEY-MONKEY_CLIENT_SECRET'],
    URI: process.env['SURVEY-MONKEY_REDIRECT_URI'],
  };
});
