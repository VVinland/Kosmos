import React, { useContext, useState } from 'react';
import Modal from '../components/modal/Modal';
import TaskCard from '../components/taskCard/Task-card';
import { Context } from '..';
import TaskCreationForm from '../components/taskCreationForm/Task-creation-form';

const MainPage = () => {
    const [task, setTask] = useState([]);
    const { userStore } = useContext(Context);
    const [visible, setVisible] = useState(false);


    return (
        <div className="mainPage">
            <button onClick={() => userStore.logout()}>Выйти</button>
            <Modal visible={visible} setVisible={setVisible}>
                <TaskCreationForm />
            </Modal>
            <button onClick={() => setVisible(true)}>Создать задачу</button>
            {/* <Modal>
                <TaskCreationForm />
            </Modal>
            <button>Создать задачу</button>
            <SelectingTasks />
            <SortingTasks />
            { <TaskForm/>
            <TaskUpdateForm/>
            <TaskCard/>} */} <TaskCard />
            {/*id
            title отобразить
            description
            dateEnd отобразить
            dateCreate 
            updateDate
            priority отобразить
            creator
            responsible отобразить
            status отобразить 
            */}
        </div>
    );
}

export default MainPage;