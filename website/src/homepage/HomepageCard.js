import React from 'react';
// import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import './homepage.scss';

class HomepageCard extends React.Component {
    constructor(props) {
        super();
        this.props = props;
    }

    state = {
        code: ""
    };

    setCode = (event) => this.setState({ code: event.target.value });

    render() {
        var optionalInputField = null;
        if (this.props.showInputField)
            optionalInputField = (
                <TextField
                    label="quiz code"
                    margin="normal"
                    variant="outlined"
                    // InputProps={{
                    //   startAdornment: <InputAdornment position="start">QC-</InputAdornment>,
                    // }}
                    onChange={this.setCode}
                />
            );

        return (
            <Grid item key={this.props.title} xs={12} sm={6} md={4}>
                <Card raised={true}>
                    <CardHeader
                        title={this.props.title}
                        titleTypographyProps={{ align: 'center' }}
                        className="cardHeader"
                    />
                    <CardContent>
                        <Typography variant="subtitle1" align="center">
                            {this.props.description}
                        </Typography>
                        {optionalInputField}
                    </CardContent>
                    <CardActions
                        className="cardActions"
                        style={{justifyContent: 'center'}}
                    >
                        {/* <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={props.onClick}
                        >
                            {props.buttonText}
                        </Button> */}
                        <Link to={`${this.props.urlbase}/${this.state.code}`}>
                            {this.props.buttonText}
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

export default HomepageCard;
