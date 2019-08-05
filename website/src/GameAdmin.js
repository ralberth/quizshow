import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { styled } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import moment from 'moment';
import React from 'react';

const iconStyles = {
    marginRight: 4,
    fontSize: 20
};

const MyAdminIcon  = styled(ChatBubbleIcon)(iconStyles);
const MyHostIcon   = styled(LaunchIcon)(iconStyles);
const MyDeleteIcon = styled(DeleteIcon)(iconStyles);

class GameAdmin extends React.Component {

    state = {
        games: []
    }

    componentDidMount = () => {
        this.setState({
            games: [
                {
                    id: 2938,
                    name: "AWS Services",
                    created: "2019-08-04T14:00:00+0000",
                    players: 5
                },
                {
                    id: 2939,
                    name: "Star Trek Quotes",
                    created: "2019-06-05T14:00:00+0000",
                    players: 0
                },
                {
                    id: 2940,
                    name: "Sports Center",
                    created: "2018-10-06T14:00:00+0000",
                    players: 17
                }
            ]
        });
    };

    handleAdmin = (id) => this.props.history.push(`/gameadmin/${id}`);

    handleHost = (id) => this.props.history.push(`/hostgame/${id}`);

    handleDelete = (id) => console.log(`Delete ${id}`);

    render() {
        return (
            <Container>
                <h1>Games You Own</h1>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell align="right">Current Players</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.games.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                                {moment(row.created).format('MM/DD/YYYY')}
                                &nbsp;<i>({moment(row.created).fromNow()})</i>
                            </TableCell>
                            <TableCell align="right">{row.players}</TableCell>
                            <TableCell>
                                <Box>
                                    <Box m={1}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => this.handleAdmin(row.id)}
                                        >
                                            <MyAdminIcon/>
                                            Admin
                                        </Button>
                                    </Box>
                                    <Box m={1}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => this.handleHost(row.id)}
                                        >
                                            <MyHostIcon/>
                                            Host
                                        </Button>
                                    </Box>
                                    <Box m={1}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => this.handleDelete(row.id)}
                                        >
                                            <MyDeleteIcon/>
                                            Delete
                                        </Button>
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Container>
        );
    }
}

export default GameAdmin;
