'use strict';

import React, {Component} from 'react';
import styles from './styles.css';
import TasksList from './tasksList';
import TaskInputBlock from './taskInputBlock';
import TasksMenu from './tasksMenu';
import uuid from 'uuid';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            editedTask: '',
            newTask: false,
            projects: ['Все'],
            sortTasks: false,
            filterTasksByProject: 'Все'
        };

        this.updateTasks = this.updateTasks.bind(this);
        this.sortTasks = this.sortTasks.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.hideTaskInputBlock = this.hideTaskInputBlock.bind(this);
        this.showTaskInputBlock = this.showTaskInputBlock.bind(this);
        this.filterTasksByProject = this.filterTasksByProject.bind(this);
    }

    componentDidMount() {
        this.setState({
            tasks: JSON.parse(localStorage.getItem('tasks')) || [],
            projects: JSON.parse(localStorage.getItem('projects')) || ['Все']
        });
    }

    updateTasks(task) {
       let updatedTasks;
       let updatedProjects;

        if (task.hasOwnProperty('id')) {
            updatedTasks = this.state.tasks.map((previousTask) => (task.id === previousTask.id ? task : previousTask));
        } else {
            task['id'] = uuid();
            updatedTasks = [...this.state.tasks, task];
        }

        updatedProjects = this.state.projects.includes(task.project)
            ? this.state.projects
            : [...this.state.projects, task.project];

        this.setState({tasks: updatedTasks, projects: updatedProjects});
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        localStorage.setItem('projects', JSON.stringify(updatedProjects));

        this.hideTaskInputBlock();
    }

    sortTasks(sortByPriority) {
        return this.setState({sortTasks: sortByPriority});
    }

    filterTasksByProject(projectName) {
        return this.setState({filterTasksByProject: projectName});
    }

    deleteTask(deletedTask) {
        let deletedTaskProjectCount = 0;

        let updatedTasks = this.state.tasks.filter((task) => {
            if (task.project === deletedTask.project) {
                deletedTaskProjectCount++;
            }

            return task.id !== deletedTask.id;
        });

       this.setState({
           tasks: updatedTasks,
           projects: deletedTaskProjectCount === 1
               ? this.state.projects.filter((project) => project !== deletedTask.project)
               : this.state.projects
       });

       return this.hideTaskInputBlock();
    }

    hideTaskInputBlock() {
        return this.setState({
            editedTask: '',
            newTask: false
        });
    }

    showTaskInputBlock(task) {
        if (task) {
            return this.setState({editedTask: task});
        } else {
            return this.setState({newTask: true});
        }
    }

    renderTaskInputBlock() {
        if (this.state.editedTask) {
            return (
                <TaskInputBlock
                    task={this.state.editedTask}
                    onSave={(task) => this.updateTasks(task)}
                    onCancel={this.hideTaskInputBlock}
                />
            );
        } else if (this.state.newTask) {
            return (
                <TaskInputBlock
                    onSave={(task) => this.updateTasks(task)}
                    onCancel={this.hideTaskInputBlock}
                />
            );
        } else {
            return (
                <TasksMenu
                    onTasksListSort={this.sortTasks}
                    onTasksListFilter={(project) => this.filterTasksByProject(project)}
                    projects={this.state.projects}
                    onTaskAdd={this.showTaskInputBlock}
                />
            );
        }
    }

    render() {
        return (
            <section className={styles.app}>
                <h1 className={styles.tasksHeader}>todo:</h1>
                <TasksList
                    tasks={this.state.tasks}
                    onTaskEdit={(task) => this.showTaskInputBlock(task)}
                    onTaskDelete={(task) => this.deleteTask(task)}
                    sortTasks={this.state.sortTasks}
                    filterTasksByProject={this.state.filterTasksByProject}

                />
                {this.renderTaskInputBlock()}
            </section>
        );
    }
}
