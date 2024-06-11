import { applyMiddleware, combineReducers, createStore } from "redux";
import { initialTasks } from "./tasks";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import promise from 'redux-promise-middleware';


export const CREATE_TASK = 'CREATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const FETCH_TASK = 'FETCH_TASK';
export const FETCH_TASK_REJECTED = 'FETCH_TASK_REJECTED';
export const FETCH_TASK_FULFILLED = 'FETCH_TASK_FULFILLED';
export const FETCH_TASK_PENDING = 'FETCH_TASK_PENDING';

export const createTask = (item) => ({
    type: CREATE_TASK,
    payload: item
});

export const deleteTask = (item) => ({
    type: DELETE_TASK,
    payload: item
});

export const fetchTasks = () => ({
    type: FETCH_TASK,
    payload: axios.get("http://localhost:5000/tasks")
})

export const taskReducer = (state = { data: initialTasks, loading: false }, action) => {
    switch (action.type) {
        case CREATE_TASK: {
            console.log('state :', state);
            const currTasks = [...state.data];
            action.payload.id = +((Math.random() * 100).toFixed(0));
            currTasks.push(action.payload);
            return { data: currTasks };
        }

        case DELETE_TASK: {
            const currTasks = [...state.data];
            const ind = currTasks.findIndex(item => item.id === action.payload.id);
            if (ind > -1) {
                currTasks.splice(ind, 1);
            }
            return { data: currTasks };
        }

        case FETCH_TASK_PENDING: {
            return { data: [], loading: false }
        }
        case FETCH_TASK_FULFILLED: {
            return { data: action.payload.data, loading: false }
        }
        case FETCH_TASK_REJECTED: {
            return { data: state.data, loading: false }
        }

        default: {
            return state;
        }
    }
}


const allReducers = combineReducers({ tasks: taskReducer });
const customMiddleWare = (state) => (next) => (action) => {
    console.log('Before Dispatch');
    next(action);
    console.log('After dispatch :', next);
}
export const taskStore = createStore(allReducers, composeWithDevTools(applyMiddleware(promise, customMiddleWare)));