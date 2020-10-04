export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS'
export const FETCH_OFFERS = 'FETCH_OFFERS'
export const CREATE_CODE = 'CREATE_CODE'
export const CANCEL_CODE = 'CANCEL_CODE'

export function fetchRestaurants() {
  const promise = fetch('/api/v1/restaurants').then(r => r.json())

  return {
    type: FETCH_RESTAURANTS,
    payload: promise
  };
}


export function fetchOffers(id) {
  const promise = fetch(`/api/v1/restaurants/${id}`)
    .then(r => r.json())


  return {
    type: FETCH_OFFERS,
    payload: promise
  };
}

export function createCode(offer_id) {
  const body = { offer_id };
  const promise = fetch('/api/v1/codes', {
    method: 'POST',
    headers: {
      credentials:'include',
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json());

  return {
    type: CREATE_CODE,
    payload: promise // Will be resolved by redux-promise
  };
}

// export function CANCEL_CODE() {
//   return {
//     type: CANCEL_CODE,
//     payload: ""
//   };
// }
