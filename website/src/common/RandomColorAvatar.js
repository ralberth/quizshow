import React from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { colorForString, randomColor } from '../util/colors.js';

const useStyles = makeStyles(theme => {
  return {
    avatar: ({ color, size }) => ({
      margin: 10,
      color: theme.palette.text.primary,
      backgroundColor: color[500],
      width: size ? `${size}px` : `40px`,
      height: size ? `${size}px` : `40px`,
    })
  }
});

const RandomColorAvatar = ({ name, size, altIcon }) => {
  const color = _.isUndefined(name) ? randomColor() : colorForString(name);
  const classes = useStyles({ color, size });

  if (name) {
    return (
      <Avatar className={classes.avatar} >
        { _.upperCase(name[0]) }
      </Avatar>
    );
  }

  return (
    <Avatar className={classes.avatar} >
      { altIcon }
    </Avatar>
  );

}

export default RandomColorAvatar;
