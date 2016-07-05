import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Button, Input, Slider } from 'rebass';
import { Images } from '../api/main';

export default class NewImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      title: null,
      lifespan: 0,
    };
  }
  render() {
    const { lifespan } = this.state;
    return (
      <form onSubmit={this.handleAddImage.bind(this)}>
        <Input
          type="url"
          label="Dropbox URL"
          name="imageUrl"
          placeholder="Image URL"
          onChange={this.handleUrlChange.bind(this)}/>
        <Input
          type="text"
          label="Title"
          name="imageTitle"
          placeholder="Awesome design"
          onChange={this.handleTitleChange.bind(this)}/>
        <Slider
          label="Image lifespan"
          name="lifespan"
          min="0"
          max="36"
          onChange={this.handleLifespan.bind(this)}
          defaultValue={lifespan}/>
        <p>{lifespan > 0 ? `${lifespan} hours` : 'Forever'}</p>
        <Button onClick={this.handleAddImage.bind(this)}>Create</Button>
      </form>
    );
  }

  handleUrlChange(event) {
    this.setState({url: event.target.value});
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value})
  }

  handleLifespan(event) {
    this.setState({lifespan: event.target.value});
  }

  handleAddImage(event) {
    event.preventDefault();
    const { url, title, lifespan } = this.state;
    const created_at = Date.now();
    if (url) {
      Meteor.call('addImage', {
        url: url,
        title: title,
        created_at: created_at,
        expires_at: lifespan > 0 ? created_at + (lifespan * 3600000) : false,
      }, (err, id) => {
        if (id) {
          window.location.href = `/i/${id}`;
        }
      });
    }
  }
};
