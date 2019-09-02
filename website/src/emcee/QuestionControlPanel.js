import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: `bold`
    },
    panelSummary: {
      height: theme.typography.pxToRem(70)
    },
    button: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        fontSize: theme.typography.pxToRem(18)
    }
}));

const QuesButton = ({ points, disabled, onClick }) => {
    const classes = useStyles();
    return (
        <Button
            variant="contained"
            className={classes.button}
            onClick={onClick}
            disabled={disabled}
        >
            {points}
        </Button>
    );
}

const QuestionControlPanel = ({ game, onClick }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const launchQuestion = (ques) => () => onClick(ques);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box className={classes.root}>
            {game.categories.map(catg => (
                <ExpansionPanel
                    key={catg.categoryName}
                    expanded={expanded === catg.catgId}
                    onChange={handleChange(catg.catgId)}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        id={`panel_${catg.catgId}`}
                        className={classes.panelSummary}
                    >
                        <Typography className={classes.heading}>{catg.categoryName}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            {catg.questions.map(ques => (
                                <Grid
                                    item
                                    key={ques.quesId}
                                >
                                    <QuesButton
                                        points={ques.points}
                                        disabled={ques.state === 'closed'}
                                        onClick={launchQuestion(ques)} />
                                </Grid>
                            ))}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </Box>
    );
}

export default QuestionControlPanel;
