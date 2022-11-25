import { Injectable } from '@angular/core';

import { Subject, BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Room, User, Event, Action} from '../models';
import { CryptoService } from './crypto.service';
import { WebSocketService } from './webSocket.service';

import { Socket } from 'ngx-socket-io';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

    private apiUrl = environment.SERVER_URL;

    newMessage = this.socket.fromEvent<Document>('messageReceived');

    // public messages!: Subject<any>;
    // private channel!: Room;
    // private user!: User;
    // private peers: User[] = [];

    constructor(
      private socket: Socket,
      private authService: AuthService,
      private http: HttpClient,
    ) {}

    authorizationHeaders(): HttpHeaders {
      return new HttpHeaders()
          .set('Authorization', 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwdWJsaWNLZXlCYXNlNjQiOiJnZmRnbGcnZmxoIiwicHJpdmF0ZUtleUJhc2U2NCI6ImZoa2ZoZGxoa2RqaCIsImlhdCI6MTY2OTM1NDk4NywiZXhwIjoxNjY5Mzk4MTg3fQ.jcI-HMSIJ9zvzTunV0I5wYwlIaMna8Sq7GW-64mKh-ti8ngl1mZ8T1o_ArWbJ76PJkrIpB2cdeQVzHydGulKYw');
    }

    openRoom(name: string): void {
      this.socket.emit('openRoom', name);
    }

    closeRoom(name: string): void {
      this.socket.emit('openRoom', name);
    }

    sendMessage(message: any): void {
      this.socket.emit('sendMessage', message);
      // this.userService.createNewUser
    }

    getMessage() {
      return this.socket.fromEvent('message').pipe(map((data: any) => data.msg));
    }

    getMyChat(): any {
      const headers = this.authorizationHeaders();
      return this.http.get<any>(this.apiUrl + 'chat', { headers: headers } ).pipe(
        map(r => r.result )
      );
    }

    createNewChat(name: string, password: string): any {
        const headers = this.authorizationHeaders();
        return this.http.post<any>(this.apiUrl + 'chat/create', { name, password }, { headers: headers } ).pipe(
          map(r => r.result )
        );
    }

    joinNewChat(name: string, password: string): any {
      const headers = this.authorizationHeaders();
      return this.http.put<any>(this.apiUrl + 'chat/join', { name, password }, { headers: headers } ).pipe(
        map(r => r.result )
      );
    }

    leaveChat(name: string): any {
      const headers = this.authorizationHeaders();
      return this.http.put<any>(this.apiUrl + 'chat/leave', { name }, { headers: headers } ).pipe(
        map(r => r.result )
      );
    }

    sendNewMessage(newMessage: any): any {
      const headers = this.authorizationHeaders();
        return this.http.post<any>(this.apiUrl + 'chat/message', newMessage, { headers: headers } ).pipe(
          map(r => r.result )
        );
    }

    getChatMessage(name: string): any {
      const params = new HttpParams()
        .set('chatName', name);

      const headers = this.authorizationHeaders();
      return this.http.get<any>(this.apiUrl + 'chat/message', { headers: headers, params: params } ).pipe(
        map(r => r.result )
      );
    }

    // constructor(private wsService: WebSocketService,
    //             private cryptoService: CryptoService) { }

    // public connect() {
    //   console.log(environment.SERVER_URL);
    //   this.messages = <Subject<any>>this.wsService
    //     .connect(environment.SERVER_URL)
    //     .pipe(map( response => JSON.parse(response.data) ) );
    // }

    // public setRoom(channel: Room) {
    //   this.channel = channel;
    // }

    // public getRoom() {
    //   return this.channel;
    // }

    // public setInitialPeers(peers: User[]) {
    //   this.peers = peers;
    // }

    // public getInitialPeers() {
    //   return this.peers;
    // }

    // public setUser(user: User) {
    //   this.user = user;
    // }

    // public getUser() {
    //   return this.user;
    // }

    // public close() {
    //   this.wsService.close();
    // }

    // public send(message: any) {
    //   this.messages.next(message);
    // }

    // public sendBrowserNotification (user: string, type: string) {

    //   let notificationMsj!: string;

    //   if (document.hasFocus()) {
    //     return;
    //   }

    //   switch (type) {
    //     case Event.MESSAGE_RECEIVED : {
    //       notificationMsj = `New message from ${user}`;
    //       break;
    //     }
    //     case Event.PEER_JOINED: {
    //       notificationMsj = `${user} joined the channel`;
    //       break;
    //     }
    //     case Event.PEER_LEFT: {
    //       notificationMsj = `${user} left the channel`;
    //       break;
    //     }
    //   }

    //   if (!('Notification' in window)) {
    //     return;
    //   } else if (Notification.permission === 'granted') {
    //     const _ = new Notification(notificationMsj);
    //   }
    // }

    // public JoinRoom(user: User,  room: Room): void {
    //  const message = {
    //     type : Action.JOIN,
    //     data : {
    //       channel : room.name,
    //       secret : room.sha256Secret,
    //       name : {
    //         name : user.name,
    //         key: user.base64EncodedPublicKey
    //       }
    //     }
    //   };

    //   this.send(message);
    // }

    // public sendChatMessage(messageContent: string) {
    //   let message: any;

    //   this.peers.forEach(peer => {
    //     this.cryptoService
    //       .encrypt(messageContent, peer.publicKey!)
    //       .then(encryptedMessage => {
    //         message = {
    //           type: Action.SENDMESSAGE,
    //           data: {
    //             to: peer.name,
    //             message: encryptedMessage
    //           }
    //         };
    //         this.send(message);
    //       });
    //   });
    // }
}