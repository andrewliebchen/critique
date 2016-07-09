import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Button,
  Card,
  CardImage,
  Container,
  Heading,
  Input,
  Slider,
  Text,
} from 'rebass';
import moment from 'moment';
import Dropzone from 'react-dropzone-es6';

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
        {!url ?
          <Dropzone
            multiple={false}
            onDrop={this.handleFileUpload.bind(this)}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        :
          <Card width={256}>
            <CardImage src={url} />
            <Heading level={3}>{title}</Heading>
            <Text>
              <a onClick={this.handleRemoveImage.bind(this)}>Remove</a>
            </Text>
          </Card>}
        <Input
          type="text"
          label="Title"
          name="imageTitle"
          value={title}
          placeholder="Awesome design"
          onChange={this.handleTitleChange.bind(this)}/>
        <Slider
          label={lifespan > 0 ? `Expires in ${lifespan} hour${lifespan > 1 ? 's' : ''} at ${moment().add(lifespan, 'hour').format('h:mma [on] dddd MMM Do')}` : 'Never expires'}
          name="lifespan"
          min="0"
          max="36"
          onChange={this.handleLifespan.bind(this)}
          defaultValue={lifespan}
          mt={3}
          fill/>
        <div className={this.state.url ? '' : 'disabled'}>
          <Button
            onClick={this.handleAddImage.bind(this)}
            mt={3}
            style={{width: '100%'}}
            big>
            Create image
          </Button>
        </div>
      </Container>
    );
  }

  handleFileUpload(files) {
    const file = files[0];
    const uploader = new Slingshot.Upload('fileUploads');

    uploader.send(file, (error, url) => {
      if (error) {
        console.error('Error uploading', uploader.xhr.response);
      } else {
        this.setState({
          url: url,
          title: file.name,
        })
      }
    });
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value})
  }

  handleRemoveImage() {
    this.setState({url: null});
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
}
