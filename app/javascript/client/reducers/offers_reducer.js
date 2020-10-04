import { FETCH_OFFERS, FETCH_OFFER } from '../actions';


export default function(state = null, action) {
  switch (action.type) {
    case FETCH_OFFERS:
      return action.payload
    case FETCH_OFFER:
      return [action.payload]
    default:
      return state;
  }
}


