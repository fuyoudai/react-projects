import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {Provider} from 'react-redux'
import store from './store'
// import {createStore} from 'redux';
// const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
     <App />
  </Provider>,
  document.getElementById('root')
);

// const render=()=>{
//   ReactDOM.render(
//       <App 
//         onAdd={()=>store.dispatch({type:'ADD'})}
//         value={store.getState()}
//       />,
//     document.getElementById('root')
//   );
// }
// render();
// store.subscribe(render);
