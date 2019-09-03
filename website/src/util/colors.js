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
  return _.sample(colors);
};

export {
  randomColor
};
