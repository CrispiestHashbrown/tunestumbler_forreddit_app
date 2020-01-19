import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const materialClasses = makeStyles({
    subredditAndDomain: {
        color: '#7f8385',
        fontSize: 15
    },
    title: {
        fontSize: 18
    },
    paper: {
        paddingTop: '5px',
        paddingRight: '5px',
        overflow: 'hidden'
    },
    score: {
        paddingLeft: '12px',
        paddingTop: '25px',
        paddingRight: '12px',
        color: '#008FE6',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    date: {
        color: '#7f8385',
        fontSize: 13,
        marginBottom: 0
    },
    button: {
        color: '#878a8c',
        outlineColor: '#e7e7e7',
        textTransform: 'none',
        marginBottom: 0
    }
});

const result = (props) => (
    <Container maxWidth="xl">
        <Paper variant="outlined" className={materialClasses().paper}>
            <Grid container wrap="nowrap">
                <Grid item>
                    <Typography className={materialClasses().score}>
                        {props.score} 
                        <br />
                        Upvotes
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={materialClasses().subredditAndDomain} gutterBottom>
                        [r/{props.subreddit}] ({props.domain})
                    </Typography>
                    <Typography component="h2" className={materialClasses().title}>
                        <a 
                            style={{
                                display: 'table-cell'
                            }}
                            href={props.titleUrl}
                            target="_blank">{props.title}</a>
                    </Typography>
                    <Typography className={materialClasses().date}>
                        submitted: {moment.unix(props.date).format(' h:mmA MMMM Do, YYYY')}
                    </Typography>
                    <Button 
                        target="_blank" 
                        href={props.commentsUrl}
                        className={materialClasses().button}>{props.comments} comments</Button>
                </Grid>
            </Grid>
        </Paper>
    </Container>
);

export default result;