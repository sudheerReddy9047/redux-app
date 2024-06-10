import React, { useEffect } from 'react';
import "./Tasks.css";
import { useState } from "react";
import Collapsible from '../Collapsible/Collapsible';
import { connect } from 'react-redux';
import { createTask, deleteTask, fetchTasks } from '../data/actionTypes';

function Tasks(props) {

    console.log('Props :', props);
    let [isNewTaskOpen, setIsNewTaskOpen] = useState(false);

    let [newTask, setNewTask] = useState({
        title: '',
        dateTime: ''
    });

    let dispatchAction = props.dispatch;

    let onSaveClick = () => {
        onCancelClick();
        dispatchAction(createTask(newTask));
    };

    let onCancelClick = () => {
        setIsNewTaskOpen(!isNewTaskOpen);
        setNewTask({
            title: '',
            dateTime: ''
        });
    }

    let onTaskDelete = (item) => dispatchAction(deleteTask(item));

    useEffect(() => dispatchAction(fetchTasks()), [dispatchAction]);

    const savedTasks = props.tasks;

    return (
        <div className="outer-container">
            <div className="container">
                <div className="app-title-container">
                    <div className="app-title">
                        <h1>Tasks</h1>
                    </div>

                    <div className="create-button-container">
                        {!isNewTaskOpen ? <button className="button create-button" onClick={() => { setIsNewTaskOpen(!isNewTaskOpen); }}>
                            <i className="fa fa-calendar-plus"></i>
                            &nbsp;&nbsp;
                            Create
                        </button> : null}
                    </div>
                </div>

                <Collapsible isOpen={isNewTaskOpen}>
                    <div className="new-task-container">
                        <h4 className="new-task-title">New Task</h4>

                        {/* form group starts */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="task-title">Task Title:</label>
                            <div className="form-input">
                                <input type="text" placeholder="Task Title" className="text-box" id="task-title" value={newTask.title} onChange={(event) => {
                                    setNewTask({ ...newTask, title: event.target.value })
                                }} />
                            </div>

                        </div>
                        {/* form group ends */}

                        {/* form group starts */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="task-date-time">Task Date and Time:</label>
                            <div className="form-input">
                                <input type="datetime-local" placeholder="Task Date and Time" className="text-box" id="task-date-time" value={newTask.dateTime} onChange={(event) => {
                                    setNewTask({ ...newTask, dateTime: event.target.value })
                                }} />
                            </div>
                        </div>
                        {/* form group ends */}

                        <div className="button-group">
                            <button className="button save-button" onClick={() => { onSaveClick(); }}>
                                <i className="fa fa-save"></i>&nbsp;&nbsp;
                                Save Task
                            </button>

                            <button className="button cancel-button" onClick={() => { onCancelClick(); }}>
                                <i className="fa fa-window-close"></i>&nbsp;&nbsp;
                                Cancel
                            </button>
                        </div>
                    </div>
                </Collapsible>

                <div className="search-box">
                    <input type="search" placeholder="Search" />
                    <i className="fa fa-search"></i>
                </div>

                <div className="content-body">

                    {
                        savedTasks?.data?.map(eachTask => (
                            <div className="task" key={eachTask.id}>
                                <div className="task-body">
                                    <div className="task-title">
                                        <i className="fa fa-thumbtack"></i>
                                        <span className="task-title-text">{eachTask.title}</span>
                                    </div>
                                    <div className="task-subtitle">
                                        <i className="far fa-clock"></i> <span className="task-subtitle-text">{eachTask.dateTime}</span>
                                    </div>
                                </div>

                                <div className="task-options">
                                    <button className="icon-button" title="Delete" onClick={() => onTaskDelete(eachTask)}>&times;</button>
                                </div>
                            </div>)
                        )
                    }

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}
export default connect(mapStateToProps)(Tasks);


