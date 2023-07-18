import { Provider } from "@nestjs/common";

import IORedis, { Redis } from "ioredis";

import { userSimilarity, userRatings } from "./redis.constants";

export const redisProviders: Provider[] = [
  {
    useFactory: (): Redis => {
      return new IORedis({
        host: "",
        port: 8080,
        password: "",
      });
    },
    provide: userSimilarity,
  },
  {
    useFactory: (): Redis => {
      return new IORedis({
        host: "",
        port: 8080,
        password: "",
      });
    },
    provide: userRatings,
  },
];
