import React, { useContext, useEffect, useState } from 'react';
import Modal from '../components/modal/Modal';
import TaskCard from '../components/taskCard/Task-card';
import { Context } from '..';
import TaskCreationForm from '../components/taskCreationForm/Task-creation-form';
import SelectingsTasks from '../components/selectingTasks/SelectingTasks';
import { observer } from 'mobx-react-lite';
import SortingTasks from '../components/sortingTasks/Sorting-tasks';
import { Task } from '../types';
import './main-page.scss';

const MainPage = observer(() => {

    const { taskStore, userStore } = useContext(Context);
    const [visible, setVisible] = useState(false);
    const [tasks, setTasks] = useState([] as Task[]);

    useEffect(() => {
        const tempTasks = [...taskStore.tasks];
        setTasks(tempTasks);
    }, [taskStore.tasks]);

    const logout = async () => {
        await userStore.logout();
        taskStore.setTasks([]);
        taskStore.setLabelCurrentlyArray('');
    }

    return (
        <div className="mainPage">
            <button className='mainPage__logout' onClick={() => logout()}>Выйти</button>
            <Modal visible={visible} setVisible={setVisible}>
                <TaskCreationForm />
            </Modal>
            <button className='mainPage__createTask' onClick={() => setVisible(true)}>Создать задачу</button>
            <SelectingsTasks />
            {taskStore.labelCurrentlyArray !== ''
                ?
                <SortingTasks setTasks={setTasks} />
                :
                <></>}
            {tasks.map(item => {
                return <TaskCard taskData={item} key={item.id} />
            })}
        </div>
    );
})

export default MainPage;