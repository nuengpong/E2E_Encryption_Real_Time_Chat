import { execute } from "../core/database/database.module";

export const select = async () => {
    return execute<any>(`select user_id, username, password from user`, []);
}

export default {
    select
}