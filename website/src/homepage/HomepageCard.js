import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    cardHeader: {
        background: "#eee",
        padding: 8
    },
    cardActions: {
      padding: 14,
      background: "#eee",
      fontSize: "medium",
      fontWeight: "bold",
      justifyContent: "center"
    }
}));

const HomepageCard = (props) => {
    const classes = useStyles();

    return (
        <Grid item key={props.title} xs={12} sm={6} md={4}>
            <Card raised={true}>
                <CardHeader
                    title={props.title}
                    titleTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                />
                <CardContent>
                    <Typography variant="subtitle1" align="center">
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={props.onClick}
                    >
                        {props.buttonText}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default HomepageCard;
