// node modules
import { rateLimit } from 'express-rate-limit';

// custom modules
import config from '@/config';

//types
import { RateLimitRequestHandler, Options } from 'express-rate-limit';
type RateLimit = 'basic' | 'auth' | 'passwordReset';

// default rate limit config are applied to all types
const defaultOptions: Partial<Options> = {
  windowMs: config.WINDOW_MS, // 1 hour window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};

// map handling different rate limit types to their options

const rateLimitOptions = new Map<RateLimit, Partial<Options>>([
  ['basic', { ...defaultOptions, limit: 100 }], // 100 requests per windowMs for basic
  ['auth', { ...defaultOptions, limit: 10 }], // 10 requests per windowMs for auth routes
  ['passwordReset', { ...defaultOptions, limit: 3 }], // 3 requests per windowMs for password reset routes
]);

// function to get rate limit middleware based on type
const expressRateLimit = (type: RateLimit): RateLimitRequestHandler => {
  return rateLimit(rateLimitOptions.get(type)); // retrieve options from map and create middleware
};

export default expressRateLimit;
