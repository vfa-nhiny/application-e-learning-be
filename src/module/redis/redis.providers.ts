import { Provider } from "@nestjs/common";

import IORedis, { Redis } from "ioredis";

import { REDIS_SUBSCRIBER_CLIENT, REDIS_PUBLISHER_CLIENT } from "./redis.constants";

export const redisProviders: Provider[] = [
  {
    useFactory: (): Redis => {
      return new IORedis({
        host: "localhost",
        port: 6379,
        password: "",
      });
    },
    provide: REDIS_SUBSCRIBER_CLIENT,
  },
  {
    useFactory: (): Redis => {
      return new IORedis({
        host: "localhost",
        port: 6379,
        password: "",
      });
    },
    provide: REDIS_PUBLISHER_CLIENT,
  },
];
