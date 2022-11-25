import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { ChatDialogComponent } from "../component/dialog/dialog.component";

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    
    constructor(
        public dialog: MatDialog,
    ) {}

    createNewChat(mode: string): Observable<any> {
        const dialogRef = this.dialog.open(ChatDialogComponent, {
            width: '80%',
            data: "CREATED"
        });
        
        return dialogRef.afterClosed();
    }

    joinNewChat(mode: string): Observable<any> {
        const dialogRef = this.dialog.open(ChatDialogComponent, {
            width: '80%',
            data: "JOINED"
        }); 

        return dialogRef.afterClosed();
    }
}