import { compare, hash } from "bcrypt";
import { Chat, ChatData, ChatResponse, Member, Message, NewChat, NewMessage } from "./chat.interface";

const saltOrRounds = 10;
const chatMemberLimit = 4;

export class ChatService {

    private readonly LOG_NAME = 'ChatService\t\t> ';

    chats: { [key: string]: ChatData } = {};
    messages: { [key: string]: Message[] } = {};

    constructor () {}

    public async getAllChat(user: Member ): Promise<Chat[]> {
        try {
            console.log(this.LOG_NAME + JSON.stringify(user));

            const allChat = Object.values(this.chats);

            const myChatList = allChat.filter(c => c.member.filter(m => m.username === user.username).length === 1);
            const mapMyChatList = myChatList.map(c => ({ name: c.name, memberCount: c.member.length }));

            // console.log(mapMyChatList);
            return mapMyChatList;
        } catch (error: any) {
            throw error;
        }
    }

    public async createChat(user: Member, newChat: NewChat): Promise<ChatResponse> {
        try {
            console.log(this.LOG_NAME + JSON.stringify(newChat));

            const result = this.chats[newChat.name];
            if (result)
                throw { message: 'Chat Name is already exist!!!' };

            const hashPassword: string = await hash(newChat.password, saltOrRounds)
            const chatData: ChatData = {
                ...newChat,
                password: hashPassword,
                member: [user]
            }
            this.chats[newChat.name] = chatData;
            console.log(this.chats);

            const chatResponse: ChatResponse = {
                name: chatData.name,
                member: chatData.member
            }
            return chatResponse;
        } catch (error: any) {
            throw error;
        }
    }

    public async joinChat(user: Member, chat: NewChat): Promise<ChatResponse> {
        try {
            console.log(this.LOG_NAME + JSON.stringify(chat));

            const result = this.chats[chat.name];
            if (!result)
                throw { message: "No chat found" };

            const isJoined = result.member.find(m => m.username === user.username);
            if (isJoined)
                throw { message: "You already in this chat!!!" };

            if (result.member.length === chatMemberLimit)
                throw { message: "Chat FULL!!!" };

            const password = result.password;
            const chatData: ChatResponse = {
                name: result.name,
                member: result.member
            }

            console.log(chatData.member);

            const passwordCorrected = await compare(chat.password, password);
            if (passwordCorrected) {
                this.chats[chat.name].member.push(user);
                return chatData;
            } 

            throw { message: "Incorrected Password!!" };

        } catch (error: any) {
            throw error;
        }
    }

    public async leaveChat(user: Member, chatName: string): Promise<void> {
        try {
            console.log(this.LOG_NAME + JSON.stringify(chatName));

            const result = this.chats[chatName];
            if (!result)
                throw { message: "No chat found" };

            result.member = result.member.filter(m => m.username !== user.username);
            console.log(result.member);
            console.log(this.chats[chatName].member);

        } catch (error: any) {
            throw error;
        }
    }

    public async getChatData(chatName: string): Promise<ChatData> {
        try {
            console.log(this.LOG_NAME + JSON.stringify(chatName));

            const chatData = this.chats[chatName];
            return chatData;
        } catch (error: any) {
            throw error;
        }
    }

    public async getMessageByChatName(user: Member, chatName: string): Promise<Message[]> {
        try {
            console.log(this.LOG_NAME + JSON.stringify(chatName));

            const allMessage = this.messages[chatName];
            let myMessages: any = [];

            console.log(allMessage);
            if (allMessage)
                myMessages = allMessage.filter(m => m.to === user.username);

            console.log(myMessages);
            return myMessages;
        } catch (error: any) {
            throw error;
        }
    }

    public async newMessage(user: Member, message: NewMessage): Promise<void> {
        try {
            console.log(this.LOG_NAME + JSON.stringify(message));

            const from = user.username;
            const { chatName, to, content, type } = message;
            const newMessage: Message = { from, to, content, type };

            console.log(newMessage);

            // First message
            const result = this.messages[chatName];
            if (!result) this.messages[chatName] = [];

            // Add new message
            this.messages[chatName].push(newMessage);

            console.log(this.messages[chatName]);

        } catch(error: any) {
            throw error;
        }
    }

}