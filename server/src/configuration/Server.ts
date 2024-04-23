import express from "express";
import { createExpressServer, RoutingControllersOptions } from "routing-controllers";
import * as path from "path";
// import * as swaggerUiExpress from "swagger-ui-express";

import config from "../config";
import { Server } from "http";


const routingControllersOptions = <RoutingControllersOptions>{
  routePrefix: "/api/v1",
  controllers: [__dirname + "/../controller/*"],
  cors: {
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
  defaults: {
    paramOptions: {
      required: true,
    },
  },
};

export const startServer = (): Server => {
  const app = createExpressServer(routingControllersOptions);
  app.use("/", express.static(path.join(__dirname, "../public")));


  return app.listen(config.PORT, () => {
    console.info(`Running on port ${config.PORT}`);
  });
};
