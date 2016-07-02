import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Images } from '../api/images';

export default class NewImage extends Component {
  render() {
    return (
      <form onSubmit={this.handleAddImage.bind(this)}>
        <input type="url" ref="imageUrl" placeholder="Image URL"/>
      </form>
    );
  }

  handleAddImage(event) {
    event.preventDefault();
    const url = ReactDOM.findDOMNode(this.refs.imageUrl).value.trim();

    if (url) {
      Images.insert({
        url: url,
        date: Date.now(),
      });
    }

    ReactDOM.findDOMNode(this.refs.imageUrl).value = '';
  }
};
