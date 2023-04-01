import winston from "winston";
import config from 'config';
const logLevel: string = config.get('log_level');

const logger = winston.createLogger({
    level: logLevel,
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ]
})

export default logger;