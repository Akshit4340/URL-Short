// custom modules
import config from '@/config';

//types
import type { CorsOptions } from 'cors';

// cors configuration

const corsOptions: CorsOptions = {
  // custom configuration
  origin: (origin, callback) => {
    if (!origin || config.CORS_WHITELIST.includes(origin)) {
      callback(null, true);
    } else if (config.NODE_ENV === 'development') {
      // In development, allow all origins
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
};

export default corsOptions;
