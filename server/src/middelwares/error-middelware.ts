import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api-error.js";

const errorMiddelware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({ message: "Непредвиденная ошибка" });
}

export default errorMiddelware;