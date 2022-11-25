import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { appRouter } from './routes/app.router';
import { authRouter } from './routes/auth.router';
import { auth } from './core/middleware/auth.module';

dotenv.config();

export const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send("Hello world!!!");
});

app.use('/chat', auth, appRouter);
app.use('/auth', authRouter);
app.use(appRouter);