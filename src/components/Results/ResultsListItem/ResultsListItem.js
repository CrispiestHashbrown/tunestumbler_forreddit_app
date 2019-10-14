import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const materialClasses = makeStyles({
    result: {
        float: 'left',
        padding: '6px !important',
        "&:last-child": {
          paddingBottom: '6px !important'
        }
    },
    subredditAndDomain: {
        color: '#7f8385',
        fontSize: 15
    },
    title: {
        fontSize: 18
    },
    noWrap: {
        display: 'block',
        overflow: 'hidden'
    },
    score: {
        color: '#262626',
        fontSize: 16,
        float: 'left',
        align: 'center'
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
    <Card key={props.id} className={materialClasses().noWrap}>
        <CardContent className={materialClasses().result}>
            <Typography className={materialClasses().score}>
                {props.score} 
                <br />
                Upvotes
            </Typography>
        </CardContent>
        <CardContent className={materialClasses().result}>
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
        </CardContent>
    </Card>
);

export default result;