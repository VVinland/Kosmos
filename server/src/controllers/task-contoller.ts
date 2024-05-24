import { NextFunction, Request, Response } from "express";
import { Task, TaskUpdate } from "../types.js";
import taskService from "../services/task-service.js";

class TaskController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const taskData: Task = req.body;
            const task: TaskUpdate = await taskService.create(taskData);
            return res.json(task);
        } catch (error) {
            next(error);
        }
    }
    async getCreatedTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const { login } = req.body;
            const tasks: TaskUpdate[] = await taskService.getCreatedTasks(login);
            return res.json(tasks);
        } catch (error) {
            next(error);
        }
    }
    async getAssignedTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const { login } = req.body;
            const tasks: TaskUpdate[] = await taskService.getAssignedTasks(login);
            return res.json(tasks);
        } catch (error) {
            next(error);
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const taskData: TaskUpdate = req.body;
            const task: TaskUpdate = await taskService.update(taskData);
            return res.json(task);
        } catch (error) {
            next(error);
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { taskId } = req.body;
            const task: TaskUpdate = await taskService.delete(taskId);
            return res.json(task);
        } catch (error) {
            next(error);
        }
    }
}

export default new TaskController();