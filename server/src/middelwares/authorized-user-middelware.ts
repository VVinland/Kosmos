import { NextFunction, Request, Response } from "express";
import tokenService from "../services/token-service.js";
import ApiError from "../exceptions/api-error.js";

const authorizedUserMiddelware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) throw ApiError.UnauthorizedError();

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) throw ApiError.UnauthorizedError();

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) throw ApiError.UnauthorizedError();

        next();
        return;
    } catch (error) {
        if (error instanceof Error) {
            return next(ApiError.UnauthorizedError());
        }
    }
}

export default authorizedUserMiddelware;