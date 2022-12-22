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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let ChatGateway = class ChatGateway {
    constructor() {
        this.rooms = new Map();
        this.clients = new Map();
    }
    handleMessage(client, message) {
        console.log("message", message);
        console.log("room id:", message.room);
        this.server.to(message.room).emit("chatToClient", message);
    }
    handleRoomJoin(client, roomInfo) {
        const { roomId, username } = roomInfo;
        console.log(roomInfo);
        const room = this.rooms.get(roomId);
        if (!room) {
            const users = [{ clientId: client.id, username: roomInfo.username }];
            console.log("users: ", users);
            this.rooms.set(roomId, users);
        }
        else {
            const user = {
                clientId: client.id,
                username: roomInfo.username,
            };
            console.log("user: ", user);
            room.push(user);
        }
        client.join(roomId);
        client.emit("joinedRoom", roomId);
        this.server.to(roomId).emit("onUserOnline", this.rooms.get(roomId));
        this.clients.set(client.id, { client, username });
        console.log("join room", this.rooms.get(roomId));
    }
    handleRoomLeave(client, roomId) {
        client.emit("leftRoom", roomId);
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        if (room.length) {
            const browser = this.clients.get(client.id);
            const leaveUser = browser["username"];
            const newUsers = room.filter(user => user.username !== leaveUser);
            this.rooms.set(roomId, newUsers);
            console.log("room", this.rooms.get(roomId));
            client.to(roomId).emit("userLeaveRoom", leaveUser);
        }
        else {
            this.rooms.delete(roomId);
        }
    }
    handleGetMessageOfRoom(client, roomId) {
        client.leave(roomId);
        client.emit("messageOfRoom", roomId);
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        if (room.length) {
            const browser = this.clients.get(client.id);
            const leaveUser = browser["username"];
            const newUsers = room.filter(user => user.username !== leaveUser);
            this.rooms.set(roomId, newUsers);
            console.log("room", this.rooms.get(roomId));
            client.to(roomId).emit("userLeaveRoom", leaveUser);
        }
        else {
            this.rooms.delete(roomId);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("chatToServer"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("joinRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleRoomJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("leaveRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleRoomLeave", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("messageOfRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleGetMessageOfRoom", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map