import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Images } from '../api/main';

export default class NewImage extends Component {
  render() {
    return (
      <form onSubmit={this.handleAddImage.bind(this)}>
        <div className="form-group">
          <label>Dropbox URL</label>
          <input type="url" ref="imageUrl" placeholder="Image URL"/>
        </div>
        <div className="form-group">
          <label>Title</label>
          <input type="text" ref="imageTitle" placeholder="Title"/>
        </div>
        <input type="submit" value="Create"/>
      </form>
    );
  }

  handleAddImage(event) {
    event.preventDefault();
    const url = ReactDOM.findDOMNode(this.refs.imageUrl).value.trim();
    const title = ReactDOM.findDOMNode(this.refs.imageTitle).value.trim();
    if (url) {
      Meteor.call('addImage', {
        url: url,
        title: title,
        date: Date.now(),
      }, (err, id) => {
        if (id) {
          window.location.href = `/i/${id}`;
        }
      });
    }
  }
};
