// node modules
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

// custom modules
import config from '@/config';
import router from '@/routes';
import corsOptions from '@/lib/cors';
import { logger, logtail } from '@/lib/winston';

// app initialization
const app = express();

// use cors
app.use(cors(corsOptions));

// secure headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// set the public folder to serve static files
app.use(express.static('public'));

// parse cookies
app.use(cookieParser());

// compress response bodies
app.use(compression());

// immediately invoke async function to connect to initialize app
(async (): Promise<void> => {
  try {
    // register application routes under the root path
    app.use('/', router);

    // start of the server and listening to the port
    app.listen(config.PORT, () => {
      logger.info(`Server is running at http://localhost:${config.PORT}`);
    });
  } catch (error) {
    // log the error if the server fails to start
    logger.error('failed to start the server', error);

    // in production environment exit the process with failure
    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
})();

// handle graceful shutdown on sigint and sigterm

const serverTermination = async (signal: NodeJS.Signals): Promise<void> => {
  try {
    logger.info(`Received ${signal}. Closing server...`);
    // perform any cleanup or shutdown tasks here
    logger.info('Server closed gracefully');
    //flush any logs remaining in logtail before exiting
    await logtail.flush();
    // exit the process
    process.exit(0);
  } catch (error) {
    logger.error('Error during server shutdown', error);
  }
};

process.on('SIGINT', serverTermination);
process.on('SIGTERM', serverTermination);
