import { NextFunction, Request, Response } from "express";
import db from './../db.js';
import { CandidateForNewUsers } from "../types.js"

const checkSupervisor = async (supervisorLogin: string) => {
    const supervisor = await db.query(`SELECT * FROM user_data WHERE login='${supervisorLogin}';`);
    if (supervisor.rows.length === 0) throw new Error('Такого руководителя не существует');
}

const registrationMiddelware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const candidate: CandidateForNewUsers = req.body;

        if (!candidate.firstname || !candidate.lastname || !candidate.middlename ||
            !candidate.login || !candidate.password) throw new Error(`Введите данные во все обязательные поля. 
            Такие поля отмеченны красной звёздочкой`);

        if (candidate.supervisor) {
            await checkSupervisor(candidate.supervisor);
        }

        next();
        return;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return res.json(error.message);
        }
    }
};

export default registrationMiddelware;