import React from 'react';

import { Alert } from 'react-bootstrap';

const alert = (props) => {
    let alertElement = null;
    if (props.errorMessage) {
        alertElement = 
            <Alert variant="danger" role="alert">
                <p>
                    {props.errorMessage}
                </p>
            </Alert>;
    }

    return (
        <div>
            {alertElement}
        </div>
    );
};

export default alert;