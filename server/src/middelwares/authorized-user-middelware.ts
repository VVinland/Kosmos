import { NextFunction, Request, Response } from "express";
import tokenService from "../services/token-service.js";

const authorizedUserMiddelware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        
        if (!authorizationHeader) throw new Error('Отсутствует заголовок headers.authorization');

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) throw new Error('Отсутствует accessToken в заголовке headers.authorization');

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) throw new Error('Ошибка валидация accessToken\`a');

        next();
        return;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return res.json(error.message);
        }
    }
}

export default authorizedUserMiddelware;