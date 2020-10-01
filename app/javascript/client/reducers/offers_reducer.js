import { FETCH_OFFERS } from '../actions';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_OFFERS:
      return action.payload
    default:
      return state;
  }
}
