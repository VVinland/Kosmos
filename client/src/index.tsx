import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/User-store';
import TaskStore from './store/Task-store';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

interface ContextStore {
    userStore: UserStore,
    taskStore: TaskStore
}


export const Context = React.createContext({} as ContextStore);


root.render(
    // <React.StrictMode>
    <Context.Provider value={{
        userStore: new UserStore(),
        taskStore: new TaskStore()
    }}>
        <App />
    </Context.Provider>
    /* </React.StrictMode> */
);