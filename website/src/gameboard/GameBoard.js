import React from 'react';
// import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GameCell from './GameCell';
// import { styled } from '@material-ui/styles';
import Faceoff from "../faceoff/Faceoff";


const GameBoard = ({ game }) => {
    // console.log(game);

    return (
        <div>
            <Grid
                container
                spacing={8}
                direction="row"
                justify="space-evenly"
                alignItems="stretch"
                // style={{ backgroundColor: 'gray' }}
            >
                {game.categories.map(catg => (
                    <Grid item key={catg.catgId}>
                        <Grid
                            container
                            alignContent="flex-start"
                            alignItems="stretch"
                            direction="column"
                            justify="space-evenly"
                            spacing={3}
                            key={catg.catgId}
                        >
                            <Grid item>
                                <Typography
                                    align="center"
                                    variant="h4"
                                >
                                    {catg.categoryName}
                                </Typography>
                            </Grid>
                            {game.questions
                                    .filter(e => e.catgId = catg.catgId)
                                    .sort((a,b) => a.prize - b.prize)
                                    .map(cell => (
                                        <Grid item key={cell.question}>
                                            <GameCell
                                                prize={cell.prize}
                                                closed={false} />
                                        </Grid>
                                    ))
                            }
                        </Grid>
                    </Grid>
                ))}
            </Grid>

            <Faceoff isOpen={false} question="Lorem ipsum dolor sic amet?"/>
        </div>
    );
}

export default GameBoard;
