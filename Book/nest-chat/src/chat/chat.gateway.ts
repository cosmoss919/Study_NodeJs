import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({namespace: 'chat'})
export class ChatGateway {
    @WebSocketServer() server: Server;  // 웹소켓 서버 인스턴스 선언

    @SubscribeMessage('message')  // message 이벤트 구독
    handleMessage(socket: Socket, data: any): void {
        const {message, nickname} = data;
        // 접속한 클라이언트들에게 메시지 전송
        socket.broadcast.emit('message', `${nickname}: ${message}`);
    }
}

@WebSocketGateway({namespace: 'room'})
export class RoomGateway {
    rooms = [];

    @WebSocketServer() server: Server;

    @SubscribeMessage('createRoom')
    handleMessage(@MessageBody() data) {
        const { nickname, room } = data;
        this.rooms.push(room);
        this.server.emit('rooms', this.rooms);
    }
}

