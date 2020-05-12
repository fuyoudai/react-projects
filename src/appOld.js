import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink // Link
} from "react-router-dom";

import { Button } from 'antd';

import {connect} from 'react-redux';
// import {add} from './actions/counter';
import * as counterActions from './actions/counter';
import {bindActionCreators} from 'redux';


class App extends React.Component {
  clickHandle=()=>{
    console.log(this.props,"测试哈哈哈")
  }
  render() {
    console.log(this.props,"app")
    return (
      <div>
         <header>
            <Button type="primary" onClick={this.clickHandle}>测试</Button>&nbsp;&nbsp;
            <Button type="danger" onClick={()=>this.props.counterActions.add(10)}>增加</Button> 
            &nbsp;&nbsp;<span>{this.props.counter}</span>
        </header>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <NavLink activeStyle={{color:'red'}} exact to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink activeStyle={{color:'red'}} to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink activeStyle={{color:'red'}} to="/users">Users</NavLink>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/about">
                <About/>
                {/* this.props.children */}
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/" component={Home}>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

function Home() {
  return <h2>Home</h2>;
}
function About() {
  return <h2>About</h2>;
}
function Users() {
  return <h2>Users</h2>;
}

const mapStateToProps = (state)=>{
  return {
    counter:state.counter
  }
}
// const mapDispatchToProps = (dispatch)=>{
//   return {
//     add:()=>dispatch(add())
//   }
// }
const mapDispatchToProps = (dispatch)=>{
  return {
    counterActions:bindActionCreators(counterActions,dispatch)
  }
}

//先后顺序不能颠倒
export default connect(mapStateToProps,mapDispatchToProps)(App);
