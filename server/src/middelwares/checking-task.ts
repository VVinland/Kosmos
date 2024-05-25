import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api-error";
import { Task } from "../types";

const checkingTask = (req: Request, res: Response, next: NextFunction) => {
    try {
        const task:Task = req.body;

    } catch (error) {
        if (error instanceof Error) {
            return next(ApiError.BadRequest(error.message));
        }
    }
}

export default checkingTask;
