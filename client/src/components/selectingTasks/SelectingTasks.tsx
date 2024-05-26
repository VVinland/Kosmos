import React, { useContext } from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import './selectingTasks.scss';

const SelectingsTasks = observer(() => {

    const { userStore, taskStore } = useContext(Context);

    return (
        <div className="selectingsTasks">
            <button className='selectingsTasks__assigned' onClick={() => taskStore.getAssignedTasks(userStore.userData.login)}>Мои задачи</button>
            <button className='selectingsTasks__created' onClick={() => taskStore.getCreatedTasks(userStore.userData.login)}>Задачи моим подчинённым</button>
        </div>
    );
})

export default SelectingsTasks;