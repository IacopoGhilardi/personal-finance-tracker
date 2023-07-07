import initServer from './config/server';
import { initConnection } from './config/database'

async function main() {
    await initConnection();
    initServer();
}


main()