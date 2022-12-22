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
exports.CommentsService = void 0;
const mongoose_1 = require("mongoose");
const crypto = require("crypto");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
let CommentsService = class CommentsService {
    constructor(commentModel, userModel) {
        this.commentModel = commentModel;
        this.userModel = userModel;
    }
    async createNewComment(newComment) {
        const commentDto = new this.commentModel(newComment);
        return await commentDto.save();
    }
    async getCommentOfLesson(lessonId) {
        const commentDtoFromDb = await this.commentModel.findOne({ lessonId: lessonId });
        return commentDtoFromDb;
    }
    async getCommentOfLessonHaveUsername(lessonId) {
        const commentDtoFromDb = await this.commentModel.findOne({ lessonId: lessonId });
        if (!commentDtoFromDb)
            return null;
        const commentWithUsername = await Promise.all(commentDtoFromDb.comment.map(async (data) => {
            const user = await this.userModel.findOne({ userId: data.userId });
            return {
                username: user.name,
                commentId: data.commentId,
                userId: data.userId,
                clientId: data.clientId,
                content: data.content,
                createdAt: data.createdAt,
            };
        }));
        return commentWithUsername;
    }
    async createNewCommentLesson(lessonId, newCommentLesson) {
        const commentDto = await this.getCommentOfLesson(lessonId);
        commentDto.comment.push(Object.assign({ commentId: crypto.randomUUID() }, newCommentLesson));
        return await commentDto.save();
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("Comment")),
    __param(1, (0, mongoose_2.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_1.Model, mongoose_1.Model])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map