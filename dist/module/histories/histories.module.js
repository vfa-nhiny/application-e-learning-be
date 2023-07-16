"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoriesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const histories_controller_1 = require("./histories.controller");
const histories_service_1 = require("./histories.service");
const history_schema_1 = require("./schemas/history.schema");
const logger_middleware_1 = require("../../common/middlewares/logger.middleware");
let HistoriesModule = class HistoriesModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes(histories_controller_1.HistoriesController);
    }
};
HistoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: "History", schema: history_schema_1.HistorySchema }])],
        controllers: [histories_controller_1.HistoriesController],
        providers: [histories_service_1.HistoriesService],
    })
], HistoriesModule);
exports.HistoriesModule = HistoriesModule;
//# sourceMappingURL=histories.module.js.map