import { Injectable } from "../configuration/container";

import { CartServiceToken } from "../model";
import BaseApiService from "./base-api.service";

@Injectable(CartServiceToken)
export class CartService extends BaseApiService {}
