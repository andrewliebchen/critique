import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Images } from '../api/main';

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
      Meteor.call('addImage', {
        url: url,
        date: Date.now(),
      }, (err, id) => {
        if (id) {
          window.location.href = `/i/${id}`;
        }
      });
    }

    ReactDOM.findDOMNode(this.refs.imageUrl).value = '';
  }
};
