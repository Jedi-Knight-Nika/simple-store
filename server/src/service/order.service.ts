import { Injectable } from "../configuration/container";
import { OrderServiceToken } from "../model";
import { BaseApiService } from "./base-api.service";

@Injectable(OrderServiceToken)
export class OrderService extends BaseApiService {}
