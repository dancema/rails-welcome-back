export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS'
export const FETCH_RESTAURANT = 'FETCH_RESTAURANT'

export const FETCH_OFFERS = 'FETCH_OFFERS'
export const FETCH_OFFER = 'FETCH_OFFER'

export const CREATE_CODE = 'CREATE_CODE'
export const CANCEL_CODE = 'CANCEL_CODE'

export const EDIT_STAR = 'EDIT_STAR'
export const FETCH_STARS = 'FETCH_STARS'
export const FETCH_STAR = 'FETCH_STAR'

export const FETCH_NB_OFFERS_AVAILABLE = 'FETCH_NB_OFFERS_AVAILABLE'


export function fetchRestaurants() {
  const promise = fetch('/api/v1/restaurants', { credentials: "same-origin" }).then(r => r.json())

  return {
    type: FETCH_RESTAURANTS,
    payload: promise
  };
}

export function fetchRestaurant(id) {
  const promise = fetch(`/api/v1/restaurants/${id}`, { credentials: "same-origin" }).then(r => r.json())

  return {
    type: FETCH_RESTAURANT,
    payload: promise
  };
}

export function fetchOffers(restaurant_id) {
  const promise = fetch(`/api/v1/restaurants/${restaurant_id}/offers`, { credentials: "same-origin" })
    .then(r => r.json())

  return {
    type: FETCH_OFFERS,
    payload: promise
  };
}

export function fetchOffer(restaurant_id,id) {
  const promise = fetch(`/api/v1/restaurants/${restaurant_id}/offers/${id}`, { credentials: "same-origin" })
    .then(r => r.json())

  return {
    type: FETCH_OFFER,
    payload: promise
  };
}


export function createCode(offer_id) {
  const body = { offer_id };
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
  const promise = fetch('/api/v1/codes', {
    method: 'POST',
    headers: {
      credentials:'include',
      Accept: 'application/json',
      'X-CSRF-Token': csrfToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json());

  return {
    type: CREATE_CODE,
    payload: promise // Will be resolved by redux-promise
  };
}

export function cancelCode() {

  return {
    type: CANCEL_CODE,
    payload: ""
  };
}

export function editStar(code) {
  const body = { code };
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
  const promise = fetch(`/api/v1/stars`, {
    method: 'POST',
    headers: {
      credentials:'include',
      Accept: 'application/json',
      'X-CSRF-Token': csrfToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json());


  return {
    type: EDIT_STAR,
    payload: promise
  };
}


export function fetchStars() {
  const promise = fetch('/api/v1/stars', { credentials: "same-origin" })
  .then(r => r.json())

  return {
    type: FETCH_STARS,
    payload: promise
  };
}

export function fetchStar(restaurant_id) {
  const promise = fetch(`/api/v1/stars/${restaurant_id}`, { credentials: "same-origin" })
  .then(r => r.json())

  return {
    type: FETCH_STAR,
    payload: promise
  };
}

export function fetchNbOffersAvailable() {
  const promise = fetch('/api/v1/offers', { credentials: "same-origin" })
  .then(r => r.json())

  return {
    type: FETCH_NB_OFFERS_AVAILABLE,
    payload: promise
  };

}
