import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../../services/crypto.service';
import { User, Event, Room } from '../../models';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { ChatDialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    title = 'e2e-real-time-chat';

    user!: User

    chatRoom: any[] = [
        // { name: 'Radadorn', memberCount: 1 },
        // { name: 'CE 58 (4D)', memberCount: 2 },
        // { name: 'NEW CHAT', memberCount: 3 },
        // { name: 'CHAT TEST', memberCount: 4 },
        // { name: 'Radadorn', memberCount: 1 },
        // { name: 'CE 58 (4D)', memberCount: 2 },
        // { name: 'NEW CHAT', memberCount: 3 },
        // { name: 'CHAT TEST', memberCount: 4 },
        // { name: 'Radadorn', memberCount: 1 },
        // { name: 'CE 58 (4D)', memberCount: 2 },
        // { name: 'NEW CHAT', memberCount: 3 },
        // { name: 'CHAT TEST', memberCount: 4 },
    ];

    constructor(
        private router: Router,
        private authService: AuthService,
        private chatService: ChatService,
        private cryptoService: CryptoService,
        private dialogService: DialogService,
    ) {}

    ngOnInit(): void {
        console.log('Start');
        this.loadMyChat();
    }

    // loadUserData(): void {
    //     const base64PublicKey: string = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1A6I0IinIfNkufgSbY4KW2W9H5vgzndPlam4UVCjWkWi/q8Rgy+cq+pfbk4zz5xGOGYZG7b3o+YpfWBIQmjb3QhLIPHhkJiqofaTGIigogjAFPYg4HwmEbj1VndSLBxCLm3RiKE/Vy09e6m3GTsCe7OdsWF3pRLD7mkzhFPjC7SF5ZY1y0hsKgFphPycLEKSehcIZKk7xDbv9ABv8zucYfDM68hYTJohaglgy33gdNGtyvF1sNWegyl8W1HTD52e80xIjxayBoMeVADt7dusnkcwAlIo7QDH4ZYfgAA/Dq3iI0AcAbY8TMSJ+4bpbjkMjEtJ0FMKPy/XmiobymMM0wIDAQAB';
    //     const base64PrivateKey: string = 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDUDojQiKch82S5+BJtjgpbZb0fm+DOd0+VqbhRUKNaRaL+rxGDL5yr6l9uTjPPnEY4Zhkbtvej5il9YEhCaNvdCEsg8eGQmKqh9pMYiKCiCMAU9iDgfCYRuPVWd1IsHEIubdGIoT9XLT17qbcZOwJ7s52xYXelEsPuaTOEU+MLtIXlljXLSGwqAWmE/JwsQpJ6FwhkqTvENu/0AG/zO5xh8MzryFhMmiFqCWDLfeB00a3K8XWw1Z6DKXxbUdMPnZ7zTEiPFrIGgx5UAO3t26yeRzACUijtAMfhlh+AAD8OreIjQBwBtjxMxIn7huluOQyMS0nQUwo/L9eaKhvKYwzTAgMBAAECggEBAJ5B0p0+vuy5hry7hJU6YkRfo0tJu/aaWEyrgyE8ewzN150W7oznJZevrFTYDBau3EEPAUILxLkO9nvZNVRKiXtlyxvlKKAPL5j8Oj8fCDKlMSTzowml3Ytwa7iCCFNfK40W7D95h5n56161BC7SOUI0hEVzJiWN4ae133qsWE/Mpz4F76gv2QZhMsVVwyXZmU10177smJu4++uYf9zYBAB8hIN0nxO6MVJm2RPaMRHU3D3KthAYkPb1fEDlCH41+lOd3sYo5YlAd8h4s6f2eCSQDa/S7+dW24NWNl2eOkfVjEvE5B+mh2P/o9QvMs/vZ2GuprpgLqo+mNT8voRXJLECgYEA+vOAFYxuUksCRCG+8mwqO938WXgb2liELCrrtojWSrSp1qYGri7vYASdYh/sIsOF2etj4aAuBkWkCBaFrhtbHEKf8rKXfACiB0RF1HbMgsGVY41cmwmb1laKuGgpRrlbWyToFdZ2eP01iXImrA/sjz9D78/rWagLrkPYertlL00CgYEA2FK2V/I6LrDvdWoQN9OwCZxQFfa8bVeiBHyGVqwlsFlEYa/YiOYAO7wpGGBemVYbpw4xwzL8sha791wv6NmC1bcxoAHpebL7RAHLjgkZvGFTX8bOjRdawOV4aOJSuckR+svhgO1AwICmK0zX6DQcXDc2ei+Z9pFwoEd0y2A3XJ8Cf2vUNTUNIlo54L9lwKZp07vlpojLEyy+3AweZSoJogp3loKk1DoD8NdRJE8FaHGHkfwRKNnJ+fy378OJ6ebl2kBKYG/oTS77FqQIsfiZE0cb5xTfqOr1NgDjLrgOCa5Z9ucy9IZtoHpcUqS8Z+GG9h6XEJn6vSXJDzvR6zLRUqkCgYBNMf8GFVez78oUEVxmP7GTTGe73sfRETOs/C8IYPg2HTTs006nU8SDjJrxqvo3J+ZIUCVr7hcFCl3bYNdr9ardzzjzS5tgpYFK/IUCU7cOZYDWLeDpsordSUYVz6YLzHgREo6Pbprr1zz1OL/XijkQo1dadQAxYCdb2wQPy28WKwKBgQCp19ime9QKbH1b11EkfNjYovZ2prw2+U8lKoTzNUZCa3ZtDe6uI0A7gnEyryro3QnTpWKWsSQUIS9hl2/uRnRduxV6f1q1wlbzdjKEdeEh5XjhX0ZjX+zAiyhJ3cHDT0me38ix9TjTa1X2b67m4Z00ua5gJObaARwX0xjB/SCC9Q==';
        
    //     this.cryptoService.decodeBase64PublicKey(base64PublicKey);
    //     this.cryptoService.decodeBase64PrivateKey(base64PrivateKey);
    //     const publicKey: CryptoKey = this.cryptoService.getPublicKey();
        
    //     this.user = new User('Radsadorn', 1, publicKey, base64PublicKey, base64PrivateKey);
    // }

    // createNewUser(): void {
    //     this.loadUserData();
    //     this.chatService.sendMessage(this.user);
    //     const result = this.chatService.getMessage();
    // }

    chatSelected(chatName: string): void {
        console.log(chatName);
        this.chatService.openRoom(chatName);
        this.router.navigate(['chat', chatName]);
    }

    loadMyChat(): void {
        console.log('Test');
        this.chatService.getMyChat().subscribe({
            next: (res: any) => {
                console.log(res.myChatList);
                this.chatRoom = res.myChatList;
            },
            error: (error: any) => {
                console.log(error);
            }
        });
    }

    createNewChat(): void {
        this.dialogService
            .createNewChat('CREATED')
            .subscribe({
                next: (res: any) => {
                    if (res) {

                    }
                }
            });
    }

    joinNewChat(): void {
        this.dialogService
            .createNewChat('JOINED')
            .subscribe({
                next: (res: any) => {
                    if (res) {

                    }
                }
            });
    }

}