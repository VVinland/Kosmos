import React, { useEffect, useState } from 'react';
import { Task } from '../../types';
import './task-card.scss';
import Modal from '../modal/Modal';
import TaskForm from '../taskFrom/Task-form';

interface TaskCard {
    taskData: Task
}

const TaskCard = ({ taskData }: TaskCard) => {

    const [visible, setVisible] = useState(false);

    const convertDateToLocal = (dateUTC: string) => {
        const date = new Date(dateUTC);
        const localDate = date.toLocaleDateString();
        return localDate;
    }

    const reverseDate = (date: string) => {
        const tempDate = date.split('.');
        const reversedDate: string = `${tempDate[2]}-${tempDate[1]}-${tempDate[0]}`;
        return reversedDate;
    }

    const convertDateToFormatYYYY_XX_ZZ = (date: string) => {
        const localeDate = convertDateToLocal(date);
        const reversedDate = reverseDate(localeDate);

        return reversedDate;
    }

    return (
        <>
            <Modal visible={visible} setVisible={setVisible}>
                <TaskForm taskData={{
                    ...taskData, dateEnd: convertDateToFormatYYYY_XX_ZZ(taskData.dateEnd),
                }} sign='update' />
            </Modal>
            <div className="taskCard" id={String(taskData.id)} onClick={() => setVisible(true)}>
                <h1 className="taskCard__content">Заголовок: {taskData.title}</h1>
                <h1 className="taskCard__content">Описание: {taskData.description}</h1>
                <h1 className="taskCard__content">Дата окончания:{convertDateToLocal(taskData.dateEnd)}</h1>
                <h1 className="taskCard__content">Ответственный: {taskData.responsible}</h1>
                <h1 className="taskCard__content">Приоритет:{taskData.priority}</h1>
                <h1 className="taskCard__content">Статус: {taskData.status}</h1>
            </div>
        </>

    );
}

export default TaskCard;