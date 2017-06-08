'use strict';

import React from 'react';
import styles from './styles.css';
import PropTypes from 'prop-types';

let showFullMode = false;

const Task = ({task, onDelete, onEdit}) => {
    let viewButton;
    let taskItem;
    let taskDescription;


    const toggleFullMode = () => {
        showFullMode = !showFullMode;
        viewButton.innerHTML = showFullMode ? 'Свернуть' : 'Развернуть';
        taskItem.style.fontSize = showFullMode ? '18px' : '15px';
        taskDescription.style.display = showFullMode ? 'block' : 'none';
    };


    return (
        <li className={styles.task}
            ref={(element) => {
                taskItem = element;
            }}>
            <div className={styles.taskTitle}>{task.title}</div>

            <div className={styles.taskInfo}>
                <div className={styles.taskProject}>
                    Проект: <span className={styles.projectName}>{task.project}</span>
                </div>
                <div className={styles.taskPriority}>priority: {task.priority}</div>
                <div className={styles.taskDescription}
                     ref={(element) => {
                         taskDescription = element;
                     }}>
                    {task.description}
                </div>
            </div>

            <div className={styles.taskNavigation}>
                <button onClick={() => onEdit(task)}> Изменить </button>
                <button onClick={() => onDelete(task)}> Закрыть </button>
                <button onClick={toggleFullMode}
                        ref={(element) => {
                            viewButton = element;
                        }}
                > {showFullMode ? 'Свернуть' : 'Развернуть'} </button>
            </div>
        </li>
    );
};

Task.propTypes = {
    task: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default Task;
