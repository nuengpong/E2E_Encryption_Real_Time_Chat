import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ChatService } from "src/app/services/chat.service";
import { NgxSpinnerService } from "ngx-spinner";

const JOINED = "JOINED";
const CREATED = "CREATED";

@Component({
    selector: 'app-chat-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.html']
})
export class  ChatDialogComponent implements OnInit {

    chat = {};

    constructor(
        public dialogRef: MatDialogRef<ChatDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string,
        private chatService: ChatService,
        private spinner: NgxSpinnerService,) {
    }

    ngOnInit(): void {
        this.spinner.show();
    }

    onCreate(): void {

    }

    onJoin(): void {

    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
    
}