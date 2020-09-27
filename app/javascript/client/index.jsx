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
import OffersModal from './containers/offers_modal';
import Navbar from './components/navbar';

import restaurantsReducer from './reducers/restaurants_reducer';
import offersReducer from './reducers/offers_reducer';

const restaurants = [
  { id: 1, name: 'Kali Greek Food', street: '1, rue Montera', city: 'Paris', postal_code: 75012 },
  { id: 2, name: 'Elsy', street: '1, rue Montera', city: 'Paris', postal_code: 75012 }
];

const offers = [
  { id: 1, title: 'Bière Mythos', stars_required: 3, available: true },
  { id: 2, title: 'Bièr', stars_required: 3, available: true },
  { id: 3, title: 'Bière Mythos', stars_required: 3, available: true },
  { id: 4, title: 'Bière Mythos', stars_required: 3, available: false },
  { id: 5, title: 'Bière Mythos', stars_required: 3, available: false },
  { id: 6, title: 'Bière Mythos', stars_required: 3, available: false }
];

const initialState = {
  restaurants: restaurants,
  offers: offers
};


const reducers = combineReducers({
  restaurants: restaurantsReducer,
  offers: offersReducer
});

const middlewares = applyMiddleware(reduxPromise, logger);

// render an instance of the component in the DOM
ReactDOM.render(

  <Provider store={createStore(reducers, initialState, middlewares)}>
    <Router history={history}>
      <div className="app">
        <Navbar />
        <div className="view-container">
          <Switch>
            <Route path="/" exact component={RestaurantsIndex} />
            <Route path="/restaurants/:id" exact component={RestaurantsShow} />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
