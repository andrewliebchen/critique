import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Images, Pips } from '../api/main';
import PipsContainer from './PipsContainer.jsx';
import NewImage from './NewImage.jsx';

class Image extends Component {
  render() {
    const { dataIsReady, image, pips } = this.props;
    if (dataIsReady) {
      return (
        <div>
          {image ?
            <div className="image__container">
              <img src={image.url} className="image__element"/>
              <PipsContainer imageId={image._id} pips={pips}/>
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
    image: dataIsReady ? Images.findOne(params.id) : null,
    pips: dataIsReady ? Pips.find({imageId: params.id}).fetch() : [],
  };
}, Image);