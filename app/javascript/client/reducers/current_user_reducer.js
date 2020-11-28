// import { CHECK_LOGGED_IN } from '../actions';


// export default function(state = null, action) {
//   switch (action.type) {
//     case CHECK_LOGGED_IN:
//       return action.payload.logged_in
//     default:
//       return state;
//   }
// }

import { CURRENT_USER_STARTED, CURRENT_USER_SUCCESS, CURRENT_USER_FAILURE } from '../actions'



const initialState = {
  loading: false,
  logged_in: null,
  error: null
};

export default function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER_STARTED:
      return {
        ...state,
        loading: true
      };
    case CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        logged_in: action.payload
      };
    case CURRENT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
