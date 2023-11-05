import express, {Express} from 'express';
const app: Express = express();
process.env["NODE_CONFIG_DIR"] = __dirname;
import config from 'config';
import logger from '../utils/logger';
import routes from '../api/v1/routes';
import passport from  './passport';
const port: string | undefined = config.get('host.port') || '3000';
const apiVersion: string | undefined = config.get('host.api_version') || '1';

const initServer = () => {
    app.use(express.json());
    app.use(passport.initialize());
    app.use(`/api/v${apiVersion}`, routes);

    app.listen(port, () => {
        logger.info(`Server run on port ${port}`);
    });
}

export default initServer;