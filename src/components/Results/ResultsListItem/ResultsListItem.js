import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const materialClasses = makeStyles({
    card: {
        minWidth: 150,
    },
    floatLeft: {
        float: 'left',
        marginRight: '5px',
    },
    floatInlineStart: {
        float: 'inline-start',
    },
    inline: {
        display: 'inline-block',
        margin: 0,
        overflow: 'hidden'
    },
    title: {
        fontSize: 14,
    },
    score: {
        fontSize: 20,
        align: 'center',
        display: 'inline'
    },
    pos: {
        marginBottom: 0,
    },
    button: {
        textTransform: 'none'
    }
});

const result = (props) => (
    <Card key={props.id}>
        <CardContent className={materialClasses().inline}>
            <Typography className={materialClasses().score} color='primary'>
                {props.score} Upvotes
            </Typography>
        </CardContent>
        <CardContent className={materialClasses().inline}>
            <Typography className={materialClasses().title} color='textSecondary' gutterBottom>
                ({props.domain})
            </Typography>
            <Typography variant="h6" component="h2">
                <a 
                    style={{display: "table-cell"}}
                    href={props.titleUrl}
                    target="_blank">{props.title}</a>
            </Typography>
            <Typography className={materialClasses().pos} color="textSecondary">
                submitted: {moment.unix(props.date).format(' h:mmA MMMM Do, YYYY')}
            </Typography>
            <Button 
                target="_blank" 
                href={props.commentsUrl}
                className={materialClasses().button}>{props.comments} r/{props.subreddit} comments</Button>
        </CardContent>
    </Card>
);

export default result;