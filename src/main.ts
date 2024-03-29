import * as serverConfig from './config/server';
import { initConnection } from './config/database'

async function main() {
    await initConnection(1);
    serverConfig.initServer();
}

main()