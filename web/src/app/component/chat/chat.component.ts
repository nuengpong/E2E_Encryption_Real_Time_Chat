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

    chatName = 'CHAT NAME';

    messageContent: string = '';

    user: any = {
        username: 'test'
    }

    peers!: any[];

    messages: any;

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
        this.route.params.subscribe(params => {
            this.chatName = params['name'];
            // this.user = this.authService.getUserToken();
            this.loadChatMessage(this.chatName);
        });
    }

    loadChatMessage(name: string): void {
        console.log('Test');
        this.chatService.getChatMessage(name).subscribe({
            next: (res: any) => {
                console.log(res.chatMessages);
                this.peers = res.chatData.member;
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

}