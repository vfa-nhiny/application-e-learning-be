"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivestreamsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const livestreams_controller_1 = require("./livestreams.controller");
const livestreams_service_1 = require("./livestreams.service");
const livestream_schema_1 = require("./schemas/livestream.schema");
const logger_middleware_1 = require("../../common/middlewares/logger.middleware");
const users_service_1 = require("../users/users.service");
let LivestreamsModule = class LivestreamsModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes(livestreams_controller_1.LivestreamsController);
    }
};
LivestreamsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: "Livestream", schema: livestream_schema_1.LivestreamSchema }])],
        controllers: [livestreams_controller_1.LivestreamsController],
        providers: [livestreams_service_1.LivestreamsService, users_service_1.UsersService],
    })
], LivestreamsModule);
exports.LivestreamsModule = LivestreamsModule;
//# sourceMappingURL=livestreams.module.js.map