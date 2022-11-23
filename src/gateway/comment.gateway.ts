import { MessageBody, WebSocketServer, SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { CommentsService } from "src/module/comments/comments.service";
import { CreateCommentDto } from "src/module/comments/dto/create-comment.dto";

@WebSocketGateway()
export class CommentGateway {
  private rooms = new Map();
  private clients = new Map();

  @WebSocketServer()
  server: Server;

  constructor(private readonly commentService: CommentsService) {}

  @SubscribeMessage("chatToServer")
  async handleMessage(
    client: Socket,
    message: {
      lessonId: string;
      comment: {
        userId: string;
        image: string;
        content: string;
      };
    },
  ) {
    // message["stamp"] = format(localCurrentTime, "YYYY-MM-DD HH:mm:ss");
    console.log("message", message);
    console.log("room id:", message.lessonId);
    const commentDtoFromDb = await this.commentService.getCommentOfLesson(message.lessonId);
    const commentDto = {
      userId: message.comment.userId,
      clientId: client.id,
      image: message.comment.image ? message.comment.image : "",
      content: message.comment.content,
      createdAt: new Date(),
    };
    if (commentDtoFromDb) {
      const comment = await this.commentService.createNewCommentLesson(message.lessonId, commentDto);

      console.log("comment added: ", comment);
    } else {
      const newCommentDto = new CreateCommentDto({
        lessonId: message.lessonId,
        comment: [commentDto],
      });
      await this.commentService.createNewComment(newCommentDto);
    }

    this.server.to(message.lessonId).emit("chatToClient", message);
  }

  @SubscribeMessage("joinRoom")
  handleRoomJoin(client: Socket, roomInfo: { roomId: string; username: string }) {
    const { roomId, username } = roomInfo;
    console.log(roomInfo);
    const room = this.rooms.get(roomId);
    if (!room) {
      const users = [{ clientId: client.id, username: roomInfo.username }];
      console.log("users: ", users);

      this.rooms.set(roomId, users);
    } else {
      const user = {
        clientId: client.id,
        username: roomInfo.username,
      };
      console.log("user: ", user);
      room.push(user);
    }
    // Client join room
    client.join(roomId);
    client.emit("joinedRoom", roomId);
    // Announcement for user in room know list user in room;
    this.server.to(roomId).emit("onUserOnline", this.rooms.get(roomId));
    // Set clients user
    this.clients.set(client.id, { client, username });
    console.log("join room", this.rooms.get(roomId));
  }

  @SubscribeMessage("leaveRoom")
  handleRoomLeave(client: Socket, roomId: string) {
    client.emit("leftRoom", roomId);
    const room = this.rooms.get(roomId);
    if (!room) {
      return;
    }
    // filter user in room
    if (room.length) {
      const browser = this.clients.get(client.id);

      const leaveUser = browser["username"];
      const newUsers = room.filter(user => user.username !== leaveUser);
      this.rooms.set(roomId, newUsers);
      console.log("room", this.rooms.get(roomId));
      client.to(roomId).emit("userLeaveRoom", leaveUser);
    } else {
      // if no users in room then delete room
      this.rooms.delete(roomId);
    }
  }

  @SubscribeMessage("messageOfRoom")
  handleGetMessageOfRoom(client: Socket, roomId: string) {
    client.leave(roomId);
    client.emit("messageOfRoom", roomId);
    const room = this.rooms.get(roomId);
    if (!room) {
      return;
    }
    // filter user in room
    if (room.length) {
      const browser = this.clients.get(client.id);

      const leaveUser = browser["username"];
      const newUsers = room.filter(user => user.username !== leaveUser);
      this.rooms.set(roomId, newUsers);
      console.log("room", this.rooms.get(roomId));
      client.to(roomId).emit("userLeaveRoom", leaveUser);
    } else {
      // if no users in room then delete room
      this.rooms.delete(roomId);
    }
  }
}
