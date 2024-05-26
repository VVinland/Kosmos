import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api-error.js";
import correctDate from "../utils/correct-date.js";

const updateTaskMiddelware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = req.body;
 
        if (!task.id || !task.title || !task.description ||
            !task.dateEnd || !task.updateDate ||
            !task.responsible || !task.priority ||
            !task.status) {
            throw ApiError.BadRequest(`Введите все данные для обновления задачи`)
        }

        const dateEnd = correctDate.checkTheDateEndIsCorrect(task.dateEnd);
        if (!dateEnd) {
            throw ApiError.BadRequest(`Ввели не корректную дату окончания`);
        }
        next();
        return
    } catch (error) {
        if (error instanceof Error) {
            return next(ApiError.BadRequest(error.message))
        }
    }
}

export default updateTaskMiddelware;