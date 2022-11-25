import { verify, sign, SignOptions, VerifyOptions, Secret, decode } from 'jsonwebtoken';
import { UserData, UserResponse } from '../modules/authorization/auth.interface';

export const generateToken = (userData: UserResponse) => {

    const signInOptions: SignOptions = {
        algorithm: "HS512",
        expiresIn: '12h'
      };

    console.log(process.env.SECRET_KEY);

    return sign(userData, process.env.SECRET_KEY as string, signInOptions);

} 

export const getUser = (token: string): User => {

    const info = decode(token) as unknown as UserResponse;

    return {
        username: info.username,
        publicKeyBase64: info.publicKeyBase64
    }

}

interface User {
    username: string;
    publicKeyBase64: string;
}