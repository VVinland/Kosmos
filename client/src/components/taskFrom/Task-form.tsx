import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../..';
import { Task } from '../../types';
import { AxiosError } from 'axios';
import { observer } from 'mobx-react-lite';

interface TaskFromProps {
    sign: string,
    taskData?: Task
}

const TaskForm = observer(({ sign, taskData }: TaskFromProps) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [responsible, setResponsible] = useState('');
    const [priority, setPriority] = useState('Высокий');
    const [status, setStatus] = useState('К выполнению');

    const { taskStore, userStore } = useContext(Context);

    const refDate = useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        if (sign === 'update') {
            setTitle(taskData?.title!);
            setDescription(taskData?.description!);
            setDateEnd(taskData?.dateEnd!);
            setResponsible(taskData?.responsible!);
            setPriority(taskData?.priority!);
            setStatus(taskData?.status!);
        }
    }, [taskData])

    const createNewDate = () => {
        const milliseconds = Date.now();
        const date = new Date(milliseconds);
        const localDate = date.toLocaleString();
        return localDate;
    }
    const updateStates = () => {
        setTitle('');
        setDescription('');
        setDateEnd('');
        refDate.current.value = '';
        setResponsible('');
        setPriority('Высокий');
        setStatus('К выполнению');
    }

    const assembleTask = () => {
        const task: Task = {
            title: title.trim(),
            description: description.trim(),
            dateEnd,
            responsible: responsible.trim(),
            priority,
            status,
            creator: userStore.userData.login,
            dateCreate: '',
            updateDate: ''
        }
        return task;
    }

    const create = async () => {
        try {
            const templateTask = assembleTask();
            const task: Task = {
                ...templateTask,
                dateCreate: createNewDate(),
                updateDate: createNewDate()
            }
            const response = await taskStore.create(task);
            if (taskStore.labelCurrentlyArray === 'created') {
                taskStore.addTask(response!);
            }
            alert('Задача успешно добавлена');
            return;
        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error);
            }
        }
        finally {
            updateStates();
        }
    }

    const update = async () => {
        try {
            const templateTask = assembleTask();
            const task: Task = {
                ...templateTask,
                updateDate: createNewDate(),
                dateCreate: taskData!.dateCreate,
                id: taskData!.id
            };
            await taskStore.update(task);
            if (taskStore.labelCurrentlyArray === 'created')
                await taskStore.getCreatedTasks(userStore.userData.login);
            else await taskStore.getAssignedTasks(userStore.userData.login);

        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error);
            }
        }
    }

    return (
        <div className="taskForm">
            <div className="taskForm__content">
                <label className="taskForm__item">Заголовок
                    <input
                        disabled={taskStore.labelCurrentlyArray === 'assigned'
                            && sign === 'update' ?
                            true :
                            false
                        }
                        type="text"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        placeholder='Введите заголовок' /></label>
                <label className="taskForm__item">Описание
                    <input
                        disabled={taskStore.labelCurrentlyArray === 'assigned'
                            && sign === 'update' ?
                            true :
                            false
                        }
                        type="text"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                        placeholder='Введите описание' /></label>
                <label className="taskForm__item">Дата окончания
                    <input
                        disabled={taskStore.labelCurrentlyArray === 'assigned'
                            && sign === 'update' ?
                            true :
                            false
                        }
                        type="date"
                        value={dateEnd}
                        ref={refDate}
                        onChange={event => setDateEnd(event.target.value)}
                        max='9999-12-31'
                        placeholder='Введите дату' /></label>
                <label className="taskForm__item">Ответственный
                    <input
                        disabled={taskStore.labelCurrentlyArray === 'assigned'
                            && sign === 'update' ?
                            true :
                            false
                        }
                        type="text"
                        value={responsible}
                        onChange={event => setResponsible(event.target.value)}
                        placeholder='Введите отвественного' /></label>
                <label className="taskForm__item">Приоритет
                    <select value={priority} onChange={event => setPriority(event.target.value)}
                        disabled={taskStore.labelCurrentlyArray === 'assigned'
                            && sign === 'update' ?
                            true :
                            false
                        }>
                        Выберите приоритет
                        <option value='Высокйи'>Высокий</option>
                        <option value='Средний'>Средний</option>
                        <option value='Низкий'>Низкий</option>
                    </select></label>

                <label className="taskForm__item">Статус
                    <select value={status} onChange={event => setStatus(event.target.value)}>
                        Выберите статус
                        <option value="К выполнению">К выполнению</option>
                        <option value="Выполняется">Выполняется</option>
                        <option value="Выполнена">Выполнена</option>
                        <option value="Отменена">Отменена</option>
                    </select>
                </label>
                <div className="taskForm__submit">
                    {sign === 'create' ?
                        <button onClick={() => create()} >Создать задачу</button>
                        :
                        <button onClick={() => update()} >Обновить задачу</button>
                    }
                </div>
            </div>

        </div >
    );
})

export default TaskForm;