import { NewUser, UserData, UserLogin, UserResponse } from "./auth.interface";
import { AuthorizationRepository } from "./auth.repository";
import { hash, compare } from 'bcrypt';
import { generateToken } from "../../shared/jwt.util";

const saltRounds = 10;

export class AuthorizationService {

    private readonly LOG_NAME = 'AuthorizationService\t\t> ';

    users: { [key: string]: NewUser } = {};

    constructor (
        private authRepo: AuthorizationRepository = new AuthorizationRepository(),
    ) {}

    public async createNewUser(newUser: NewUser): Promise<any> {
        try {
            console.log(this.LOG_NAME + JSON.stringify(newUser));

            // find by username
            // username collision
            const result = this.users[newUser.username];
            if (result)
                throw { message: "Username is already exist!!!" };

            const hashPassword: string = await hash(newUser.password, saltRounds)
            const userData: NewUser = {
                ...newUser,
                password: hashPassword,
            }

            // this.authRepo.createNewUser(userData);

            this.users[newUser.username] = userData;

            console.log(this.users);

            //return user data
        } catch (err: any) {
            throw err;
        }
    }

    public async login(userLogin: UserLogin): Promise<string> {
        try {
            console.log(this.LOG_NAME + JSON.stringify(userLogin));

            // find by username
            const result = this.users[userLogin.username];
            if (!result)
                throw { message: "No user found" };

            const password = result.password;

            console.log(result);

            const userData: UserResponse = {
                username: result.username,
                publicKeyBase64: result.publicKeyBase64,
                privateKeyBase64: result.privateKeyBase64,
            }

            const passwordCorrected = await compare(userLogin.password, password);

            console.log(passwordCorrected);
            if (passwordCorrected) {
                return generateToken(userData);
            } 

            throw { message: "Password Incorrect!!" };

        } catch (err: any) {
            throw err;
        }
    }

}