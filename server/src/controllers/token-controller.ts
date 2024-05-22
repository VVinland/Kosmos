import { NextFunction, Request, Response } from "express";
import userService from "../services/user-service.js";
import { AuthUserData } from "../types.js";

class TokenController {
    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const userData: AuthUserData = await userService.refreshToken(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json({ accessToken: userData.accessToken, user: userData.user });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                return res.json(error.message);
            }
        }
    }
}

export default new TokenController();