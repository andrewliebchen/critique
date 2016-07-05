import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import { Container, Donut, Section, Heading, SectionHeader, Panel, PanelHeader, Switch } from 'rebass';
import { Flex, Box } from 'reflexbox';
import { Images, Pips } from '../api/main';
import PipsContainer from './PipsContainer.jsx';
import NewImage from './NewImage.jsx';

class Image extends Component {
  renderImage() {
    const { dataIsReady, image, pips } = this.props;

    if (image.expires_at > 0 && Date.now() > image.expires_at) {
      return <div>Image is expired</div>;
    } else {
      return (
        <div>
          <div className="image__container">
            <img src={image.url} className="image__element"/>
            <PipsContainer imageId={image._id} pips={pips}/>
          </div>
          <Container>
            <Flex align="center">
              <Box>
                <Donut
                  color="primary"
                  size={64}
                  strokeWidth={8}
                  value={0.5}/>
              </Box>
              <Box px={2}>
                <Heading>{image.title}</Heading>
                Image expires {moment(image.expires_at).fromNow()} at {moment(image.expires_at).format()}
              </Box>
              <Box>
                <div className="pip-switch">
                  <Switch/> Display pips
                </div>
              </Box>
            </Flex>
            {/*
            {image.title &&
              <SectionHeader
                heading={image.title}
                description={image.url}/>}
            {image.expires_at > 0 ?
              <div>
                <Donut
                  color="primary"
                  size={64}
                  strokeWidth={8}
                  value={0.5}/>

              </div>
            : null }
            */}
          </Container>
        </div>
      );
    }
  }

  render() {
    const { dataIsReady, image, pips } = this.props;
    if (dataIsReady) {
      return (
        <div>
          {image ? this.renderImage() : <div>Whoops, no image</div>}
          {/*
            <Container>
            <Panel>
              <PanelHeader>Critique a new image</PanelHeader>
              <NewImage/>
            </Panel>
          </Container>
        */}
        </div>

      );
    } else {
      return <div>Loading</div>;
    }
  }
};

Image.propTypes = {
  image: PropTypes.object,
};

export default createContainer(({params}) => {
  const dataHandle = Meteor.subscribe('image', params.id);
  const dataIsReady = dataHandle.ready();
  return {
    dataIsReady,
    image: dataIsReady ? Images.findOne(params.id) : null,
    pips: dataIsReady ? Pips.find({imageId: params.id}).fetch() : [],
  };
}, Image);
