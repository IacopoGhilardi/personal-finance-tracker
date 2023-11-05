import express, {Express} from 'express';
import * as http from 'http';
const app: Express = express();
process.env["NODE_CONFIG_DIR"] = __dirname;
import config from 'config';
import logger from '../utils/logger';
import routes from '../api/v1/routes';
import passport from  './passport';


const port: string | undefined = config.get('host.port') || '3000';
const apiVersion: string | undefined = config.get('host.api_version') || '1';
let server: http.Server

export function initServer(): void {
    app.use(express.json());
    app.use(passport.initialize());
    app.use(`/api/v${apiVersion}`, routes);

    server = app.listen(port, () => {
        logger.info(`Server run on port ${port}`);
    });
}

export function  getServer(): http.Server {
    return server;
}

export function closeServerConnection(): void {
    server.close()
}