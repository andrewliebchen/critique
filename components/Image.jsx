import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
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
          <div className="image__detail">
            {image.title && <h2>{image.title}</h2>}
            {image.expires_at > 0 ?
              <div>
                Image expires {moment(image.expires_at).fromNow()} at {moment(image.expires_at).format()}
              </div>
            : null }
          </div>
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
