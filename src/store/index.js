import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import counter from './reducers/counter'
import product from './reducers/product'
import notice from './reducers/notice'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  counter,
  product,
  notice
})

export default createStore(rootReducer, compose(applyMiddleware(...[thunk])))