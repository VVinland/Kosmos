import { action, makeObservable, observable, reaction } from "mobx";
import { Task } from "../types";
import { AxiosError } from "axios";
import TaskRequest from "../http/Task-request";
import sorting from '../utils/sorting-task';

class TaskStore {
    tasks: Task[] = [];
    labelCurrentlyArray: string = '';

    constructor() {
        makeObservable(this, {
            tasks: observable,
            setTasks: action,
            setLabelCurrentlyArray: action,
            addTask: action
        })
    }

    setTasks(tasks: Task[]) {
        this.tasks = tasks;
    }

    setLabelCurrentlyArray(label: string) {
        this.labelCurrentlyArray = label;
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }

    async create(task: Task) {
        try {
            const response = await TaskRequest.create(task);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new AxiosError(error.response?.data?.message);
            }
        }
    }
    async getCreatedTasks(login: string) {
        try {
            const response = await TaskRequest.getCreatedTasks(login);
            this.setTasks(response.data)
            this.setLabelCurrentlyArray('created');
            if (response.data.length > 1) sorting.withoutSorting(this.tasks);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data?.message);
            }
        }
    }
    async getAssignedTasks(login: string) {
        try {
            const response = await TaskRequest.getAssignedTasks(login);
            this.setTasks(response.data);
            this.setLabelCurrentlyArray('assigned');
            if (response.data.length > 1) sorting.withoutSorting(this.tasks);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data?.message);
            }
        }
    }
    async update(task: Task) {
        try {
            await TaskRequest.update(task);
            alert('Задача успешно обновлена');
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new AxiosError(error.response?.data?.message);
            }
        }
    }
    async delete(id: number) {
        try {
            await TaskRequest.delete(id);
            alert('Задача успешно удалена')
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data?.message);
            }
        }
    }
}

export default TaskStore;