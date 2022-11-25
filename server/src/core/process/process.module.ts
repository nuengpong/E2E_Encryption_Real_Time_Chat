import { NextFunction, Request, Response } from 'express';
import httpContext from "express-http-context";

export const doRequest = (callback: (req: Request, res: Response) => Promise<void>) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        for(let i = 0; i < 2; i++) {
            let line = '';
            for(let k = 0; k < 50; k++) {
                line += '=';
            }
            console.log(line);
        }
        console.log('\nStart ' + httpContext.get('path') + ' header: ' + JSON.stringify(req.headers) + '\n');
        try {
            await callback(req, res);
            next();
        } catch(err: any) {
            if(err && err.returnCode && err.returnMessage) {
                res.json(err);
                next();
            } else {
                next(err);
            }
        }
    }
}