import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Image from './Image.jsx';
import NewImage from './NewImage.jsx'
import Admin from './Admin.jsx';

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={NewImage}/>
        <Route path="i/:id" component={Image}/>
        <Route path="admin" component={Admin}/>
      </Router>
    );
  }
};
