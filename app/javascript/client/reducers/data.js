import merge from 'lodash/merge';
import { API_DATA_REQUEST, API_DATA_SUCCESS } from '../middleware/api';


import { ACTIVATE_STARCODE_SUCCESS, ACTIVATE_STARCODE_STARTED, ACTIVATE_STARCODE_FAILURE } from '../actions';

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
      if (state.restaurant) {
        if (state.restaurant[id]) {
          return {
            ...state,
              restaurant: {
              ...state.restaurant,
                [id]: {
                  ...state.restaurant[id],
                  attributes: {
                    ...state.restaurant[id].attributes,
                    countStars: state.restaurant[id].attributes.countStars + starsGained,
                  }
                }
              },
            loading_starcode: false,
            error_starcode: null,
            }
          }
        }

      return {
        ...state,
        loading_starcode: false,
        error_starcode: null,
      };
    case ACTIVATE_STARCODE_STARTED:
      return {
        ...state,
        loading_starcode: true
      };
    case ACTIVATE_STARCODE_FAILURE:
      return {
        ...state,
        loading_starcode: false,
        error_starcode: action.payload.error
      };
    default:
      return state;
  }
}
