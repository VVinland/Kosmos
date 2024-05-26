import db from './../db.js';
import { Task } from "../types.js";

class TaskService {
    async create(taskData: Task) {

        const task = await db.query(`INSERT INTO task (title, description, "dateEnd",    
        "dateCreate", "updateDate", priority, creator, responsible, status)
        VALUES ('${taskData.title}', '${taskData.description}','${taskData.dateEnd}',
            '${taskData.dateCreate}', '${taskData.updateDate}','${taskData.priority}',
            '${taskData.creator}', '${taskData.responsible}', '${taskData.status}') RETURNING *;`);


        return task.rows[0];
    };

    async getCreatedTasks(login: string) {
        const tasks = await db.query(`SELECT * FROM task WHERE creator='${login}';`)

        return tasks.rows;
    }

    async getAssignedTasks(login: string) {
        const tasks = await db.query(`SELECT * FROM task WHERE responsible='${login}';`)
        return tasks.rows;
    }

    async update(taskData: Task) {

        const task = await db.query(`UPDATE task SET
         title='${taskData.title}',
         description='${taskData.description}',
        "updateDate"='${taskData.updateDate}',
          responsible='${taskData.responsible}',
        status='${taskData.status}',
          "dateEnd"='${taskData.dateEnd}',
        priority='${taskData.priority}'
         WHERE id='${taskData.id}' RETURNING *;`)

        return task.rows[0];
    }

    async delete(taskId: number) {
        const task = await db.query(`DELETE FROM task WHERE id='${taskId}' RETURNING *;`)

        return task.rows[0];
    }

}

export default new TaskService();