import React from 'react';
import GameCell from './GameCell';
import Faceoff from "../faceoff/Faceoff";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core';

const CategoryTableCell = withStyles(theme => ({
    head: {
        color: "slateblue",
        fontSize: 24,
        textAlign: "center"
    }
}))(TableCell);

const createQuesIdMap = (questions) => {
    const ret = {};
    questions.forEach(ques => {
        ret[`ques${ques.quesId}`] = ques;
    });
    return ret;
};

/*
 * Matrix (2D array): rows are rows to display, columns are cols (one col per category).
 * This is purpose-built to make render() easy to understand.  Rows here are the same as
 * the <TableRow> below.  Columns here (cells in a row) are <TableCell> in the render()
 * below.  The order of columns in each row corresponds to the order of categories in
 * "categories" passed in.
 */
const createMatrixFromQuesList = (categories, questions) => {
    questions.forEach(q => console.log(q));
    // Intermediate helper: maps catgId to an array of questions in prize order
    const catMap = {};
    categories.forEach(catg => {
        const quesThisCatg = [];
        for(var i = 0; i < questions.length; i++) {
            if (questions[i].catgId === catg.catgId)
                quesThisCatg.push(questions[i]);
        }
        catMap[catg.catgId] = quesThisCatg;
    });

    // Convert catMap into 2D array
    const mat = [];
    while(true) {
        const row = [];
        categories.forEach(catg => row.push(catMap[catg.catgId].shift()));
        const nonNullEntries = row.find(x => x !== null);
        if (nonNullEntries)
            mat.push(row);
        else
            break; // all arrays in catMap exhausted
    }

    return mat;
};

class GameBoard extends React.Component {

    quesIdMap = {}; // Key:quesId, Value:Question object

    constructor({ game }) {
        super();
        this.game = game;
        this.quesIdMap = createQuesIdMap(game.questions);
    }

    render() {
        const ranks = createMatrixFromQuesList(this.game.categories, this.game.questions);
        console.log(ranks);
        return (
            <div>
                <Table style={{ tableLayout: "fixed" }}>
                    <TableHead>
                        <TableRow>
                            {this.game.categories.map(catg => (
                                <CategoryTableCell key={`catg_${catg.catgId}`}>
                                    {catg.categoryName}
                                </CategoryTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ranks.map((rank, rankNum) => (
                            <TableRow key={`row_${rankNum}`}>
                                {rank.map((ques, quesNum) => (
                                    <TableCell key={`cell_${rankNum}_${quesNum}`}>
                                        { ques ? (<GameCell
                                                    prize={ques.prize}
                                                    state={ques.state} />)
                                               : "" }
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Faceoff
                    isOpen={false}
                    category="MyCategory"
                    prize="100"
                    question="Lorem ipsum dolor sic amet?"/>
            </div>
        );
    }
}

export default GameBoard;
