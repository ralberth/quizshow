import React from 'react';
// import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GameCell from './GameCell';
// import { styled } from '@material-ui/styles';



const GameBoard = (props) => (
    <Grid
        container
        spacing={8}
        direction="row"
        justify="space-evenly"
        alignItems="stretch"
        style={{ backgroundColor: 'gray' }}
    >
        {props.game.map(catg => (
            <Grid item key={catg.category}>
                <Grid
                    container
                    alignContent="flex-start"
                    alignItems="stretch"
                    direction="column"
                    justify="space-evenly"
                    spacing={3}
                    key={catg.category}
                >
                    <Grid item>
                        <Typography
                            align="center"
                            variant="h4"
                        >
                            {catg.category}
                        </Typography>
                    </Grid>
                    {catg.cells.map(cell => (
                        <Grid item key={cell.question}>
                            <GameCell
                                prize={cell.prize}
                                closed={false} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        ))}
    </Grid>
);

export default GameBoard;
