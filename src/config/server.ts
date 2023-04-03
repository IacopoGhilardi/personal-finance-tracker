import express, {Express} from 'express';
const app: Express = express();
process.env["NODE_CONFIG_DIR"] = __dirname;
import config from 'config';
import logger from '../utils/logger';
import routes from '../api/v1/routes';
const port: string | undefined = config.get('host.port') || '3000';
const apiVersion: string | undefined = config.get('host.api_version') || '1';

const initServer = () => {
    app.use(`/api/v${apiVersion}`, routes);

    app.listen(port, () => {
        logger.info(`Server run on port ${port}`);
    });
}

export default initServer;