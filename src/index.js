import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {createStore} from 'redux';
// import reducer from './reducers/counter';
import rootReducer from './reducers'
import {Provider} from 'react-redux'

const store = createStore(rootReducer)

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

{/* <React.StrictMode>
<App />
</React.StrictMode> */}
