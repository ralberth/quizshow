import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { CancelButton, AbortButton, NextButton } from '../common/StandardButtons';

const CancelAbortNextPanel = ({ onCancel, onAbort, onNext }) => (
    <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
    >
        <Grid item>
            <Box display={onCancel ? "block" : "none"}>
                <CancelButton onCancel={onCancel} />
            </Box>
        </Grid>
        <Grid item>
            <Box display={onAbort ? "block" : "none"}>
                <AbortButton onAbort={onAbort} />
            </Box>
        </Grid>
        <Grid item>
            <Box display={onNext ? "block" : "none"}>
                <NextButton onNext={onNext} />
            </Box>
        </Grid>
    </Grid>
);

export default CancelAbortNextPanel;
