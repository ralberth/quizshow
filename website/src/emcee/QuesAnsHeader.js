import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => {
  return {
    catgPoints: {
        margin: `2rem`,
        textAlign: `left`
    },
    quesAns: {
      fontWeight: `bold`,
      margin: `6rem`,
      textAlign: `center`
    }
  };
});

const QuesAnsHeader = ({ ques }) => {
    const classes = useStyles();
    return (
        <Box>
            <Typography className={classes.catgPoints}>
                {ques.categoryName} for {ques.points} points:
            </Typography>
            <Typography className={classes.quesAns} variant="h5">
                {
                    ques.state === 'open'
                        ? `A: ${ques.answer}`
                        : `Q: ${ques.question}`
                }
            </Typography>
        </Box>
    );
}

export default QuesAnsHeader;
