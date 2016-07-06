import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Images } from '../api/main';
import { Container, SectionHeader, Section, Table, ButtonOutline } from 'rebass';
import moment from 'moment';

class Admin extends Component {
  render() {
    const imagesData = [];
    this.props.images.map((image, i) => {
      imagesData.push([
        <strong><a href={`/i/${image._id}`}>{image.title}</a></strong>,
        <a href={image.url}>View image</a>,
        moment(image.created_at).format(),
        moment(image.expires_at).format(),
        <ButtonOutline>Delete</ButtonOutline>,
      ]);
    });
    console.log(imagesData);
    return (
      <Container>
        <Section>
          <SectionHeader heading="Images"/>
            <Table
              data={imagesData}
              headings={['Title', 'Image URL', 'Created at', 'Expires', '']}/>
        </Section>
      </Container>
    );
  }
};

export default createContainer(({params}) => {
  const dataHandle = Meteor.subscribe('admin');
  const dataIsReady = dataHandle.ready();
  return {
    dataIsReady,
    images: dataIsReady ? Images.find({}).fetch() : [],
  };
}, Admin);
