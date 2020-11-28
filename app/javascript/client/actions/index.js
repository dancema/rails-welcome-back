import axios from 'axios';



// export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS'
// export const FETCH_RESTAURANT = 'FETCH_RESTAURANT'

// export const FETCH_OFFERS = 'FETCH_OFFERS'
// export const FETCH_OFFER = 'FETCH_OFFER'


// export const EDIT_STAR = 'EDIT_STAR'
// export const FETCH_STARS = 'FETCH_STARS'
// export const FETCH_STAR = 'FETCH_STAR'

export const CURRENT_USER_SUCCESS = 'CURRENT_USER_SUCCESS'
export const CURRENT_USER_FAILURE = 'CURRENT_USER_FAILURE'
export const CURRENT_USER_STARTED = 'CURRENT_USER_STARTED'



import { CALL_API } from '../middleware/api';

export function apicall(endpoint) {
  return {
    [CALL_API]: {
      endpoint: endpoint,
    },
  };
}







export const isLoggedIn = () => {
  return dispatch => {
    dispatch(currentUserStarted());
    // console.log('current state:', getState());

    axios
      .get('/api/v1/sessions', { credentials: "same-origin" })
      .then(res => {
        dispatch(currentUserSuccess(res.data));
      })
      .catch(err => {
        dispatch(currentUserFailure(err.message));
      });
  };
};

const currentUserSuccess = todo => ({
  type: CURRENT_USER_SUCCESS,
  payload: {
    ...todo
  }
});

const currentUserStarted = () => ({
  type: CURRENT_USER_STARTED
});

const currentUserFailure = error => ({
  type: CURRENT_USER_FAILURE,
  payload: {
    error
  }
});



// export function fetchRestaurants() {
//   const promise = fetch('/api/v1/restaurants', { credentials: "same-origin" }).then(r => r.json())

//   return {
//     type: FETCH_RESTAURANTS,
//     payload: promise
//   };
// }

// export function fetchRestaurant(id) {
//   const promise = fetch(`/api/v1/restaurants/${id}`, { credentials: "same-origin" }).then(r => r.json())

//   return {
//     type: FETCH_RESTAURANT,
//     payload: promise
//   };
// }

// export function fetchOffers(restaurant_id) {
//   const promise = fetch(`/api/v1/restaurants/${restaurant_id}/offers`, { credentials: "same-origin" })
//     .then(r => r.json())

//   return {
//     type: FETCH_OFFERS,
//     payload: promise
//   };
// }

// export function fetchOffer(id) {
//   const promise = fetch(`/api/v1/offers/${id}`, { credentials: "same-origin" })
//     .then(r => r.json())

//   return {
//     type: FETCH_OFFER,
//     payload: promise
//   };
// }





// export function editStar(body, callback) {
//   const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
//   const promise = fetch(`/api/v1/starcodes`, {
//     method: 'POST',
//     headers: {
//       credentials:'include',
//       Accept: 'application/json',
//       'X-CSRF-Token': csrfToken,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   }).then(callback)
//     // .catch((error) => console.log(error))

//     ;


//   return {
//     type: EDIT_STAR,
//     payload: promise
//   };
// }




// export function fetchStars() {
//   const promise = fetch('/api/v1/stars', { credentials: "same-origin" })
//   .then(r => r.json())

//   return {
//     type: FETCH_STARS,
//     payload: promise
//   };
// }

// export function fetchStar(restaurant_id) {
//   const promise = fetch(`/api/v1/stars/${restaurant_id}`, { credentials: "same-origin" })
//   .then(r => r.json())

//   return {
//     type: FETCH_STAR,
//     payload: promise
//   };
// }


// export function isLoggedIn() {
//   const promise = fetch('/api/v1/sessions', { credentials: "same-origin" })
//   .then(r => r.json())

//   return {
//     type: CHECK_LOGGED_IN,
//     payload: promise
//   };
// }

