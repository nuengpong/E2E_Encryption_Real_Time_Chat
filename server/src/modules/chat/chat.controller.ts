import { Request, Response } from 'express';
import responseUtil from '../../shared/response.util';
import { Member } from './chat.interface';
import { ChatService } from './chat.service';
import { getUser } from '../../shared/jwt.util';
import ResponseUtil from '../../shared/response.util';

export class ChatController {

    private readonly LOG_NAME = 'ChatController\t\t> ';

    constructor (
        private chatService: ChatService = new ChatService(),
    ) {}

    public async getAllChat(req: Request, res: Response): Promise<void> {
        try {
            console.log(this.LOG_NAME + 'Get My Chat...');

            const user: Member = getUser(req.headers.authorization!);
            const myChatList = await this.chatService.getAllChat(user);
            res.json(responseUtil.getResponseSuccessWithResult({ myChatList }));
        } catch (error: any) {
            this.getErrorResponse(error, res);
        }
    }

    public async createChat(req: Request, res: Response): Promise<void> {
        try {
            console.log(this.LOG_NAME + 'New Chat...');

            const user: Member = getUser(req.headers.authorization!);
            const chat = await this.chatService.createChat(user, req.body);
            res.json(responseUtil.getResponseSuccessWithResult({ chat }));
        } catch (error: any) {
            this.getErrorResponse(error, res);
        }
    }

    public async joinChat(req: Request, res: Response): Promise<void> {
        try {
            console.log(this.LOG_NAME + 'Join Chat... Name: ' + JSON.stringify(req.body));

            const user: Member = getUser(req.headers.authorization!);
            const chat = await this.chatService.joinChat(user, req.body);
            res.json(responseUtil.getResponseSuccessWithResult({ chat }));
        } catch (error: any) {
            this.getErrorResponse(error, res);
        }
    }

    public async leaveChat(req: Request, res: Response): Promise<void> {
        try {
            console.log(this.LOG_NAME + 'Leave Chat... Name: ' + JSON.stringify(req.body));

            const user: Member = getUser(req.headers.authorization!);
            const result = await this.chatService.leaveChat(user, req.body.chatName);
            res.json(responseUtil.getResponseSuccess());
        } catch (error: any) {
            this.getErrorResponse(error, res);
        }
    }

    public async getMessage(req: Request, res: Response): Promise<void> {
        try {
            console.log(this.LOG_NAME + 'Get Message... Chat name: ' + JSON.stringify(req.query));

            const chatName = req.query.chatName as string;
            const user: Member = getUser(req.headers.authorization!);

            const chatData = await this.chatService.getChatData(chatName);
            const chatMessages = await this.chatService.getMessageByChatName(user, chatName);

            res.json(responseUtil.getResponseSuccessWithResult({ chatData, chatMessages }));
        } catch (error: any) {
            this.getErrorResponse(error, res);
        }
    }

    public async newMessage(req: Request, res: Response): Promise<void> {
        try {
            console.log(this.LOG_NAME + 'New Message... Message: ' + JSON.stringify(req.body));

            const user: Member = getUser(req.headers.authorization!);
            const result = await this.chatService.newMessage(user, req.body);

            res.json(responseUtil.getResponseSuccess());
        } catch (error: any) {
            this.getErrorResponse(error, res);
        }
    }

    private getErrorResponse(error: any, res: Response): void {
        console.log('ERROR: ' + this.LOG_NAME + JSON.stringify(error));
        res.json(ResponseUtil.getResponseError(error.message));
    }

}