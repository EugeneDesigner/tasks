'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.css';
import InputBlock from '../../components/inputBlock';
import FormButtons from '../../components/formButtons';

export default class TaskInputBlock extends Component {
    constructor() {
        super();
        this.state = {
            task: {
                title: '',
                project: '',
                priority: 1,
                description: ''
            }
        };

        this.onChange = this.onChange.bind(this);
        this.submitTask = this.submitTask.bind(this);
    }

    componentDidMount() {
        if (this.props.task) {
            this.setState({task: this.props.task});
        }
    }

    submitTask() {
        let canBeSubmitted = true;

        Object.values(this.state.task).forEach((value) => {
            if (!value) {
                canBeSubmitted = false;
            }
        });

        if (canBeSubmitted) {
            this.props.onSave(this.state.task);
        }
    }

    onChange(value, field) {
        let task = this.state.task;
        task[field] = value;

        return this.setState({task});
    }

    render() {
        return (
            <section className={styles.inputBlock}>
                <InputBlock
                    label='Название задачи'
                    value={this.state.task.title}
                    inputType='text'
                    onChange={(value, field) => this.onChange(value, 'title')}
                />
                <InputBlock
                    label='Название проекта'
                    value={this.state.task.project}
                    inputType='text'
                    onChange={(value, field) => this.onChange(value, 'project')}
                />
                <InputBlock
                    label='Приоритет'
                    inputType='selection'
                    value={this.state.task.priority}
                    onChange={(value, field) => this.onChange(value, 'priority')}
                />
                <InputBlock
                    label='Описание'
                    value={this.state.task.description}
                    inputType='description'
                    onChange={(value, field) => this.onChange(value, 'description')}
                />
                <FormButtons onSave={this.submitTask} onCancel={this.props.onCancel}/>
            </section>
        );
    }
}

TaskInputBlock.propTypes = {
    task: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};
