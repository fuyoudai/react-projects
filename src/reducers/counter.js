import * as actions from '../constants'
const counter = (state = 0, action) => {
  switch (action.type) {
    case actions.ADD:
      return state + action.num;
    default: 
      return state;
  }
};
export default counter