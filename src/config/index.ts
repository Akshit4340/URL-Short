// node modules
import dotenv from 'dotenv';

dotenv.config();

// constants
const CORS_WHITELIST = ['http://localhost:3000'];

const config = {
  PORT: process.env.PORT!,
  NODE_ENV: process.env.NODE_ENV!,
  CORS_WHITELIST,
  LOGTAILL_SOURCE_TOKEN: process.env.LOGTAILL_SOURCE_TOKEN!,
  LOGTAIL_INGESTING_HOST: process.env.LOGTAIL_INGESTING_HOST!,
};

export default config;
