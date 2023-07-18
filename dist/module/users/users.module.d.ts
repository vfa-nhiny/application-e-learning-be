import { NestModule, MiddlewareConsumer } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
export declare class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
export declare class RedisCoreModule {
    private readonly moduleRef;
    constructor(moduleRef: ModuleRef);
}
