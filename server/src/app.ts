import { startServer } from "./configuration/server";
import { Server } from "http";


(async () => {
    const server: Server = startServer();


    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received.');
        server.close();
    });
})();
