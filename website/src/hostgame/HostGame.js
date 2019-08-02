import React from 'react';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';
import GameBoard from "../gameboard/GameBoard";

const GameTitle = styled(Typography)({
    margin: "40px",
    padding: "40px"
});

const game = [
    {
        category: "Dog Breeds",
        cells: [
            {
                prize: 100,
                question: "Lorem ipsum dolor 1",
                answer: "another layer 1"
            },
            // {
            //     prize: "$200",
            //     question: "Lorem ipsum dolor 2",
            //     answer: "another layer 2"
            // },
            // {
            //     prize: "$300",
            //     question: "Lorem ipsum dolor 3",
            //     answer: "another layer 3"
            // },
            {
                prize: 400,
                question: "Lorem ipsum dolor 4",
                answer: "another layer 4"
            }
        ]
    },
    {
        category: "Show Tunes",
        cells: [
            {
                prize: 100,
                question: "Lorem ipsum dolor 1",
                answer: "another layer 1"
            },
            {
                prize: 200,
                question: "Lorem ipsum dolor 2",
                answer: "another layer 2"
            },
            {
                prize: 300,
                question: "Lorem ipsum dolor 3",
                answer: "another layer 3"
            },
            {
                prize: 400,
                question: "Lorem ipsum dolor 4",
                answer: "another layer 4"
            }
        ]
    },
    {
        category: "Less Than Zero",
        cells: [
            {
                prize: 100,
                question: "Lorem ipsum dolor 1",
                answer: "another layer 1"
            },
            {
                prize: 200,
                question: "Lorem ipsum dolor 2",
                answer: "another layer 2"
            },
            {
                prize: 300,
                question: "Lorem ipsum dolor 3",
                answer: "another layer 3"
            },
            {
                prize: 400,
                question: "Lorem ipsum dolor 4",
                answer: "another layer 4"
            }
        ]
    },
    {
        category: "Impossible Math",
        cells: [
            {
                prize: 100,
                question: "Lorem ipsum dolor 1",
                answer: "another layer 1"
            },
            {
                prize: 200,
                question: "Lorem ipsum dolor 2",
                answer: "another layer 2"
            },
            {
                prize: 300,
                question: "Lorem ipsum dolor 3",
                answer: "another layer 3"
            },
            {
                prize: 400,
                question: "Lorem ipsum dolor 4",
                answer: "another layer 4"
            }
        ]
    },
    {
        category: "Star Trek Quotes",
        cells: [
            {
                prize: 100,
                question: "Lorem ipsum dolor 1",
                answer: "another layer 1"
            },
            // {
            //     prize: 200,
            //     question: "Lorem ipsum dolor 2",
            //     answer: "another layer 2"
            // },
            {
                prize: 300,
                question: "Lorem ipsum dolor 3",
                answer: "another layer 3"
            },
            {
                prize: 400,
                question: "Lorem ipsum dolor 4",
                answer: "another layer 4"
            }
        ]
    }
];

class HostGame extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    render() {
        return (
            <div>
                <GameTitle
                    variant="h3"
                    align="center"
                >
                    {this.props.title}
                </GameTitle>
                <GameBoard game={game} />
            </div>
        );
    }
}

export default HostGame;
