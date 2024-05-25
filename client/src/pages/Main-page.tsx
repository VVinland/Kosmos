import React, { useContext, useState } from 'react';
import Modal from '../components/modal/Modal';
import TaskCard from '../components/taskCard/Task-card';
import { Context } from '..';
import TaskCreationForm from '../components/taskCreationForm/Task-creation-form';
import SelectingsTasks from '../components/selectingTasks/SelectingTasks';
import { observer } from 'mobx-react-lite';
import TaskForm from '../components/taskFrom/Task-form';

const MainPage = observer(() => {

    const { taskStore, userStore } = useContext(Context);
    const [visible, setVisible] = useState(false);

    const logout = async () => {
        await userStore.logout();
        taskStore.setTasks([]);
        taskStore.setLabelCurrentlyArray('');
    }

    return (
        <div className="mainPage">
            <button onClick={() => logout()}>Выйти</button>
            <Modal visible={visible} setVisible={setVisible}>
                <TaskCreationForm />
            </Modal>
            <button onClick={() => setVisible(true)}>Создать задачу</button>
            <SelectingsTasks />
            {taskStore.tasks.map(item => {
                return <TaskCard taskData={item} key={item.id} />
            })}
        </div>
    );
})

export default MainPage;