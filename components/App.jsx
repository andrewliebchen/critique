import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Landing from './Landing.jsx';
import Image from './Image.jsx';
import NewImage from './NewImage.jsx'
import Admin from './Admin.jsx';

export default class App extends Component {
  componentDidMount() {
    GAnalytics.pageview(); // eslint-disable-line
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Landing}/>
        <Route path="t/:id" component={NewImage}/>
        <Route path="i/:id" component={Image}/>
        <Route path="admin" component={Admin}/>
      </Router>
    );
  }
}
