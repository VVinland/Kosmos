import React, { useContext } from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const SelectingsTasks = observer(() => {

    const { userStore, taskStore } = useContext(Context);

    return (
        <div className="selectingsTasks">
            <button onClick={() => taskStore.getAssignedTasks(userStore.userData.login)}>Мои задачи</button>
            <button onClick={() => taskStore.getCreatedTasks(userStore.userData.login)}>Задачи моим подчинённым</button>
        </div>
    );
})

export default SelectingsTasks;