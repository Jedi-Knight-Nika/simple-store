import { Get, JsonController } from "routing-controllers";

@JsonController("/products")
export class ProductController {
  @Get("/ping")
  async ping() {
    console.info("pong!");
    return "pong!"
  }
}
