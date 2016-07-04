import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Images } from '../api/main';

export default class NewImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lifespan: 37,
    };
  }
  render() {
    const { lifespan } = this.state;
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
        <div className="form-group">
          <label>Lifespan</label>
          <input
            type="range"
            min="1"
            max="37"
            onChange={this.handleLifespan.bind(this)}
            defaultValue={lifespan}/>
          <span>{lifespan === 37 ? 'Forever' : `${lifespan} hours`}</span>
        </div>
        <input type="submit" value="Create"/>
      </form>
    );
  }

  handleLifespan(event) {
    const lifespan = event.target.value;
    this.setState({lifespan: lifespan});
  }

  handleAddImage(event) {
    event.preventDefault();
    const url = ReactDOM.findDOMNode(this.refs.imageUrl).value.trim();
    const title = ReactDOM.findDOMNode(this.refs.imageTitle).value.trim();
    if (url) {
      Meteor.call('addImage', {
        url: url,
        title: title,
        lifespan: this.state.lifespan,
        date: Date.now(),
      }, (err, id) => {
        if (id) {
          window.location.href = `/i/${id}`;
        }
      });
    }
  }
};
