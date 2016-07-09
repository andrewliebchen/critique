import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {
  ButtonOutline,
  Container,
  InlineForm,
  Section,
  SectionHeader,
  Table,
 } from 'rebass';
import { Meteor } from 'meteor/meteor';
import { Images, Tokens } from '../api/main';
import moment from 'moment';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenRecipient: null,
    };
  }

  render() {
    const imagesData = [];
    const tokensData = [];

    this.props.images.map((image) => {
      imagesData.push([
        <strong><a href={`/i/${image._id}`}>{image.title}</a></strong>,
        <a href={image.url}>View image</a>,
        moment(image.created_at).format(),
        moment(image.expires_at).format(),
        <ButtonOutline theme="error" onClick={this.handleImageDelete.bind(null, image._id)}>Delete</ButtonOutline>,
      ]);
    });

    this.props.tokens.map((token) => {
      tokensData.push([
        <strong><a href={`/t/${token._id}`}>{token._id}</a></strong>,
        token.recipient,
        moment(token.created_at).format(),
        <ButtonOutline theme="error" onClick={this.handleTokenDelete.bind(null, token._id)}>Delete</ButtonOutline>,
      ]);
    });

    return (
      <Container>
        <Section>
          <SectionHeader heading="Images"/>
            <Table
              headings={['Title', 'Image URL', 'Created at', 'Expires', '']}
              data={imagesData}/>
          </Section>
        <Section>
          <SectionHeader heading="Tokens"/>
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
        </Section>
      </Container>
    );
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
