"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisProviders = void 0;
const ioredis_1 = require("ioredis");
const redis_constants_1 = require("./redis.constants");
exports.redisProviders = [
    {
        useFactory: () => {
            return new ioredis_1.default({
                host: "localhost",
                port: 6379,
                password: "",
            });
        },
        provide: redis_constants_1.REDIS_SUBSCRIBER_CLIENT,
    },
    {
        useFactory: () => {
            return new ioredis_1.default({
                host: "localhost",
                port: 6379,
                password: "",
            });
        },
        provide: redis_constants_1.REDIS_PUBLISHER_CLIENT,
    },
];
//# sourceMappingURL=redis.providers.js.map