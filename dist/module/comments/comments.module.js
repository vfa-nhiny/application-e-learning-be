"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const comments_controller_1 = require("./comments.controller");
const comments_service_1 = require("./comments.service");
const comment_schema_1 = require("./schemas/comment.schema");
const logger_middleware_1 = require("../../common/middlewares/logger.middleware");
const comment_gateway_1 = require("../../gateway/comment.gateway");
const user_schema_1 = require("../users/schemas/user.schema");
let CommentsModule = class CommentsModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes(comments_controller_1.CommentsController);
    }
};
CommentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "Comment", schema: comment_schema_1.CommentSchema },
                { name: "User", schema: user_schema_1.UserSchema },
            ]),
        ],
        controllers: [comments_controller_1.CommentsController],
        providers: [comments_service_1.CommentsService, comment_gateway_1.CommentGateway],
    })
], CommentsModule);
exports.CommentsModule = CommentsModule;
//# sourceMappingURL=comments.module.js.map