import { FETCH_RESTAURANTS } from '../actions';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_RESTAURANTS:
      return action.payload
    default:
      return state;
  }
}
