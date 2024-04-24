import { Injectable } from "../configuration/container";
import { OrderServiceToken } from "../model";
import { ApiService } from "./api.service";

@Injectable(OrderServiceToken)
export class OrderService extends ApiService {
    
}