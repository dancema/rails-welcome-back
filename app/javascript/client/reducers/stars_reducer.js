import { FETCH_STARS, FETCH_STAR } from '../actions';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_STARS:
      return action.payload
    case FETCH_STAR:
      return action.payload
    default:
      return state;
  }
}
