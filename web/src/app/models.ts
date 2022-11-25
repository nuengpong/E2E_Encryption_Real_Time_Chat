// Actions you can take on the App
export enum Action {
    JOIN = 'joinChannel',
    RENAME = 'renameChannel',
    LEFT = 'leaveChannel',
    SENDMESSAGE = 'sendMessage'
}

// Socket events
export enum Event {
    CHANNELJOINED = 'channelJoined',
    PEER_JOINED = 'peerJoined',
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    MESSAGE_RECEIVED = 'messageReceived',
    PEER_LEFT = 'peerLeft',
    COMMAND_REJECTED = 'commandRejected'
}

export class User {
    // avatar: string;
  
    constructor(
      public name: string,
      public id: number,
      public publicKey?: CryptoKey,
      public base64EncodedPublicKey?: string,
      public base64EncodedPrivateKey?: string
      ) {
        this.name = name;
        // this.avatar = `../../../assets/avatar/man${this.id % 4}.png`;
    }
}

export class Room {
    sha256Secret?: string;
    constructor (public name: string, public secret: string) {
      this.name = name;
      this.secret = secret;
    }
}