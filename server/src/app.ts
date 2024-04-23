import { Server } from "http";

import { startServer } from "./configuration/Server";

(async () => {
  const server: Server = startServer();

  process.on("SIGTERM", () => {
    console.info("SIGTERM signal received.");
    
    server.close();
  });
})();
