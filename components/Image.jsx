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
            <div className="image__container">
              <img src={image.url} className="image__element"/>
            </div>
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
