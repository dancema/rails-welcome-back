import { FETCH_NB_OFFERS_AVAILABLE } from '../actions';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_NB_OFFERS_AVAILABLE:
      return action.payload
    default:
      return state;
  }
}


