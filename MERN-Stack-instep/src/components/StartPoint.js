import React from 'react';
import Login from './Login/login';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

class StartPoint extends React.Component{

  constructor(props) {
    super(props);
    }

  
render() {
  return(
  <Router>
    <Route exact path="/login" component={Login} />
    <Redirect from="/" to="login" />
  </Router>
  );
}

}

export default StartPoint;