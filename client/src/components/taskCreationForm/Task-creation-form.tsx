import React from 'react';
import TaskForm from '../taskFrom/Task-form';
const TaskCreationForm = () => {
    return (
        <div className="taskCreationForm">
            <TaskForm sign={'create'} />
        </div>
    );
}

export default TaskCreationForm;