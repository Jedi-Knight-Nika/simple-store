import { JsonController } from "routing-controllers";

import { Injectable } from "../configuration/container";

// import { inject } from "../configuration/container";
// import { CartServiceToken } from "../model";
// import { CartService } from "../service";

@Injectable()
@JsonController("/cart")
export class CartController {
  // constructor(@inject(CartServiceToken) private readonly cartService: CartService) {}
  // public async getCart(req: Request, res: Response): Promise<void> {
  //     const cart = await this.cartService.getCart();
  //     res.json(cart);
  // }
  // public async addToCart(req: Request, res: Response): Promise<void> {
  //     const { productId, quantity } = req.body;
  //     const cart = await this.cartService.addToCart(productId, quantity);
  //     res.json(cart);
  // }
  // public async removeFromCart(req: Request, res: Response): Promise<void> {
  //     const { productId } = req.body;
  //     const cart = await this.cartService.removeFromCart(productId);
  //     res.json(cart);
  // }
  // public async checkout(req: Request, res: Response): Promise<void> {
  //     const order = await this.cartService.checkout();
  //     res.json(order);
  // }
}
