import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { createHistory as history } from 'history';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import RestaurantsShow from './containers/restaurants_show';
import OffersShow from './containers/offers_show';
import StarcodeSearchForm from './containers/starcode_search_form';
import StarcodeValidation from './containers/starcode_validation';


import Navbar from './containers/navbar';


import currentUserReducer from './reducers/current_user_reducer';
import RestaurantsIndex from './containers/restaurants_index';

import api from './middleware/api';
import data from './reducers/data';

const root = document.getElementById('root')


const initialState = {logged_in: null};


const reducers = combineReducers({
  data,
  logged_in: currentUserReducer
});





const middlewares = applyMiddleware(thunk, logger, api);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


ReactDOM.render(

  <Provider store={createStore(reducers, initialState, composeEnhancers(middlewares))}>
    <Router >
      <div className="app">
        <Navbar />
        <div className="view-container">
          <Switch>
            <Route path="/c/restaurants" exact component={RestaurantsIndex} />
            <Route path="/c/restaurants/:id" exact component={RestaurantsShow} />
            <Route path="/c/offers/:id" exact component={OffersShow} />
            <Route path="/c/code/:code" exact component={StarcodeValidation} />
            <Route path="/c/code" exact component={StarcodeSearchForm} />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>,
  root
);
