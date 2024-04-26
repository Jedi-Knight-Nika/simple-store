import { Cache, CacheEvictOptions, CacheOptions } from "../model";
import { CACHE_STORAGE } from "../storage";

export const Cacheable = (name: string, options?: Partial<CacheOptions>) => {
  const opts = new CacheOptions(options);

  return (_: unknown, methodName: string, descriptor: PropertyDescriptor): void => {
    let method = descriptor.value;

    descriptor.value = async function (...props: unknown[]) {
      const key = opts.keyGenerator(...props) || "n/k";

      let methodCache = CACHE_STORAGE.get(name);

      if (methodCache) {
        const cache = methodCache.get(key);

        if (cache && (opts.duration === undefined || cache.isValid(opts.duration, opts.durationUnit))) {
          return cache.value;
        }
      } else {
        methodCache = new Map<string, Cache<any>>();
        CACHE_STORAGE.set(name, methodCache);
      }

      methodCache.delete(key);

      const result = await method.apply(this, arguments);

      methodCache.set(key, new Cache(result));
      opts.log && console.info(`Cache added with name: ${name}, key: ${key}`);

      return result;
    };
  };
};

export const CacheEvict = (name: string, options?: Partial<CacheEvictOptions>) => {
  const opts = new CacheEvictOptions(options);

  return (_: any, methodName: string, descriptor: PropertyDescriptor): void => {
    let method = descriptor.value;

    descriptor.value = async function (...props: any[]) {
      const res = await method.apply(this, arguments);
      if (opts.allEntries) {
        CACHE_STORAGE.delete(name);

        opts.log && console.info(`Cache cleared with name: ${name}`);
      } else {
        const key = opts.keyGenerator(...props).toString();

        CACHE_STORAGE?.get(name)?.delete(key);
        opts.log && console.info(`Cache removed with name: ${name}, key: ${key}`);
      }

      return res;
    };
  };
};
