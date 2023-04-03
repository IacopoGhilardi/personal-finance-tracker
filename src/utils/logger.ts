import winston from 'winston';
import config from 'config';

const logger = winston.createLogger({
    level: config.get('log_level'),
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

export default logger;