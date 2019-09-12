import React from 'react';
import Grid from '@material-ui/core/Grid';
import { LargeButton } from '../common/StandardButtons';

const CorrectWrongPanel = ({ onCorrect, onWrong }) => (
    <Grid
        container
        direction="row"
        spacing={8}
    >
        <Grid item>
            <LargeButton
                variant="contained"
                color="primary"
                onClick={onCorrect}
            >
                Correct
            </LargeButton>
        </Grid>
        <Grid item>
            <LargeButton
                variant="contained"
                color="secondary"
                onClick={onWrong}
            >
                Wrong
            </LargeButton>
        </Grid>
    </Grid>
);

export default CorrectWrongPanel;
