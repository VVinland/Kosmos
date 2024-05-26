import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api-error.js";
import { Task } from "../types";
import db from './../db.js';
import correctDate from "../utils/correct-date.js";



const checkExistenceResponsible = async (supervisor: string, loginResponsible: string) => {
    const responsible = await db.query(`SELECT * FROM user_data
    WHERE login='${loginResponsible}' AND supervisor='${supervisor}';`)

    if (responsible.rows.length === 0) return false;

    return true;
}

const createTaskMiddelware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task: Task = req.body;

        if (!task.title || !task.description ||
            !task.dateCreate || !task.dateEnd || !task.updateDate ||
            !task.creator || !task.responsible || !task.priority ||
            !task.status) {
            throw ApiError.BadRequest(`Введите все данные для создания задачи`)
        }

        const dateEnd = correctDate.checkTheDateEndIsCorrect(task.dateEnd);
        if (!dateEnd) {
            throw ApiError.BadRequest(`Ввели не корректную дату окончания`);
        }

        if (task.creator === task.responsible) {
            throw ApiError.BadRequest(`Нельзя назначить задачу себе самому `);
        }

        const responsible = await checkExistenceResponsible(task.creator, task.responsible);

        if (!responsible) {
            throw ApiError.BadRequest(`Такого подчинённого у данного пользователя нет`)
        }

        next();
        return;
    } catch (error) {
        if (error instanceof Error) {
            return next(ApiError.BadRequest(error.message));
        }
    }
}

export default createTaskMiddelware;
