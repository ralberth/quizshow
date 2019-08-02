import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {DropzoneArea} from 'material-ui-dropzone'

class CreateQuiz extends React.Component {

    state = {
        title: "",
        contents: ""
    }

    handleName = (event) => this.setState({ title: event.target.value });

    handleFileUpload = (arry) => {
        if (arry.length > 0) {
            const reader = new FileReader();
            reader.onabort = () => console.log("file reading aborted");
            reader.onerror = () => console.log("file reading error");
            reader.onload = () => this.setState({ contents: reader.result });
            reader.readAsText(arry[0]);
        } else
            this.setState({ contents: "" });        
    }

    createGame = () => {
        console.log(this.state);
    }

    render() {
        return (
            <Container>
                <h1>Games You Own</h1>

                [none]


                <h1>Create a New Game</h1>

                <Grid
                    container
                    alignContent="flex-start"
                    alignItems="flex-start"
                    direction="column"
                    spacing={3}
                >
                    <Grid item>
                        <TextField
                            label="Quiz game title"
                            margin="normal"
                            onChange={this.handleName}
                        />
                    </Grid>
                    <Grid item>
                        <DropzoneArea
                            dropzoneText="Drop game files here to upload"
                            acceptedFiles={[ 'text/plain' ]}
                            filesLimit={1}
                            onChange={this.handleFileUpload}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.createGame}
                        >
                            Create Game
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default CreateQuiz;
