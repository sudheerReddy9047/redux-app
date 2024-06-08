import React from 'react';
import Tasks from '../Tasks/Tasks';
import { Provider } from 'react-redux';
import { taskStore } from './../data/actionTypes';

const App = () => {
    return (
        <Provider store={taskStore}>
            <Tasks></Tasks>
        </Provider>
    );
}

export default App;
