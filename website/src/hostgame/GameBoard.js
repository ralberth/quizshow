import React from 'react';
import GameCell from './GameCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core';

const BorderlessTableCell = withStyles(theme => ({
    root: {
      borderBottom: 0,
      padding: 0,
    }
}))(TableCell);

/*
 * Matrix (2D array): rows are rows to display, columns are cols (one col per category).
 * This is purpose-built to make render() easy to understand.  Rows here are the same as
 * the <TableRow> below.  Columns here (cells in a row) are <TableCell> in the render()
 * below.  The order of columns in each row corresponds to the order of categories in
 * "categories" passed in.
 * For safety, this doesn't change anything in the input game.  It builds a structure
 * full of pointers into game.
 */
const createMatrixFromGame = (game) => {
    const catgs = {}; // map from catg name to list of pointers to questions (sorted)
    game.categories.forEach(catg =>
        catgs[catg.catgId] = catg.questions
            .map(q => q) // make new array with pointers to existing question objects
            .sort((a,b) => a.points - b.points)); // sort my copy array

    const mat = [];
    while(true) {
        const row = [];
        game.categories.forEach(catg => row.push(catgs[catg.catgId].shift()));
        const nonNullEntries = row.find(x => x !== null);
        if (nonNullEntries)
            mat.push(row);
        else
            break;
    }

    return mat;
};

const GameBoard = ({ game }) => {
    const ranks = createMatrixFromGame(game);
    return (
        <Table style={{ tableLayout: "fixed" }}>
            <TableHead>
                <TableRow>
                    {game.categories.map(catg => (
                        <BorderlessTableCell key={`catg_${catg.categoryName}`}>
                            <GameCell points={catg.categoryName}
                              rank={'Catg'}
                              state={'open'} />
                        </BorderlessTableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody >
                {ranks.map((rank, rankNum) => (
                    <TableRow key={`row_${rankNum}`} >
                        {rank.map((ques, quesNum) => (
                            <BorderlessTableCell key={`cell_${rankNum}_${quesNum}`} padding="none">
                                { ques ? (<GameCell
                                            points={ques.points}
                                            rank={rankNum}
                                            state={ques.state} />)
                                        : "" }
                            </BorderlessTableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default GameBoard;
