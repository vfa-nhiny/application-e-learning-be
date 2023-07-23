"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const redis_constants_1 = require("./redis.constants");
let RedisService = class RedisService {
    constructor(subClient, pubClient) {
        this.subClient = subClient;
        this.pubClient = pubClient;
    }
    fromEvent(eventName) {
        this.subClient.subscribe(eventName);
        return new rxjs_1.Observable((observer) => this.subClient.on("message", (channel, message) => observer.next({ channel, message }))).pipe((0, operators_1.filter)(({ channel }) => channel === eventName), (0, operators_1.map)(({ message }) => JSON.parse(message)));
    }
    async publish(channel, value) {
        return new Promise((resolve, reject) => {
            return this.pubClient.publish(channel, JSON.stringify(value), (error, reply) => {
                if (error) {
                    return reject(error);
                }
                return resolve(reply);
            });
        });
    }
    async set(key, value, expire = redis_constants_1.REDIS_EXPIRE_TIME_IN_SECONDS) {
        await this.pubClient.set(key, JSON.stringify(value), "EX", expire);
    }
    async get(key) {
        const res = await this.pubClient.get(key);
        return (await JSON.parse(res));
    }
    async hset(key, field, value) {
        return await this.pubClient.hset(key, field, value);
    }
    async hdel(key, ...fields) {
        return await this.pubClient.hdel(key, ...fields);
    }
    async hget(key, field) {
        return await this.pubClient.hget(key, field);
    }
    async hgetall(key) {
        return await this.pubClient.hgetall(key);
    }
    async del(key) {
        return await this.pubClient.del(key);
    }
    async mget(keys) {
        const res = await this.pubClient.mget(keys);
        return res.map(data => JSON.parse(data || null));
    }
    async mset(data) {
        await this.pubClient.mset(data);
    }
};
RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(redis_constants_1.REDIS_SUBSCRIBER_CLIENT)),
    __param(1, (0, common_1.Inject)(redis_constants_1.REDIS_PUBLISHER_CLIENT)),
    __metadata("design:paramtypes", [ioredis_1.default, ioredis_1.default])
], RedisService);
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map