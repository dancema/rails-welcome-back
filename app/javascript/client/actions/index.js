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

export const REGISTER_STARTED = "REGISTER_STARTED";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGIN_STARTED = "LOGIN_STARTED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const ACTIVATE_STARCODE_STARTED = "ACTIVATE_STARCODE_STARTED";
export const ACTIVATE_STARCODE_SUCCESS = "ACTIVATE_STARCODE_SUCCESS";
export const ACTIVATE_STARCODE_FAILURE = "ACTIVATE_STARCODE_FAILURE";


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



export const logIn = (data) => {
  return dispatch => {
    dispatch(logInStarted());

    const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true
    axios.defaults.headers.post['Accept'] = 'application/json';



    axios.post('/login', data
    )
    .then((response) => {
        dispatch(logInSuccess(response.data));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(logInFailure(error.message));
      }
    })
  };
};

const logInSuccess = todo => ({
  type: LOGIN_SUCCESS,
  payload: {
    ...todo
  }
});

const logInStarted = () => ({
  type: LOGIN_STARTED
});

const logInFailure = error => ({
  type: LOGIN_FAILURE,
  payload: {
    error
  }
});




export const register = (data) => {
  return dispatch => {
    dispatch(registerStarted());

    const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true
    axios.defaults.headers.post['Accept'] = 'application/json';



    axios.post('/api/v1/registrations', data)
    .then((response) => {
        dispatch(registerSuccess(response.data));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(registerFailure(error.message));
      }
    })
  };
};

const registerSuccess = todo => ({
  type: REGISTER_SUCCESS,
  payload: {
    ...todo
  }
});

const registerStarted = () => ({
  type: REGISTER_STARTED
});

const registerFailure = error => ({
  type: REGISTER_FAILURE,
  payload: {
    error
  }
});








export const activateStarcode = (data) => {
  return dispatch => {
    dispatch(activateStarcodeStarted());

    const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true
    axios.defaults.headers.post['Accept'] = 'application/json';


    axios.post('/api/v1/starcodes', data
    )
    .then((response) => {
        dispatch(activateStarcodeSuccess(response.data));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(activateStarcodeFailure(error.message));
      }
    })
  };
};

const activateStarcodeSuccess = todo => ({
  type: ACTIVATE_STARCODE_SUCCESS,
  payload: {
    ...todo
  }
});

const activateStarcodeStarted = () => ({
  type: ACTIVATE_STARCODE_STARTED
});

const activateStarcodeFailure = error => ({
  type: ACTIVATE_STARCODE_FAILURE,
  payload: {
    error
  }
});




export function logInAndActivateStarcode(values) {
  let code = JSON.stringify({code: values.code})
  let credentials = JSON.stringify({user:{
      email: values.email,
      password: values.password
    }})

  return (dispatch, getState) => {
    return dispatch(logIn(credentials)).then(() => {
      return dispatch(activateStarcode(code))
    })
  }
}


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

