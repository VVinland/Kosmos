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
            if (error instanceof Error) {
                return res.json(error.message);
            }
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { login, password }: { login: string, password: string } = req.body;
            const userData: AuthUserData = await userService.login(login, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json({ accessToken: userData.accessToken, user: userData.user });
        } catch (error) {
            if (error instanceof Error) {
                return res.json(error.message);
            }
        }
    }
    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (error) {
            if (error instanceof Error) {
                return res.json(error.message);
            }
        }
    }
    async getLogins(req: Request, res: Response, next: NextFunction) {
        try {
            const logins = await userService.getLogins();
            return res.json(logins);
        } catch (error) {
            if (error instanceof Error) {
                return res.json(error.message);
            }
        }
    }
}

export default new UserController();