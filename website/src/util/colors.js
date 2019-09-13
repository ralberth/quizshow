import {
  red, pink, purple, deepPurple, indigo, blue, lightBlue,
  cyan, teal, green, lightGreen, lime, yellow, amber, orange,
  deepOrange, brown, grey, blueGrey
} from '@material-ui/core/colors';
import _ from 'lodash';

const colors = [red, pink, purple, deepPurple, indigo, blue, lightBlue,
  cyan, teal, green, lightGreen, lime, yellow, amber, orange,
  deepOrange, brown, grey, blueGrey];

const randomColor = () => {
  const color = _.sample(colors);
  return color;
};

const colorForString = (str) => {
    var hash = 0, i = 0, len = str.length;
    while ( i < len ) {
        hash  = ((hash << 5) - hash + str.charCodeAt(i++)) << 0;
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
}

export {
  randomColor,
  colorForString
};
