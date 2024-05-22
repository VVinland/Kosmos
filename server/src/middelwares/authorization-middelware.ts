import { NextFunction, Request, Response } from "express";

const authorizationMiddelware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { login, password }: { login: string, password: string } = req.body;
        if (!login || !password) throw new Error(`Введите данные в обязательные поля. 
        Такие поля отмечены красной звёздочкой`);

        next();
        return;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            return res.json(error.message);
        }
    }
}

export default authorizationMiddelware;