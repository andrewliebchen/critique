import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import {
  ButtonOutline,
  Container,
  InlineForm,
  Panel,
  PanelHeader,
  Table,
 } from 'rebass';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { Images, Tokens } from '../api/main';
import moment from 'moment';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      tokenRecipient: null,
    };
  }

  render() {
    const { images, tokens } = this.props;
    const imagesData = [];
    const tokensData = [];

    images.map((image) => {
      imagesData.push([
        <strong><a href={`/i/${image._id}`}>{image.title}</a></strong>,
        <a href={image.url}>View image</a>,
        moment(image.created_at).format(),
        moment(image.expires_at).format(),
        tokens && image.token ? _.filter(this.props.tokens, {_id: image.token})[0].recipient : '',
        <ButtonOutline theme="error" onClick={this.handleImageDelete.bind(null, image._id)}>Delete</ButtonOutline>,
      ]);
    });

    tokens.map((token) => {
      tokensData.push([
        <strong><a href={`/t/${token._id}`}>{token._id}</a></strong>,
        token.recipient,
        moment(token.created_at).format(),
        <ButtonOutline theme="error" onClick={this.handleTokenDelete.bind(null, token._id)}>Delete</ButtonOutline>,
      ]);
    });

    if (!this.state.auth) {
      return (
        <div className="inverse__wrapper">
          <form
            className="inverse__container"
            onSubmit={this.handlePassword.bind(this)}>
            <div className="form-group">
              <label>Password</label>
              <input
                type="type"
                className="input"
                placeholder="Magic word"
                ref="password"/>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Log in 🔑"
                className="button white big"/>
            </div>
          </form>
        </div>
      );
    }

    return (
      <Container>
        <Panel>
          <PanelHeader>Images</PanelHeader>
          <Table
            headings={['Title', 'Image URL', 'Created at', 'Expires', 'Recipient', '']}
            data={imagesData}/>
        </Panel>
        <Panel>
          <PanelHeader>Tokens</PanelHeader>
          <Table
            headings={['Token', 'Recipient email', 'Created at', '']}
            data={tokensData}/>
          <InlineForm
            label="Recient email"
            name="recipient_email"
            buttonLabel="Create Token"
            placeholder="Recipient email"
            type="email"
            onChange={this.handleTokenEmailChange.bind(this)}
            onClick={this.handleCreateToken.bind(this)}/>
        </Panel>
      </Container>
    );
  }

  handlePassword(event) {
    event.preventDefault();
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    if (password !== '') {
      Meteor.call('checkAuth', password, (error, success) => {
        if (success) {
          this.setState({auth: true});
        } else {
          console.warn('Nope!');
        }
      });
    }
  }

  handleImageDelete(id) {
    if (window.confirm('Are you sure you want to delete this image?')) {
      Meteor.call('deleteImage', id);
    }
  }

  handleTokenEmailChange(event) {
    this.setState({tokenRecipient: event.target.value});
  }

  handleCreateToken(event) {
    event.preventDefault();
    Meteor.call('createToken', {
      recipient: this.state.tokenRecipient,
      created_at: Date.now(),
    });
  }

  handleTokenDelete(id) {
    if (window.confirm('Are you sure you want to delete this token?')) {
      Meteor.call('deleteToken', id);
    }
  }
}

Admin.propTypes = {
  images: PropTypes.array,
  tokens: PropTypes.array,
  dataIsReady: PropTypes.bool,
};

export default createContainer(() => {
  const dataHandle = Meteor.subscribe('admin');
  const dataIsReady = dataHandle.ready();
  return {
    dataIsReady,
    images: dataIsReady ? Images.find({}).fetch() : [],
    tokens: dataIsReady ? Tokens.find({}).fetch() : [],
  };
}, Admin);
