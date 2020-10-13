import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';

import RestaurantsIndex from './containers/restaurants_index';
import RestaurantsShow from './containers/restaurants_show';
import OffersShow from './containers/offers_show';
import Settings from './containers/settings';
import StarsEdit from './containers/stars_edit';


import Navbar from './components/navbar';

import restaurantsReducer from './reducers/restaurants_reducer';
import offersReducer from './reducers/offers_reducer';
import codesReducer from './reducers/codes_reducer';
import starsReducer from './reducers/stars_reducer';
import offersAvailabilityReducer from './reducers/offers_availability_reducer';


const root = document.getElementById('root')

const initialState = {
  restaurants: JSON.parse(root.dataset.restaurants),
  offers: [],
  nb_offers_available: [],
  stars: [],
  code: []
};


const reducers = combineReducers({
  restaurants: restaurantsReducer,
  offers: offersReducer,
  nb_offers_available: offersAvailabilityReducer,
  stars: starsReducer,
  code: codesReducer
});

const middlewares = applyMiddleware(reduxPromise, logger);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// render an instance of the component in restaurants/1the DOM
ReactDOM.render(

  <Provider store={createStore(reducers, initialState, composeEnhancers(middlewares))}>
    <Router history={history}>
      <div className="app">
        <Navbar />
        <div className="view-container">
          <Switch>
            <Route path="/dashboard" exact component={RestaurantsIndex} />
            <Route path="/restaurants/:id" exact component={RestaurantsShow} />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>,
  root
);
