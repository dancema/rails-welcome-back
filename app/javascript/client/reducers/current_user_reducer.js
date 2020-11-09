import { CHECK_LOGGED_IN } from '../actions';


export default function(state = null, action) {
  switch (action.type) {
    case CHECK_LOGGED_IN:
      return action.payload.logged_in
    default:
      return state;
  }
}
