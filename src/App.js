import './App.css';
import './components/login.css';
import './components/fonts.css';
import React from 'react';
import {HashRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Upload from './components/upload';
import Schedule from './components/schedule';
import NotFound from './components/notFound';
import { connect } from 'react-redux';
import BtnPage from './components/btnPage';

class App extends React.Component {
  state = {
    loggedIn: false,
    accessToken: '',
    loggedOut: false,
    loading: false,
    cookie: null
  }
  redirectPage = (value) => {
    this.setState({
      loggedIn: value
    })
  }
  redirectPageLogout = (value) => {
    this.setState({
      loggedOut: value
    })
  }
  setAccess = (number) => {
    this.setState({
      accessToken: number
    })
  }
  forceRender = () => {
    //IF KEEP THIS METHOD NEED A COMPONENT DID MOUNT DOING THE SAME FUNCTION
    let cookie = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
    this.setState({
      cookie: cookie
    })
    setTimeout(() => {this.forceUpdate()}, 500)
  }
  render() {
    const {loggedIn, loggedOut, accessToken} = this.state;
    const {cookie, loading} = this.state;
    if (loading) {
        return <div>Loading</div>
    } else {
          return (
          <Router basename='/'>
            <div className="linearGrad"></div>
          <Switch>
                <Route exact path="/">
                    <div className="form">
                      
                        <Login forceRender={this.forceRender} />
                      
                    </div>
                </Route>       
                
               
                <React.Fragment>
                <Route component={() => <Dashboard  loggedOut={loggedOut} redirectPageLogout={this.redirectPageLogout} redirectPage={this.redirectPage} accessToken={accessToken} />} path='/dashboard'  />
                <Route path="/upload" component={Upload} />
                <Route path="/scheduled" component={Schedule} />
                <Route path="/btnPage" component={BtnPage} />
                </React.Fragment>
               

          </Switch>
          </Router>
          )
      }
   }
}

export default connect((state) => ({

}))(App);
