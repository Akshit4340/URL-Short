// Node modules
import { Logger, transport, transports, createLogger, format } from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

// custom modules
import config from '@/config';

//initialize an array to hold all the configured winston transports
const transportation: transport[] = [];

// throws error when source token or ingesting host is not provided
if (!config.LOGTAIL_SOURCE_TOKEN || !config.LOGTAIL_INGESTING_HOST) {
  throw new Error('Logtail source token or ingesting host is not provided');
}

// create a logtail instance for sending structured logs to logtail

const logtail = new Logtail(config.LOGTAIL_SOURCE_TOKEN, {
  endpoint: config.LOGTAIL_INGESTING_HOST,
});

// in production push logtail transport to winston transport

if (config.NODE_ENV === 'production') {
  transportation.push(new LogtailTransport(logtail));
}

// destructure logging format utilities from winston
const { colorize, combine, timestamp, label, printf } = format;

// in development use terminal
if (config.NODE_ENV === 'development') {
  transportation.push(
    new transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'DD MMMM hh:mm:ss A' }),
        label({ label: 'development' }),
        printf(({ timestamp, label, level, message }) => {
          return `${timestamp} [${label}] ${level}: ${message}`;
        }),
      ),
    }),
  );
}

// create a winston logger instance
const logger: Logger = createLogger({
  transports: transportation,
});

export { logtail, logger };
