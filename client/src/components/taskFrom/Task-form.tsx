import React, { useState } from 'react';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [responsible, setResponsible] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');

    return (
        <div className="taskForm">
            <label className="taskForm__item">Заголовок
                <input
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    placeholder='Введите заголовок' /></label>
            <label className="taskForm__item">Описание
                <input
                    type="text"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    placeholder='Введите описание' /></label>
            <label className="taskForm__item">Дата окончания
                <input
                    type="date"
                    value={dateEnd}
                    onChange={event => setDateEnd(event.target.value)}
                    max={'9999-12-31'}
                    placeholder='Введите дату' /></label>
            <label className="taskForm__item">Ответственный
                <input
                    type="text"
                    value={responsible}
                    onChange={event => setResponsible(event.target.value)}
                    placeholder='Введите отвественного' /></label>
            <label className="taskForm__item">Приоритет
                <select value={priority} onChange={event => setPriority(event.target.value)}>
                    Выберите приоритет
                    <option value='High'>Высокий</option>
                    <option value='Middle'>Средний</option>
                    <option value='low'>Низкий</option>
                </select></label>

            <label className="taskForm__item">Статус
                <select value={status} onChange={event => setStatus(event.target.value)}>
                    Выберите статус
                    <option value="to implementation">К выполнению</option>
                    <option value="performed">Выполняется</option>
                    <option value="completed">Выполнена</option>
                    <option value="canceled">Отменена</option>
                </select>
            </label>
        </div >
    );
}

export default TaskForm;