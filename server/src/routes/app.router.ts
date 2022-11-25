import { Router } from "express";
import { doRequest } from "../core/process/process.module";
import { ChatController } from "../modules/chat/chat.controller";

export const appRouter = Router();
const chatController = new ChatController();

appRouter.get('/hello', (req, res) => {
    res.send('Hello chat!!!');
});

appRouter.get('', doRequest((req, res) => chatController.getAllChat(req, res)));
appRouter.post('/create', doRequest((req, res) => chatController.createChat(req, res)));
appRouter.put('/join', doRequest((req, res) => chatController.joinChat(req, res)));
appRouter.put('/leave', doRequest((req, res) => chatController.leaveChat(req, res)));

appRouter.get('/message', doRequest((req, res) => chatController.getMessage(req, res)));
appRouter.post('/message', doRequest((req, res) => chatController.newMessage(req, res)));