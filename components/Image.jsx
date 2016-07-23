import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import Title from 'react-title-component'
import { Flex, Box } from 'reflexbox';
import { Images, Pips } from '../api/main';
import PipsContainer from './PipsContainer.jsx';
import ImageFooter from './ImageFooter.jsx';

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pips: true,
    };
  }

  render() {
    const { dataIsReady, image, pips } = this.props;
    if (dataIsReady) {
      const isActive = image.lifespan > 0;
      const canEdit = _.includes(localStorage.images, image._id);
      return (
        <Flex justify="center">
          <Title render={`${image.title} | Critique`}/>
          <Box>
            <div className="image__container">
              <img src={image.url} className="image__element"/>
              <PipsContainer
                imageId={image._id}
                pips={pips}
                showPips={this.state.pips}
                canAdd={isActive}/>
            </div>
          </Box>
          <ImageFooter
            image={image}
            isActive={isActive}
            pips={this.state.pips}
            pipsToggle={this.handlePipsToggle.bind(this)}
            canEdit={canEdit}/>
        </Flex>
      );
    } else {
      return <span className="loader">Loading...</span>;
    }
  }

  handlePipsToggle() {
    this.setState({pips: !this.state.pips});
  }
}

Image.propTypes = {
  image: PropTypes.object,
  pips: PropTypes.array,
  dataIsReady: PropTypes.bool,
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
