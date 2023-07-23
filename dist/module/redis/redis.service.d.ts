import Redis, { RedisKey } from "ioredis";
import { Observable } from "rxjs";
export interface IRedisSubscribeMessage {
    readonly message: string;
    readonly channel: string;
}
export declare class RedisService {
    private readonly subClient;
    private readonly pubClient;
    constructor(subClient: Redis, pubClient: Redis);
    fromEvent<T>(eventName: string): Observable<T>;
    publish(channel: string, value: unknown): Promise<number>;
    set(key: RedisKey, value: unknown, expire?: number): Promise<void>;
    get<T = any>(key: RedisKey): Promise<T>;
    hset(key: RedisKey, field: string, value: string): Promise<number>;
    hdel(key: RedisKey, ...fields: string[]): Promise<number>;
    hget(key: RedisKey, field: string): Promise<string>;
    hgetall(key: RedisKey): Promise<Record<string, string>>;
    del(key: RedisKey): Promise<number>;
    mget(keys: RedisKey[]): Promise<any[]>;
    mset(data: RedisKey[]): Promise<void>;
}
