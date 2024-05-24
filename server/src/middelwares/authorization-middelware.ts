import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api-error.js";

const authorizationMiddelware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { login, password }: { login: string, password: string } = req.body;
        if (!login || !password) throw ApiError.BadRequest(`Введите данные в обязательные поля. 
        Такие поля отмечены красной звёздочкой`);

        next();
        return;
    } catch (error) {
        if (error instanceof Error) {
            return next(ApiError.BadRequest(error.message));
        }
    }
}

export default authorizationMiddelware;