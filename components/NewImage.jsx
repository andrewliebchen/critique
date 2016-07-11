import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import classnames from 'classnames';
import Dropzone from 'react-dropzone-es6';
import Title from 'react-title-component'

export default class NewImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: false,
      title: '',
      lifespan: 0,
      uploading: false,
    };
  }

  render() {
    const { url, title, lifespan, uploading } = this.state;
    const dropzoneClassName = classnames({
      'dropzone': true,
      'is-uploading': uploading,
    })
    return (
      <div className="new-image">
        <Title render="New image | Critique"/>
        <div className="new-image__form">
          <div className="form-group">
            <Dropzone
              multiple={false}
              style={{}}
              className={dropzoneClassName}
              activeClassName="is-active"
              accept="image/*"
              onDrop={this.handleFileUpload.bind(this)}>
              <div className="dropzone__message">
                {uploading ? 'Uploading file' : 'Drop an image here to upload'}
              </div>
            </Dropzone>
          </div>
          <div className="form-group">
            <label className="label">Image title</label>
            <input
              className="input"
              type="text"
              placeholder="Awesome design"
              value={title}
              onChange={this.handleTitleChange.bind(this)}/>
          </div>
          <div className="form-group">
            <label className="label">
              {lifespan > 0 ?
                `Image expires in </strong>${lifespan} hour${lifespan > 1 ? 's' : ''} at ${moment().add(lifespan, 'hour').format('h:mma [on] dddd MMM Do')}`
              : 'Image never expires'}
            </label>
            <input
              type="range"
              className="slider"
              min="0"
              max="36"
              onChange={this.handleLifespan.bind(this)}
              defaultValue={lifespan}/>
          </div>
          <div className="form-group">
            <button
              className="button white big"
              disabled={!url}
              onClick={this.handleAddImage.bind(this)}>
              Create image and go 👉
            </button>
          </div>
        </div>
        {url &&
          <div className="new-image__preview">
            <div className="image__container">
              <img src={url} className="image__element"/>
            </div>
          </div>}
      </div>
    );
  }

  handleFileUpload(files) {
    this.setState({uploading: true});

    const file = files[0];
    const uploader = new Slingshot.Upload('fileUploads'); // eslint-disable-line

    uploader.send(file, (error, url) => {
      if (error) {
        console.error('Error uploading', uploader.xhr.response); // eslint-disable-line
      } else {
        this.setState({
          url: url,
          title: this.state.title ? this.state.title : file.name,
          uploading: false,
        })
      }
    });
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
        token: this.props.params.id,
      }, (err, id) => {
        if (id) {
          window.location.href = `/i/${id}`;
        }
      });
    }
  }
}
