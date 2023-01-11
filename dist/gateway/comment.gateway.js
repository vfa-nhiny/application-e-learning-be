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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const comments_service_1 = require("../module/comments/comments.service");
const create_comment_dto_1 = require("../module/comments/dto/create-comment.dto");
let CommentGateway = class CommentGateway {
    constructor(commentService) {
        this.commentService = commentService;
        this.rooms = new Map();
        this.clients = new Map();
    }
    async handleMessage(client, message) {
        const commentDtoFromDb = await this.commentService.getCommentOfLesson(message.lessonId);
        const commentDto = {
            userId: message.comment.userId,
            clientId: client.id,
            image: message.comment.image ? message.comment.image : "",
            content: message.comment.content,
            createdAt: new Date(),
        };
        if (commentDtoFromDb) {
            await this.commentService.createNewCommentLesson(message.lessonId, commentDto);
        }
        else {
            const newCommentDto = new create_comment_dto_1.CreateCommentDto({
                lessonId: message.lessonId,
                comment: [commentDto],
            });
            await this.commentService.createNewComment(newCommentDto);
        }
        this.server.to(message.lessonId).emit("chatToClient", {
            createdAt: commentDto.createdAt,
            userId: message.comment.userId,
            username: message.comment.username,
            content: message.comment.content,
        });
    }
    handleLessonJoin(client, lessonInfo) {
        const { lessonId, userId } = lessonInfo;
        console.log(lessonInfo);
        const room = this.rooms.get(lessonId);
        if (!room) {
            const users = [{ clientId: client.id, userId: lessonInfo.userId }];
            console.log("users: ", users);
            this.rooms.set(lessonId, users);
        }
        else {
            const user = {
                clientId: client.id,
                userId: lessonInfo.userId,
            };
            console.log("user: ", user);
            room.push(user);
        }
        client.join(lessonId);
        client.emit("joinedLesson", lessonId);
        this.server.to(lessonId).emit("onUserOnline", this.rooms.get(lessonId));
        this.clients.set(client.id, { client, userId });
        console.log("join room", this.rooms.get(lessonId));
    }
    handleLessonLeave(client, lessonId) {
        client.emit("leftLesson", lessonId);
        const room = this.rooms.get(lessonId);
        if (!room) {
            return;
        }
        if (room.length) {
            const browser = this.clients.get(client.id);
            const leaveUser = browser["userId"];
            const newUsers = room.filter(user => user.userId !== leaveUser);
            this.rooms.set(lessonId, newUsers);
            console.log("room", this.rooms.get(lessonId));
            client.to(lessonId).emit("userLeaveLesson", leaveUser);
        }
        else {
            this.rooms.delete(lessonId);
        }
    }
    handleGetMessageOfLesson(client, lessonId) {
        client.leave(lessonId);
        client.emit("messageOfLesson", lessonId);
        const room = this.rooms.get(lessonId);
        if (!room) {
            return;
        }
        if (room.length) {
            const browser = this.clients.get(client.id);
            const leaveUser = browser["userId"];
            const newUsers = room.filter(user => user.userId !== leaveUser);
            this.rooms.set(lessonId, newUsers);
            console.log("room", this.rooms.get(lessonId));
            client.to(lessonId).emit("userLeaveLesson", leaveUser);
        }
        else {
            this.rooms.delete(lessonId);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CommentGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("chatToServer"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], CommentGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("joinLesson"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], CommentGateway.prototype, "handleLessonJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("leaveLesson"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], CommentGateway.prototype, "handleLessonLeave", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("messageOfLesson"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], CommentGateway.prototype, "handleGetMessageOfLesson", null);
CommentGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentGateway);
exports.CommentGateway = CommentGateway;
//# sourceMappingURL=comment.gateway.js.map