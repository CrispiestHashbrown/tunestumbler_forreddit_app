import React from 'react';

import { Container, Jumbotron } from 'react-bootstrap';

const jumbotron = (props) => {
    return (
        <Jumbotron className={props.jumbotronClass} fluid>
            <Container>
                <h1>{props.title}</h1>
                <p>{props.message}</p>
            </Container>
            {props.form}
        </Jumbotron>
    );
}

export default jumbotron;
