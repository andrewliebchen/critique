import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Images } from '../api/images.js';

class App extends Component {
  render() {
    const { images } = this.props;
    return (
      <div>
        {images.length > 0 ? images.map((image, i) =>
          <img key={i} src={image.url} style={{maxWidth: '100%'}}/>
        ) : <div>No images</div>}
        <div>
          <input type="url" ref="imageUrl" placeholder="Image URL"/>
          <button onClick={this.handleAddImage.bind(this)}>Add image</button>
        </div>
      </div>
    )
  }

  handleAddImage() {
    const url = ReactDOM.findDOMNode(this.refs.imageUrl).value.trim();

    if (url) {
      Images.insert({
        url: url,
        date: Date.now(),
      });
    }

    ReactDOM.findDOMNode(this.refs.imageUrl).value = '';
  }
}

App.propTypes = {
  images: PropTypes.array.isRequired,
}

export default createContainer(() => {
  return {
    images: Images.find({}).fetch(),
  };
}, App);
