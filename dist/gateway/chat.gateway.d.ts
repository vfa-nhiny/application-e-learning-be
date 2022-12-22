import { Socket, Server } from "socket.io";
export declare class ChatGateway {
    private rooms;
    private clients;
    server: Server;
    handleMessage(client: Socket, message: {
        sender: string;
        room: string;
        message: string;
    }): void;
    handleRoomJoin(client: Socket, roomInfo: {
        roomId: string;
        username: string;
    }): void;
    handleRoomLeave(client: Socket, roomId: string): void;
    handleGetMessageOfRoom(client: Socket, roomId: string): void;
}
