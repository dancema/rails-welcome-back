export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS'
export const FETCH_OFFERS = 'FETCH_OFFERS'

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
