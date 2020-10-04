import { FETCH_RESTAURANTS, FETCH_RESTAURANT } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_RESTAURANTS:
      return action.payload
    case FETCH_RESTAURANT:
      return [action.payload]
    default:
      return state;
  }
}
