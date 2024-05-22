import { NextFunction, Request, Response } from "express";
import { Task, TaskUpdate } from "../types.js";
import taskService from "../services/task-service.js";

class TaskController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const taskData: Task = req.body;
            const task = await taskService.create(taskData);
            return res.json(task);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.json(error.message);
            }
        }
    }
    async getCreatedTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const { login } = req.body;
            const tasks = await taskService.getCreatedTasks(login);
            return res.json(tasks);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.json(error.message);
            }
        }
    }
    async getAssignedTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const { login } = req.body;
            const tasks = await taskService.getAssignedTasks(login);
            return res.json(tasks);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.json(error.message);
            }
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const taskData: TaskUpdate = req.body;
            const task = await taskService.update(taskData);
            return res.json(task);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.json(error.message);
            }
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { taskId } = req.body;
            const task = await taskService.delete(taskId);
            return res.json(task);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.json(error.message);
            }
        }
    }
}

export default new TaskController();