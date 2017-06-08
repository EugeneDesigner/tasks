'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputBlock from '../../components/inputBlock';
import styles from '../styles.css';

export default class TaskMenu extends Component {
    constructor() {
        super();
        this.state = {
            selectedProject: ''
        };

        this.onChange = this.onChange.bind(this);
        this.sortByPriority = this.sortByPriority.bind(this);
    }

    onChange(project) {
        this.props.onTasksListFilter(project);
        this.setState({
            selectedProject: project
        });
    }

    sortByPriority(e) {
        this.props.onTasksListSort(e.target.checked);
    }

    render() {
        return (
            <div className={styles.tasksMenu}>
                <button
                    className={styles.tasksMenuItem}
                    onClick={() => this.props.onTaskAdd()}>
                    Новая задача
                </button>
                <div className={styles.tasksMenuItem}>
                    <input
                        type="checkbox"
                        onClick={(e) => this.sortByPriority(e)}
                        name="lol"
                    />по приоритету
                </div>
                <div className={styles.tasksMenuItem}>
                    <InputBlock value={this.state.selectedProject}
                                onChange={(value) => this.onChange(value)}
                                range={this.props.projects}
                                inputType='selection'
                    />
                </div>

            </div>
        );
    }
}

TaskMenu.propTypes = {
    onTaskAdd: PropTypes.func.isRequired,
    onTasksListSort: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    onTasksListFilter: PropTypes.func.isRequired
};
