import {createStore, combineReducers} from 'redux';
import counter from './reducers/counter'
import product from './reducers/product'
import notice from './reducers/notice'

const rootReducer = combineReducers({
  counter,
  product,
  notice
})

export default createStore(rootReducer)