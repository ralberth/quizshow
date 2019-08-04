import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './homepage.scss';

const HomepageCard = (props) => (
    <Grid item key={props.title} xs={12} sm={6} md={4}>
        <Card raised={true}>
            <CardHeader
                title={props.title}
                titleTypographyProps={{ align: 'center' }}
                className="cardHeader"
            />
            <CardContent>
                <Typography variant="subtitle1" align="center">
                    {props.description}
                </Typography>
                {/* {optionalInputField} */}
            </CardContent>
            <CardActions
                className="cardActions"
                style={{justifyContent: 'center'}}
            >
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

export default HomepageCard;
