import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { DropzoneArea } from 'material-ui-dropzone';
import React from 'react';
import ClosableDialog from "./util/ClosableDialog";

class CreateGame extends React.Component {

    state = {
        title: "",
        contents: "",
        code: "",
        modalOpen: false,
        gameId: ""
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

    createGame = () => this.setState({ modalOpen: true, gameId: "QS-1234" });

    handleLaunch = () => this.props.history.push(`/gameadmin/${this.state.gameId}`);
    
    handleClose = () => this.props.history.push("/gameadmin");

    render() {
        return (
            <Container>
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
                            fullWidth={true}
                            required={true}
                            onChange={this.handleName}
                        />
                    </Grid>
                    <Grid item>
                        <DropzoneArea
                            dropzoneText="Drop game files here to upload"
                            acceptedFiles={[ 'text/csv' ]}
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

                <ClosableDialog
                    open={this.state.modalOpen}
                    title="New Game Created"
                    buttonLabel="Launch game!"
                    onClick={this.handleLaunch}
                    onClose={this.handleClose}
                >
                    Your game with ID {this.state.gameId} is ready to go.
                </ClosableDialog>
            </Container>
        );
    }
}

export default CreateGame;
