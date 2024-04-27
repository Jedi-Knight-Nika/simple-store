import AppServer from "./configuration/server";

(() => {
  const server = new AppServer();

  server.start();

  process.on("SIGTERM", () => {
    console.info("SIGTERM signal received.");
    server.close();
  });
})();
