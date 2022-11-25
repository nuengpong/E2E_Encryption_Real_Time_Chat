export interface NewUser {
    username: string;
    password: string;
    publicKeyBase64: string;
    privateKeyBase64: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export interface UserData {
    username: string;
    password: string;
    publicKeyBase64: string;
    privateKeyBase64: string;
}

export interface UserResponse {
    username: string;
    publicKeyBase64: string;
    privateKeyBase64: string;
}