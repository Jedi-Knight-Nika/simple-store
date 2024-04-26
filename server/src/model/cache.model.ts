import moment, { DurationInputArg1, DurationInputArg2, Moment } from "moment";

export enum CacheName {
  WIDGET_PRODUCTS = "widget_products",
  PRODUCT_LIST = "product_list",
  PRODUCT_DETAILS = "product_details",
}

export class Cache<T> {
  value: T;
  date: Moment;

  constructor(value: T) {
    this.value = value;
    this.date = moment();
  }

  isValid(duration: DurationInputArg1, unit: DurationInputArg2) {
    return moment().subtract(duration, unit).isBefore(this.date);
  }
}

abstract class CacheBaseOptions {
  readonly log: boolean = true;
  readonly keyGenerator: (...props: any) => string = (...args: any[]) => {
    return args.map((p) => p.toString()).join("-");
  };
}

export class CacheOptions extends CacheBaseOptions {
  readonly duration?: number;
  readonly durationUnit: DurationInputArg2 = "minute";

  constructor(source?: Partial<CacheOptions>) {
    super();
    Object.assign(this, source);
  }
}

export class CacheEvictOptions extends CacheBaseOptions {
  readonly allEntries: boolean = false;

  constructor(source?: Partial<CacheEvictOptions>) {
    super();
    Object.assign(this, source);
  }
}
