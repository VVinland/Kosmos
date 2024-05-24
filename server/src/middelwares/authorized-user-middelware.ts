import { NextFunction, Request, Response } from "express";
import tokenService from "../services/token-service.js";
import ApiError from "../exceptions/api-error.js";

const authorizedUserMiddelware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) throw ApiError.BadRequest('Отсутствует заголовок headers.authorization');

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) throw ApiError.BadRequest('Отсутствует accessToken в заголовке headers.authorization');

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) throw ApiError.BadRequest('Ошибка валидация accessToken\`a');

        next();
        return;
    } catch (error) {
        if (error instanceof Error) {
            return next(ApiError.BadRequest(error.message));
        }
    }
}

export default authorizedUserMiddelware;