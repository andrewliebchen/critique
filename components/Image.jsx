import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Images } from '../api/images';
import NewImage from './NewImage.jsx';

class Image extends Component {
  render() {
    const { dataIsReady, image } = this.props;
    if (dataIsReady) {
      return (
        <div>
          {image ?
            <img src={image.url} style={{maxWidth: '100%'}}/>
          : <div>Whoops, no image</div>}
          <NewImage/>
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
    image: dataIsReady ? Images.findOne() : null,
  };
}, Image);
