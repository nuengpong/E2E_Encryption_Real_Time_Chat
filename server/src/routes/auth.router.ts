import { Router } from "express";
import { doRequest } from "../core/process/process.module";
import { AuthorizationController } from "../modules/authorization/auth.controller";

export const authRouter = Router();
const authController = new AuthorizationController();

authRouter.get('/', doRequest((req, res) => authController.authorization(req, res)));
authRouter.post('/signup', doRequest((req, res) => authController.createNewUser(req, res)));
authRouter.post('/sign-in', doRequest((req, res) => authController.userLogin(req, res)));
