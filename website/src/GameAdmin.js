import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {DropzoneArea} from 'material-ui-dropzone'

class GameAdmin extends React.Component {

    // state = {
    //     title: "",
    //     contents: ""
    // }

    // handleName = (event) => this.setState({ title: event.target.value });

    // handleFileUpload = (arry) => {
    //     if (arry.length > 0) {
    //         const reader = new FileReader();
    //         reader.onabort = () => console.log("file reading aborted");
    //         reader.onerror = () => console.log("file reading error");
    //         reader.onload = () => this.setState({ contents: reader.result });
    //         reader.readAsText(arry[0]);
    //     } else
    //         this.setState({ contents: "" });        
    // }

    // createGame = () => {
    //     console.log(this.state);
    // }

    render() {
        return (
            <Container>
                <h1>Game Admin</h1>
            </Container>
        );
    }
}

export default GameAdmin;
