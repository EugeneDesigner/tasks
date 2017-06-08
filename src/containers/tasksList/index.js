'use strict';

import React, {Component} from 'react';
import styles from '../styles.css';
import Task from '../../components/task';
import PropTypes from 'prop-types';

export default class TasksList extends Component {
    constructor() {
        super();

        this.renderTasksList = this.renderTasksList.bind(this);
    }

    renderTasksList() {
        let tasks = [...this.props.tasks];

        if (this.props.sortTasks) {
            tasks = tasks.sort((a, b) => a.priority - b.priority);
        }

        if (this.props.filterTasksByProject) {
            tasks = this.props.filterTasksByProject === 'Все'
                ? tasks
                : tasks.filter((task) => task.project === this.props.filterTasksByProject);
        }

        return tasks.map((task, index) => {
            return (
                <Task
                    onEdit={(task) => this.props.onTaskEdit(task)}
                    onDelete={(task) => this.props.onTaskDelete(task)}
                    task={task}
                    key={index}
                />
            );
        });
    }

    render() {
        return (
            <ul className={styles.tasksList}>
                {this.props.tasks.length ? this.renderTasksList() : null}
            </ul>
        );
    }
}

TasksList.propTypes = {
    tasks: PropTypes.array.isRequired,
    onTaskEdit: PropTypes.func.isRequired,
    onTaskDelete: PropTypes.func.isRequired,
    sortTasks: PropTypes.bool.isRequired,
    filterTasksByProject: PropTypes.string.isRequired
};
