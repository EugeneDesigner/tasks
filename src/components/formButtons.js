'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const FormButtons = ({onSave, onCancel}) => (
    <div>
        <button onClick={onSave}> Save Changes </button>
        <button onClick={onCancel}> Cancel </button>
    </div>
);

FormButtons.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default FormButtons;
