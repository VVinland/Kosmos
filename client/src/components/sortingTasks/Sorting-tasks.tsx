import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import sorting from '../../utils/sorting-task';
import { Task } from '../../types';
import './sorting-tasks.scss';

interface SortingTaksProps {
    setTasks: (tasks: Task[]) => void;
}

const SortingTasks = ({ setTasks }: SortingTaksProps) => {

    const [nameDate, setNameDate] = useState('dateEnd');
    const { taskStore } = useContext(Context);

    useEffect(() => {
        if (nameDate === 'dateEnd') {
            return;
        }

        if (taskStore.tasks.length === 0 || taskStore.tasks.length === 1) return;
        const newTasks = [...taskStore.tasks];
        const tasks: Task[] = sorting.sortingByDateEnd(newTasks, nameDate);
        setTasks(tasks);
    }, [nameDate])

    const withoutSorting = () => {
        if (taskStore.tasks.length === 0 || taskStore.tasks.length === 1) return;
        const temporaryTasks = [...taskStore.tasks];
        const tasks: Task[] = sorting.withoutSorting(temporaryTasks);
        taskStore.setTasks(tasks);
    }

    const sortingByResponsible = () => {
        if (taskStore.tasks.length === 0 || taskStore.tasks.length === 1) return;
        const temporaryTasks = [...taskStore.tasks];
        const tasks: Task[] = sorting.sortingByResponsible(temporaryTasks);
        taskStore.setTasks(tasks);
    }

    return (
        <div className="sortingTasks">
            {taskStore.labelCurrentlyArray === 'assigned' ?
                <select className='sortingTasks__select'
                    value={nameDate}
                    onChange={event => setNameDate(event.target.value)}>
                    <option value='dateEnd' disabled>По дате завершения</option>
                    <option value="today" key="1">На сегодня</option>
                    <option value="week" key="2">На неделю</option>
                    <option value="moreWeek" key="3">На будущее</option>
                </select>
                :
                <></>}
            {
                taskStore.labelCurrentlyArray === 'created'
                    ?
                    <button className='sortingTasks__sortingByResponsible' onClick={() => sortingByResponsible()}>По отвественным</button>
                    :
                    <></>
            }
            <button className='sortingTasks__withoutSorting' onClick={() => withoutSorting()}>Без сортировки</button>
        </div >
    );
}

export default SortingTasks;