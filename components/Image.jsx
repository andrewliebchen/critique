import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Images } from '../api/images';
import NewImage from './NewImage.jsx';

class Image extends Component {
  render() {
    const { images } = this.props;
    return (
      <div>
        {images.length > 0 ? images.map((image, i) =>
          <img key={i} src={image.url} style={{maxWidth: '100%'}}/>
        ) : <div>No images</div>}
        <NewImage/>
      </div>
    )
  }
};

Image.propTypes = {
  images: PropTypes.array.isRequired,
};

export default createContainer(({params}) => {
  return {
    images: Images.find({_id: params.id}).fetch(),
  };
}, Image);
