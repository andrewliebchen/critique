import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import {
  Button,
  Container,
  Input,
  Slider,
} from 'rebass';
import moment from 'moment';
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
    const { url, title, lifespan } = this.state;
    return (
      <Container>
        <form>
          <Button onClick={this.handleDropbox.bind(this)}>Dropbox</Button>
          <Input
            type="url"
            label="Image URL"
            name="imageUrl"
            value={url}
            placeholder="Image URL"
            onChange={this.handleUrlChange.bind(this)}/>
          <Input
            type="text"
            label="Title"
            name="imageTitle"
            value={title}
            placeholder="Awesome design"
            onChange={this.handleTitleChange.bind(this)}/>
          <Slider
            label={lifespan > 0 ? `Expires in ${lifespan} hours at ${moment().add(lifespan).fromNow()} at ${moment().add(lifespan).format('h:mma [on] dddd MMM Do')}` : 'Never expires'}
            name="lifespan"
            min="0"
            max="36"
            onChange={this.handleLifespan.bind(this)}
            defaultValue={lifespan}
            fill/>
          <Button onClick={this.handleAddImage.bind(this)}>Create</Button>
        </form>
      </Container>
    );
  }

  handleDropbox(event) {
    event.preventDefault();
    Dropbox.choose({
      linkType: 'direct',
      multiselect: false,
      extensions: ['.png', '.jpg', '.gif'],
      success: (files) => {
        files.forEach((file) => {
          this.setState({
            url: file.link,
            title: file.name,
          });
        });
      },
    });
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
