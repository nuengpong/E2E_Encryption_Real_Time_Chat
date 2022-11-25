export interface NewChat {
    name: string;
    password: string;
}

export interface ChatData {
    name: string;
    password: string;
    member: Member[];
}

export interface ChatResponse {
    name: string;
    member: Member[];
}

export interface Member {
    username: string;
    publicKeyBase64: string;
}

export interface Chat {
    name: string;
    memberCount: number;
}

export interface Message {
    from: string;
    to: string;
    content: string;
    type: string;
}

export interface NewMessage {
    chatName: string;
    to: string;
    content: string;
    type: string;
}