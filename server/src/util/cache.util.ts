import { CACHE_STORAGE } from "../storage";

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
  readonly keyGenerator: (...props: unknown[]) => string = (...args: unknown[]): string => {
    return args.map((p) => p?.toString()).join("-");
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

export const Cacheable = (name: string, options?: Partial<CacheOptions>) => {
  const opts = new CacheOptions(options);

  return (_: unknown, methodName: string, descriptor: PropertyDescriptor): void => {
    const method = descriptor.value as (...args: unknown[]) => unknown;

    descriptor.value = async function (...props: unknown[]) {
      const key = opts.keyGenerator(...props) || "n/k";

      let methodCache = CACHE_STORAGE.get(name) as Map<string, unknown>;

      if (methodCache) {
        const cache = methodCache.get(key) as Cache<unknown>;

        if (cache && (opts.duration === undefined || cache.isValid(opts.duration, opts.durationUnit))) {
          return cache.value;
        }
      } else {
        methodCache = new Map<string, Cache<unknown>>();
        CACHE_STORAGE.set(name, methodCache);
      }

      methodCache.delete(key);

      const result: unknown = await method.apply(this, props);

      methodCache.set(key, new Cache(result));
      opts.log && console.info(`Cache added with name: ${name}, key: ${key}`);

      return result;
    };
  };
};

export const CacheEvict = (name: string, options?: Partial<CacheEvictOptions>) => {
  const opts = new CacheEvictOptions(options);

  return (_: unknown, methodName: string, descriptor: PropertyDescriptor): void => {
    const method = descriptor.value as (...args: unknown[]) => unknown;

    descriptor.value = async function (...props: unknown[]) {
      const res = await method.apply(this, props);
      if (opts.allEntries) {
        (CACHE_STORAGE as Map<string, Map<string, unknown>>).delete(name);

        opts.log && console.info(`Cache cleared with name: ${name}`);
      } else {
        const key = opts.keyGenerator(...props).toString();

        (CACHE_STORAGE?.get(name) as Map<string, unknown>)?.delete(key);
        opts.log && console.info(`Cache removed with name: ${name}, key: ${key}`);
      }

      return res;
    };
  };
};
