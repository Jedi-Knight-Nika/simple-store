import { Server } from "http";

import { startServer } from "./configuration/server";

(async () => {
  const server: Server = startServer();

  process.on("SIGTERM", () => {
    console.info("SIGTERM signal received.");

    server.close();
  });
})();
