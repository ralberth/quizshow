import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import RandomColorAvatar from '../common/RandomColorAvatar';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
  listItem: {
    paddingLeft: theme.spacing(4),
  },
  appTitle: {
    fontWeight: `900`,
    paddingLeft: `10px`,
  },
  accountItem: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  accountText: {
    margin: `16px 0 16px 16px`,
  },
  secondaryAction: {
    right: `12px`
  },
}));

const SideNavHeader = ({ user, onClick, onKeyDown }) => {
  const classes = useStyles();

  return (
    <List>

      {/* Header */}
      <ListItem>
        <ListItemText
            className={classes.appTitle}
            primary={`QuizShow`}
            primaryTypographyProps={{ noWrap: true, variant: "h5" }}
          />
        <ListItemSecondaryAction onClick={onClick}
            onKeyDown={onKeyDown}
            className={classes.secondaryAction}>
          <IconButton onClick={onClick}
              onKeyDown={onKeyDown}
              aria-label="close drawer">
            <ChevronLeftIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      {/* User Info */}
      <ListItem className={classes.accountItem} >
        <ListItemAvatar>
          <RandomColorAvatar name={user.username} size={60} altIcon={<PersonIcon />}/>
        </ListItemAvatar>
        <ListItemText
          className={classes.accountText}
          primary={user.username}
          primaryTypographyProps={{ noWrap: true }}
          secondary={user.attributes['custom:organization']}
          secondaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>

    </List>
  );
}

export default SideNavHeader;
