'use strict';

import React from 'react';
import styles from './styles.css';
import PropTypes from 'prop-types';

const InputField = ({label, value, inputType, onChange, range}) => {
    const renderSelectionRange = () => {
        let selectionRange = range ? range : [...Array(10).keys()];

        return selectionRange.map((item, index) => {
            return (
                <option value={item}
                        key={index}>
                    {item}
                </option>
            );
        });
    };

    const renderInputField = () => {
        if (inputType === 'text') {
            return (
                <input type="text"
                       value={value}
                       className={styles.inputField}
                       onChange={(content) => onChange(content.target.value)}/>
            );
        } else if (inputType === 'selection') {
            return (
                <select
                    value={value}
                    className={styles.inputField}
                    onChange={(content) => onChange(content.target.value)}>
                    {renderSelectionRange()}
                </select>
            );
        } else {
            return (
                <textarea
                    onChange={(content) => onChange(content.target.value)}
                    className={styles.textField}
                    value={value}
                />
            );
        }
    };

    return (
        <div className={styles.inputBlock}>
            <label className={!value ? styles.emptyField : null}>{label}</label>
            {renderInputField()}
        </div>
    );
};

InputField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    inputType: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    range: PropTypes.array
};


export default InputField;
