import { Request, Response } from 'express';
import ResponseUtil from '../../shared/response.util';
import { AuthorizationService } from './auth.service';

export class AuthorizationController {

    private readonly LOG_NAME = 'AuthorizationController\t\t> ';

    constructor (
        private authService: AuthorizationService = new AuthorizationService(),
    ) {}

    public async authorization(req: Request, res: Response): Promise<void> {
        try {
            console.log(this.LOG_NAME + 'Authorization');
            
            res.json(ResponseUtil.getResponseSuccessWithResult({ message: 'Hello' }));
        } catch (err: any) {
            this.getErrorResponse(err, res);
        }
    }

    public async createNewUser(req: Request, res: Response): Promise<void> {
        try {
            console.log(this.LOG_NAME + 'New User...');

            const result = await this.authService.createNewUser(req.body);
            res.json(ResponseUtil.getResponseSuccess());
        } catch (err: any) {
            this.getErrorResponse(err, res);
        }
    }

    public async userLogin(req: Request, res: Response): Promise<void> {
        try {
            console.log(this.LOG_NAME + 'User Login...');

            const token = await this.authService.login(req.body);

            res.header('Authorization', token);
            res.json(ResponseUtil.getResponseSuccessWithResult({ token }));
        } catch (err: any) {
            this.getErrorResponse(err, res);
        }
    }

    private getErrorResponse(error: any, res: Response): void {
        console.log('ERROR: ' + this.LOG_NAME + JSON.stringify(error));
        res.json(ResponseUtil.getResponseError(error.message));
    }
}