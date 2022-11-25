import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { User, Event, Room } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { ChatDialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    private _msgSub!: Subscription; 

    chatName = 'CHAT NAME';

    messageContent: string = '';

    user: any = {
        username: 'test'
    }

    token = [
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjFQT05HIiwicHVibGljS2V5QmFzZTY0IjoiZ2ZkZ2xnJ2ZsaCIsInByaXZhdGVLZXlCYXNlNjQiOiJmaGtmaGRsaGtkamgiLCJpYXQiOjE2NjkzNjI3MTUsImV4cCI6MTY2OTQwNTkxNX0.yVdUV9idH4ccgi0QwmWqqpzuOpxTUFrA8n7iArefuHcdb-seTugtP824dUD4_ONEB2Y7rM2lCZRDwlb3iWDCBw',
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJBRFNBRE9STiIsInB1YmxpY0tleUJhc2U2NCI6ImdmZGdsZydmbGgiLCJwcml2YXRlS2V5QmFzZTY0IjoiZmhrZmhkbGhrZGpoIiwiaWF0IjoxNjY5MzYyNzc0LCJleHAiOjE2Njk0MDU5NzR9.44qQHhn3mwg8tyyBWaol0HvazBV9Ot6dGQez937ou47K5CpI70jm-sIMtOy8XByAiTRx0R8hvCqZOFeUSqlyZQ',
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5BTiIsInB1YmxpY0tleUJhc2U2NCI6ImdmZGdsZydmbGgiLCJwcml2YXRlS2V5QmFzZTY0IjoiZmhrZmhkbGhrZGpoIiwiaWF0IjoxNjY5MzYyODYzLCJleHAiOjE2Njk0MDYwNjN9.2trYwi5FQ-blKMzeRUZgQdhwsF3bXE6fNUcxmIEMy1AjhY9_s3MA-hsQtLLwIlx2juAf1QTJ6Ma9MkHwjdorGw'
    ];

    peers: User[] = [
        { username: '1PONG' },
        { username: 'RADSADORN' },
        { username: 'NAN' },
    ];

    messages!: any[];

    event = Event;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private chatService: ChatService,
        private dialogService: DialogService,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        console.log('Start');
        this._msgSub = this.chatService.newMessage.subscribe(msg => this.receiveMessages(msg));
        this.route.params.subscribe(params => {
            const param = params['name'].split('"');
            console.log(param);
            this.chatName = param[0];
            console.log(this.chatName)
            const id = param[1];
            const token = this.token[Number(id)];

            this.chatService.setToken(token);

            console.log(token);

            this.user = this.authService.getUserToken(token);
            console.log(this.user);
            this.loadChatMessage(this.chatName);
        });
    }

    loadChatMessage(name: string): void {
        console.log('Test');
        this.chatService.getChatMessage(name).subscribe({
            next: (res: any) => {
                console.log(res);
                console.log(res.chatMessages);
                console.log(res.chatData);
                this.messages = res.chatMessages;
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }

    sendMessage(messsage: string): void {
        console.log(messsage);
        this.peers.forEach(peer => {
            
            const newMessage = {
                chatName: this.chatName,
                from: this.user.username,
                to: peer.username,
                content: messsage,
                type: this.event.MESSAGE_RECEIVED
            };

            this.chatService.sendNewMessage(newMessage).subscribe({
                next: (res: any) => {
                    this.chatService.sendMessage(newMessage);
                }
            });
        })

        this.messageContent = '';
    }

    closeChat(): void {
        this.chatService.closeRoom(this.chatName);
        console.log('close');

        this.router.navigate(['/'])
    }

    private async receiveMessages(message: any) {
    
        switch (message.type) {
          case Event.MESSAGE_RECEIVED:
          {
            const fromUser: User = this.peers.find(peer => peer.username === message.from) as User;
            if (message.to === this.user.username)
                this.messages = [ ...this.messages, message ]
            // this.chatService.sendBrowserNotification(fromUser.name, Event.MESSAGE_RECEIVED);
            break;
          }
        }
      }

}