import { AxiosResponse } from "axios";
import { Task } from "../types";
import api from "./index";

class TaskRequest {
    static async create(task: Task): Promise<AxiosResponse<Task>> {
        return api.post<Task>('/task/create', task);
    }

    static async getCreatedTasks(login: string): Promise<AxiosResponse<Task[]>> {
        return api.post<Task[]>('/task/getCreatedTasks', { login })
    }

    static async getAssignedTasks(login: string): Promise<AxiosResponse<Task[]>> {
        return api.post<Task[]>('/task/getAssignedTasks', { login })
    }

    static async update(task: Task): Promise<AxiosResponse<Task>> {
        return api.patch<Task>('/task/update', task);
    }

    static async delete(id: number): Promise<AxiosResponse<Task>> {
        return api.delete<Task>('/task/delete', { data: id });
    }
}

export default TaskRequest;