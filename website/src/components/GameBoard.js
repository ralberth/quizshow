import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const GameCell = (props) => (
    <Paper>{props.value}</Paper>
);

class GameBoard extends React.Component {

    game = [
        {
            category: "Foo",
            cells: [
                {
                    value: "$100",
                    question: "Lorem ipsum dolor 1",
                    answer: "another layer 1"
                },
                {
                    value: "$200",
                    question: "Lorem ipsum dolor 2",
                    answer: "another layer 2"
                },
                {
                    value: "$300",
                    question: "Lorem ipsum dolor 3",
                    answer: "another layer 3"
                },
                {
                    value: "$400",
                    question: "Lorem ipsum dolor 4",
                    answer: "another layer 4"
                }
            ]
        },
        {
            category: "Bar",
            cells: [
                {
                    value: "$100",
                    question: "Lorem ipsum dolor 1",
                    answer: "another layer 1"
                },
                {
                    value: "$200",
                    question: "Lorem ipsum dolor 2",
                    answer: "another layer 2"
                },
                {
                    value: "$300",
                    question: "Lorem ipsum dolor 3",
                    answer: "another layer 3"
                },
                {
                    value: "$400",
                    question: "Lorem ipsum dolor 4",
                    answer: "another layer 4"
                }
            ]
        },
        {
            category: "Baz",
            cells: [
                {
                    value: "$100",
                    question: "Lorem ipsum dolor 1",
                    answer: "another layer 1"
                },
                {
                    value: "$200",
                    question: "Lorem ipsum dolor 2",
                    answer: "another layer 2"
                },
                {
                    value: "$300",
                    question: "Lorem ipsum dolor 3",
                    answer: "another layer 3"
                },
                {
                    value: "$400",
                    question: "Lorem ipsum dolor 4",
                    answer: "another layer 4"
                }
            ]
        },
        {
            category: "Wibble",
            cells: [
                {
                    value: "$100",
                    question: "Lorem ipsum dolor 1",
                    answer: "another layer 1"
                },
                {
                    value: "$200",
                    question: "Lorem ipsum dolor 2",
                    answer: "another layer 2"
                },
                {
                    value: "$300",
                    question: "Lorem ipsum dolor 3",
                    answer: "another layer 3"
                },
                {
                    value: "$400",
                    question: "Lorem ipsum dolor 4",
                    answer: "another layer 4"
                }
            ]
        },
        {
            category: "Gronk",
            cells: [
                {
                    value: "$100",
                    question: "Lorem ipsum dolor 1",
                    answer: "another layer 1"
                },
                {
                    value: "$200",
                    question: "Lorem ipsum dolor 2",
                    answer: "another layer 2"
                },
                {
                    value: "$300",
                    question: "Lorem ipsum dolor 3",
                    answer: "another layer 3"
                },
                {
                    value: "$400",
                    question: "Lorem ipsum dolor 4",
                    answer: "another layer 4"
                }
            ]
        }
    ];

    render() {
        return (
            <Container>
                <Grid container spacing={1}>
                    {this.game.forEach(catg => (
                        <Grid
                            container
                            alignContent="flex-start"
                            alignItems="flex-start"
                            direction="row"
                            spacing={3}
                        >
                            <Grid item>
                                <Paper>{catg.category}</Paper>
                                {/* <GameCell value={catg.category} /> */}
                            </Grid>
                            {catg.cells.forEach(cell => (
                                <Grid item>
                                    <GameCell value={cell.value} />
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
}

export default GameBoard;
