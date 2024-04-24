import { Injectable } from "../configuration/container";
import { CartServiceToken } from "../model";
import { ApiService } from "./api.service";

@Injectable(CartServiceToken)
export class CartService extends ApiService {
    
}