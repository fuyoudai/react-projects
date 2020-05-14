import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  //NavLink, // Link
  Redirect
} from "react-router-dom";
import {mainRoutes} from './routes'

import './App.css'
import Home from './pages/admin/Home';

import { connect } from 'react-redux';
import * as counterActions from './store/actions/counter';
import { bindActionCreators } from 'redux';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/admin" render={routeProps=><Home {...routeProps}/>} />
            {mainRoutes.map(route => {
              return <Route key={route.path} {...route} />
            })}
            <Redirect to="/admin" from="/" />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
}
// const mapDispatchToProps = (dispatch)=>{
//   return {
//     add:()=>dispatch(add())
//   }
// }
const mapDispatchToProps = (dispatch) => {
  return {
    counterActions: bindActionCreators(counterActions, dispatch)
  }
}

//先后顺序不能颠倒
export default connect(mapStateToProps, mapDispatchToProps)(App);
