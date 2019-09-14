import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
      margin: `24px`,
    },
    cardHeader: {
        margin: theme.spacing(1, 1, 0, 1),
    },
    cardContent: {
      margin: theme.spacing(0, 2, 1, 2),
      backgroundColor: theme.palette.primary.light,
      borderRadius: `4px`,
    },
    cardActions: {
      padding: 14,
      fontSize: "medium",
      fontWeight: "bold",
      justifyContent: "center"
    }
}));

const HomepageCard = ({ title, description, buttonText, path }) => {
    const classes = useStyles();

    return (
        <Grid item key={title} className={classes.root} xs={12} sm={6} md={4}>
            <Card raised={true}>
                <CardHeader
                    title={title}
                    titleTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                />
                <CardContent className={classes.cardContent} >
                    <Typography variant="subtitle1" align="center">
                        { description }
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button
                        component={Link}
                        to={path}
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        { buttonText }
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default HomepageCard;
