export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS'
export const FETCH_RESTAURANT = 'FETCH_RESTAURANT'

export function fetchRestaurants() {
  const promise = fetch('/api/v1/restaurants').then(r => r.json())

  return {
    type: FETCH_RESTAURANTS,
    payload: promise
  };
}

export function fetchRestaurant(id) {
  const promise = fetch(`/api/v1/restaurants/${id}`)
    .then(r => response.json())

  return {
    type: FETCH_RESTAURANT,
    payload: promise
  };
}

export function fetchCode(restaurant,offer) {

}
