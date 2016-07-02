import React, { Component, PropTypes } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Image from './Image.jsx';

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        {/*<Route path="/" component={Image}/>*/}
        <Route path="i/:id" component={Image}/>
      </Router>
    );
  }
};
