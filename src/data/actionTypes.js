import { applyMiddleware, combineReducers, createStore } from "redux";
import { initialTasks } from "./tasks";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import * as thunk from 'redux-thunk';


export const CREATE_TASK = 'CREATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const FETCH_TASK = 'FETCH_TASK';

export const createTask = (item) => ({
    type: CREATE_TASK,
    payload: item
});

export const deleteTask = (item) => ({
    type: DELETE_TASK,
    payload: item
});

export const fetchTasks = () => {
    return (dispatch) => {
        axios.get("http://localhost:5000/tasks").then(r => {
            console.log('r :', r);
            dispatch({
                type: FETCH_TASK,
                payload: r.data
            });
        })
    }
};

export const taskReducer = (state = initialTasks, action) => {
    switch (action.type) {
        case CREATE_TASK: {
            const currTasks = [...state];
            action.payload.id = +((Math.random() * 100).toFixed(0));
            currTasks.push(action.payload);
            return currTasks;
        }

        case DELETE_TASK: {
            const currTasks = [...state];
            const ind = currTasks.findIndex(item => item.id === action.payload.id);
            if (ind > -1) {
                currTasks.splice(ind, 1);
            }
            return currTasks;
        }

        case FETCH_TASK: {
            console.log('action :', action);
            return action.payload
        }

        default: {
            return state;
        }
    }
}


const allReducers = combineReducers({ tasks: taskReducer });
export const taskStore = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk.thunk)));