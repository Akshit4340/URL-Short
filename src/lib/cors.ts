// custom modules
import config from '@/config';

//types
import type { CorsOptions } from 'cors';

// cors configuration

const corsOptions: CorsOptions = {
  // custom configuration
  origin: (origin, callback) => {
    if (origin && config.CORS_WHITELIST.includes(origin)) {
      callback(null, true);
    } else {
      // in development allow all requests
      callback(
        config.NODE_ENV === 'development'
          ? null
          : new Error('Not allowed by CORS'),
      );
    }
  },
};

export default corsOptions;
