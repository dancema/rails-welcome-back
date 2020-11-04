import { CREATE_CODE, CANCEL_CODE } from '../actions';


export default function(state = null, action) {
  switch (action.type) {
    case CREATE_CODE:
      return action.payload
    case CANCEL_CODE:
      return action.payload
    default:
      return state;
  }
}
