// import { CHECK_LOGGED_IN } from '../actions';


// export default function(state = null, action) {
//   switch (action.type) {
//     case CHECK_LOGGED_IN:
//       return action.payload.logged_in
//     default:
//       return state;
//   }
// }

import { CURRENT_USER_STARTED, CURRENT_USER_SUCCESS, CURRENT_USER_FAILURE, REGISTER_STARTED, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_STARTED, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions'



const initialState = {
  loading_user: false,
  logged_in: null,
  error: null
};

export default function currentUserReducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER_STARTED:
      return {
        ...state,
        loading_user: true
      };
    case CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading_user: false,
        error: null,
        logged_in: action.payload.logged_in
      };
    case CURRENT_USER_FAILURE:
      return {
        ...state,
        loading_user: false,
        error: action.payload.error
      };
    case REGISTER_STARTED:
      return {
        ...state,
        loading_user: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading_user: false,
        error: null,
        logged_in: true
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading_user: false,
        error: action.payload.error
      };
    case LOGIN_STARTED:
      return {
        ...state,
        loading_user: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading_user: false,
        error: null,
        logged_in: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading_user: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
