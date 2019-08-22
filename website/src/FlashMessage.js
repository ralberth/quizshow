import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// import Slide from "@material-ui/core/Slide";
import MessageBus from './common/MessageBus';

const useStyles = makeStyles(theme => ({
    close: {
      padding: theme.spacing(0.5),
    },
  }));

const FlashMessage = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState();

    new MessageBus().onFlashMessage(data => {
        console.log("FlashMessage:");
        console.log(data);

        if (typeof data === 'string')
            setMessage(data);
        else if (data.errors && data.errors[0] && data.errors[0].message)
            setMessage(data.errors[0].message);
        else
            setMessage(JSON.stringify(data, null, 2));

        setOpen(true);
    });

    const handleClose = (event, reason) => {
      if (reason !== 'clickaway')
          setOpen(false);
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={open}
            onClose={handleClose}
            autoHideDuration={8000}
            ContentProps={{ 'aria-describedby': 'message-id' }}
            message={message}
            // TransitionComponent={<Slide direction="left" />}
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    className={classes.close}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            ]}
        />
    );
  }

  export default FlashMessage;
