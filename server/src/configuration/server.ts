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

export default class AppServer {
  private app: Express;

  constructor() {
    this.app = this.createserver();
    this.initContainer();
    this.initOpenAPI();
    this.serveStaticFiles();
  }

  private createserver(): Express {
    return createExpressServer(this.routingControllersOptions) as Express;
  }

  private setUpDocsRoutes(spec: OpenAPIObject): void {
    this.app.use("/docs", serve, setup(spec));
    this.app.get("/", (req: Request, res: Response) => {
      res.json(spec);
    });
  }

  private initOpenAPI(): void {
    const spec: OpenAPIObject = routingControllersToSpec(getMetadataArgsStorage(), this.routingControllersOptions, {
      info: {
        description: config.OPEN_API.DESCRIPTION,
        title: config.OPEN_API.TITLE,
        version: config.OPEN_API.VERSION,
      },
    });

    this.setUpDocsRoutes(spec);
  }

  private initContainer(): void {
    useContainer(container, {
      fallbackOnErrors: true,
    });
  }

  private get routingControllersOptions(): RoutingControllersOptions {
    return {
      routePrefix: `/api/${config.API_VERSION}`,
      controllers: [join(__dirname, "../controller/*")],
      cors: this.corsOptions,
      defaults: {
        paramOptions: {
          required: true,
        },
      },
    };
  }

  private get corsOptions() {
    return {
      origin: config.STAGE === "dev" ? "*" : ["http://alloweddomain.com"],
      methods: ["GET", "PUT", "POST", "DELETE"],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };
  }

  private serveStaticFiles(): void {
    this.app.use("/", express.static(join(__dirname, "../public")));
  }

  public start(): Server {
    return this.app.listen(config.PORT, () => {
      console.info(`Running on port ${config.PORT}`);
    });
  }

  public close(): void {
    console.info("Closing server...");
    process.exit(0);
  }
}
