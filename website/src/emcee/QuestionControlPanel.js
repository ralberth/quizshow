import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles(theme => ({
    heading: {
      fontSize: "medium",
      fontWeight: "bold"
    },
    button: {
        fontSize: "large"
    }
}));

const CategoryPanel = ({ category, children }) => {
    const classes = useStyles();
    return (
        <Card raised={true}>
            <CardHeader title={category} className={classes.heading} />
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}

const QuesButton = ({ points, onClick }) => {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            className={classes.button}
            onClick={onClick}
        >
            {points}
        </Button>
    );
}

const QuestionControlPanel = ({ game, onClick }) => {

    const launchQuestion = (ques) => () => onClick(ques);

    return (
        <Grid container justify="center" spacing={4}>
            {game.categories.map(catg => (
                <Grid item key={catg.catgId}>
                    <CategoryPanel
                        category={catg.categoryName}
                    >
                        <Grid container spacing={1}>
                            {catg.questions.map(ques => (
                                <Grid item key={ques.quesId}>
                                    <QuesButton
                                        points={ques.points}
                                        onClick={launchQuestion(ques)} />
                                </Grid>))}
                        </Grid>
                    </CategoryPanel>
                </Grid>
            ))}
        </Grid>
    );
}

export default QuestionControlPanel;
