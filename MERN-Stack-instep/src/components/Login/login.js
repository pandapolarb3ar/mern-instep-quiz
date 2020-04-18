import React, { Component } from 'react';
import Message from './elements/Message';
import Error from './elements/Error';
import Choice from '../Choice';
import LoginService from './elements/LoginService'
import {
  COMMON_FIELDS,
  LOGIN_FIELDS,
  LOGIN_MESSAGE,
  ERROR_IN_LOGIN,
} from './MessageBundle';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: '',
      password: '',
      error: false,
      loginSuccess: false,
      used : false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleOnChangeUserName = (e) => {
    this.setState({
      user_name: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onSubmit = async (e) => {

    var loginResult = false;
    const loginTest = await LoginService(this.state.user_name);
    if(loginTest !== undefined) {
      if(loginTest.password === this.state.password) {
      // console.log(loginTest)
      loginResult = true
      }
    }
 
    if (loginResult !== true) {
      this.setState({
        error: true,
        loginSuccess: false,
        used: true
      });
    } else
      this.setState({
        loginSuccess: true,
        error: false,
        used: true
      });
  };

  render() {
    const { loginSuccess, error } = this.state;

    if(this.state.used !== true) {
    return (
      <div className="Login">
        <h1> {LOGIN_FIELDS.LOGIN_HEADING} </h1> 
        <form onSubmit={this.onSubmit}>
          <div>
            <div className="fields">
              <p> {COMMON_FIELDS.USER_NAME} </p>    
              <input
                type="text"
                name="Username"
                onChange={this.handleOnChangeUserName}
                autoComplete="Username"
                required
              />
            </div>{' '}
            
            <div className="fields">
              
              <p> {COMMON_FIELDS.PASSWORD} </p>    
              <input
                type="password"
                name="Password"
                onChange={this.handleOnChangePassword}
                autoComplete="Password"
                required
              />
                  
            </div>
            
            <div className="">
              
              <button
                type="button"
                onClick={this.onSubmit}
                className="login-btn"
              >
                
                  {LOGIN_FIELDS.LOGIN}    
              </button>{' '}
                
               
            </div>{' '}
               
          </div>{' '}
           
        </form>{' '}
        </div>

    );
    } else if( this.state.loginSuccess===true) 
          return <Choice user={this.state.user_name}/>;
      else
        return (<Error message={ERROR_IN_LOGIN} />)   
  }
  
}