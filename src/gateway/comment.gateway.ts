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
        username: string;
        avatar: string;
        image: string;
        content: string;
      };
    },
  ) {
    // message["stamp"] = format(localCurrentTime, "YYYY-MM-DD HH:mm:ss");
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
    } else {
      const newCommentDto = new CreateCommentDto({
        lessonId: message.lessonId,
        comment: [commentDto],
      });
      await this.commentService.createNewComment(newCommentDto);
    }
    this.server.to(message.lessonId).emit("chatToClient", {
      createAt: commentDto.createdAt,
      userId: message.comment.userId,
      username: message.comment.username,
      content: message.comment.content,
    });
  }

  @SubscribeMessage("joinLesson")
  handleLessonJoin(client: Socket, lessonInfo: { lessonId: string; userId: string }) {
    const { lessonId, userId } = lessonInfo;
    console.log(lessonInfo);
    const room = this.rooms.get(lessonId);
    if (!room) {
      const users = [{ clientId: client.id, userId: lessonInfo.userId }];
      console.log("users: ", users);

      this.rooms.set(lessonId, users);
    } else {
      const user = {
        clientId: client.id,
        userId: lessonInfo.userId,
      };
      console.log("user: ", user);
      room.push(user);
    }
    // Client join room
    client.join(lessonId);
    client.emit("joinedLesson", lessonId);
    // Announcement for user in room know list user in room;
    this.server.to(lessonId).emit("onUserOnline", this.rooms.get(lessonId));
    // Set clients user
    this.clients.set(client.id, { client, userId });
    console.log("join room", this.rooms.get(lessonId));
  }

  @SubscribeMessage("leaveLesson")
  handleLessonLeave(client: Socket, lessonId: string) {
    client.emit("leftLesson", lessonId);
    const room = this.rooms.get(lessonId);
    if (!room) {
      return;
    }
    // filter user in room
    if (room.length) {
      const browser = this.clients.get(client.id);

      const leaveUser = browser["userId"];
      const newUsers = room.filter(user => user.userId !== leaveUser);
      this.rooms.set(lessonId, newUsers);
      console.log("room", this.rooms.get(lessonId));
      client.to(lessonId).emit("userLeaveLesson", leaveUser);
    } else {
      // if no users in room then delete room
      this.rooms.delete(lessonId);
    }
  }

  @SubscribeMessage("messageOfLesson")
  handleGetMessageOfLesson(client: Socket, lessonId: string) {
    client.leave(lessonId);
    client.emit("messageOfLesson", lessonId);
    const room = this.rooms.get(lessonId);
    if (!room) {
      return;
    }
    // filter user in room
    if (room.length) {
      const browser = this.clients.get(client.id);
      const leaveUser = browser["userId"];
      const newUsers = room.filter(user => user.userId !== leaveUser);
      this.rooms.set(lessonId, newUsers);
      console.log("room", this.rooms.get(lessonId));
      client.to(lessonId).emit("userLeaveLesson", leaveUser);
    } else {
      // if no users in room then delete room
      this.rooms.delete(lessonId);
    }
  }
}
