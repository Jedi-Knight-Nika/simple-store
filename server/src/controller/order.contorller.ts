import { JsonController } from "routing-controllers";

// import { inject } from "../configuration/container";
// import { OrderServiceToken } from "../model";
// import { OrderService } from "../service";

@JsonController('/order')
export class OrderController {
    // constructor(@inject(OrderServiceToken) private readonly orderService: OrderService) {}
    
    // public async createOrder(req: Request, res: Response) {
    //     const order = await this.orderService.createOrder(req.body);
    //     res.json(order);
    // }
    
    // public async getOrder(req: Request, res: Response) {
    //     const order = await this.orderService.getOrder(req.params.id);
    //     res.json(order);
    // }
    
    // public async getOrders(req: Request, res: Response) {
    //     const orders = await this.orderService.getOrders();
    //     res.json(orders);
    // }
    
    // public async updateOrder(req: Request, res: Response) {
    //     const order = await this.orderService.updateOrder(req.params.id, req.body);
    //     res.json(order);
    // }
    
    // public async deleteOrder(req: Request, res: Response) {
    //     const order = await this.orderService.deleteOrder(req.params.id);
    //     res.json(order);
    // }
}