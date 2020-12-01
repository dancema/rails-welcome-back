import merge from 'lodash/merge';
import { API_DATA_REQUEST, API_DATA_SUCCESS, ACTIVATE_STARCODE_SUCCESS, ACTIVATE_STARCODE_STARTED, ACTIVATE_STARCODE_FAILURE } from '../middleware/api';

const initialState = {
  meta: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case API_DATA_SUCCESS:
      return merge(
        {},
        state,
        merge({}, action.response, { meta: { [action.endpoint]: { loading: false } } }),
      );
    case API_DATA_REQUEST:
      return merge({}, state, { meta: { [action.endpoint]: { loading: true } } });
    case ACTIVATE_STARCODE_SUCCESS:
      const id = action.payload.restaurant_id
      const starsGained = action.payload.stars_gained
      // console.log(state.data.restaurant[id])
      // if (state.data) {
      //   if (state.data.restaurant[id]) {
      //     return {
      //       ...state,
      //       data: {...state.data,
      //         restaurant: {
      //           ...state.data.restaurant,
      //           restaurant[id].attributes.countStars: state.data.restaurant[id].attributes.countStars + starsGained,
      //         }
      //       }
      //       loading_starcode: false,
      //       error: null,
      //     }
      //   }
      // }

      // return {
      //   ...state,
      //   loading_starcode: false,
      //   error: null,
      // };
    case ACTIVATE_STARCODE_STARTED:
      return {
        ...state,
        loading_starcode: true
      };
    case ACTIVATE_STARCODE_FAILURE:
      return {
        ...state,
        loading_starcode: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
