import { CacheStorage } from "../storage";

export const Cacheable = (keyPrefix: string = "", ttl: number = 300) => {
  return function (target: unknown, propertyName: string, descriptor: PropertyDescriptor): void {
    const method = descriptor.value;
    const cacheStorage = CacheStorage.getInstance();

    descriptor.value = async function (...args: any[]): Promise<unknown> {
      const cacheKey = `${keyPrefix}_${JSON.stringify(args)}`;

      let cached = cacheStorage.get(cacheKey);

      if (cached !== undefined) {
        console.info(`get from cache with key: ${cacheKey}`);
        return cached;
      }

      const result = await method.apply(this, args);

      console.info(`set into cache with key: ${cacheKey}`);
      cacheStorage.set(cacheKey, result, ttl);

      return result;
    };
  };
};

export const CacheEvict = (keyPrefix: string) => {
  return function (target: unknown, propertyName: string, descriptor: PropertyDescriptor): void {
    const method = descriptor.value;
    const cacheStorage = CacheStorage.getInstance();

    descriptor.value = async function (...args: any[]): Promise<unknown> {
      const cacheKey = `${keyPrefix}_${JSON.stringify(args)}`;

      console.info(`evict cache with key: ${cacheKey}`);
      cacheStorage.delete(cacheKey);

      return await method.apply(this, args);
    };
  };
};
