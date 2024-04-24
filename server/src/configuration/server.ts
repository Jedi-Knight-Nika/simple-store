import express, { Express, Request, Response } from "express";
import { Server } from "http";
import {
  createExpressServer,
  getMetadataArgsStorage,
  RoutingControllersOptions,
  useContainer,
} from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { OpenAPIObject } from "openapi3-ts/dist/oas30";
import { serve, setup } from "swagger-ui-express";
import { join } from "path";

import config from "../config";
import { container } from "./container";

const setUpDocsRoutes = (app: Express, spec: OpenAPIObject) => {
  app.use("/docs", serve, setup(spec));
  app.get("/", (req: Request, res: Response) => {
    res.json(spec);
  });
};

const initOpenAPI = (app: Express, routingControllersOptions: RoutingControllersOptions) => {
  const spec: OpenAPIObject = routingControllersToSpec(getMetadataArgsStorage(), routingControllersOptions, {
    info: {
      description: config.OPEN_API.DESCRIPTION,
      title: config.OPEN_API.TITLE,
      version: config.OPEN_API.VERSION,
    },
  });

  setUpDocsRoutes(app, spec);
};

const initContainer = (): void => {
  useContainer(container, {
    fallbackOnErrors: true,
  });
};

const corsOptions = {
  origin: config.STAGE === "dev" ? "*" : ["http://alloweddomain.com"],
  methods: ["GET", "PUT", "POST", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const routingControllersOptions = <RoutingControllersOptions>{
  routePrefix: `/api/${config.API_VERSION}`,
  controllers: [join(__dirname, "../controller/*")],
  cors: corsOptions,
  defaults: {
    paramOptions: {
      required: true,
    },
  },
};

export const startServer = (): Server => {
  try {
    const app = createExpressServer(routingControllersOptions);
    app.use("/", express.static(join(__dirname, "../public")));

    initOpenAPI(app, routingControllersOptions);
    initContainer();

    return app.listen(config.PORT, () => {
      console.info(`Running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
};
