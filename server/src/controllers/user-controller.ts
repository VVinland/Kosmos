import { Request, Response, NextFunction } from "express";
import userService from "../services/user-service.js";
import { AuthUserData, CandidateForNewUsers } from "../types.js";


class UserController {

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const candidateData: CandidateForNewUsers = req.body;
            const success = await userService.registration(candidateData);
            return res.json(success);
        } catch (error) {
            next(error);
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { login, password }: { login: string, password: string } = req.body;
            const userData: AuthUserData = await userService.login(login, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json({ accessToken: userData.accessToken, user: userData.user });
        } catch (error) {
            next(error);
        }
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json();
        } catch (error) {
            next(error);
        }
    }
    async getLogins(req: Request, res: Response, next: NextFunction) {
        try {
            const logins = await userService.getLogins();
            return res.json(logins);
        } catch (error) {
            next(error);
        }
    } //под вопросом. Хотел исползовать для регистрации. Выдавать имеющихся пользователей в поле руководитель
}

export default new UserController();