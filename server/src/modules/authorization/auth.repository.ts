import mysqlUtil from "../../shared/mysql.util";
import { NewUser } from "./auth.interface";

export class AuthorizationRepository {

    private readonly LOG_NAME = 'AuthorizationRepository > ';

    constructor () {}

    private readonly INSERT_USER = `insert into user (username, password, public_key_base64, private_key_base64) values (?)`;

    public async createNewUser(entity: NewUser): Promise<any> {
        // const query: string = `insert into user (username, password, public_key_base64, private_key_base64) values ('${entity.username}', '${entity.password}', '${entity.publicKeyBase64}', '${entity.privateKeyBase64}')`;

        // const result = await mysqlUtil.select();
        // console.log(JSON.stringify(result));

        
    }

}