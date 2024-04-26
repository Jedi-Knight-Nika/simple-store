interface Cache {
  value: unknown;
  expiresAt: number;
}

export class CacheStorage {
  private static instance: CacheStorage;

  #cache: Map<string, Cache> = new Map();

  private constructor() {}

  public static getInstance(): CacheStorage {
    if (!CacheStorage.instance) {
      CacheStorage.instance = new CacheStorage();
    }
    return CacheStorage.instance;
  }

  public get(key: string): unknown {
    const entry = this.#cache.get(key);

    if (!entry) {
      return;
    }

    if (entry.expiresAt < Date.now()) {
      this.#cache.delete(key);
      return;
    }

    return entry.value;
  }

  public set(key: string, value: unknown, ttl: number): void {
    const expiresAt = Date.now() + ttl * 1000;
    this.#cache.set(key, { value, expiresAt });
  }

  public delete(key: string): void {
    this.#cache.delete(key);
  }

  public clear(): void {
    this.#cache.clear();
  }
}
