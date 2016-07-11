import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Checkbox } from 'rebass';
import { Flex, Box } from 'reflexbox';
import CopyToClipboard from 'react-copy-to-clipboard';
import moment from 'moment';
import classnames from 'classnames';
import expireMessage from '../lib/expireMessage';

export default class ImageFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
  }

  render() {
    const { image, isActive, lifespan, pips, pipsToggle } = this.props;
    const isExpired = lifespan <= 0;
    const lifespanClassName = classnames({
      'lifespan': true,
      'is-expired': isExpired,
    });
    return (
      <footer className="footer">
        <Flex align="center">
          <h2 className="image__title">{image.title}</h2>
          <Box auto>
            {isExpired ? 'Image is expired 🙅' : expireMessage(lifespan * 24)}
          </Box>
          <Box>
            <Checkbox
              label="Display emojis"
              name="displayPips"
              checked={pips}
              onChange={pipsToggle}
              theme="primary"
              pb={0}/>
          </Box>
          <Box pl={2}>
            <CopyToClipboard
              text={`${Meteor.absoluteUrl()}i/${image._id}`}
              onCopy={this.handleCopy.bind(this)}>
              <button className="button success">
                {this.state.copied ? 'Copied!' : 'Copy link'}
              </button>
            </CopyToClipboard>
          </Box>
        </Flex>
        {image.expires_at > 0 &&
          <div className={lifespanClassName}>
            <div className="lifespan__fill" style={{width: `${isActive ? 1 - lifespan : 1}%`}}/>
          </div>}
      </footer>
    );
  }

  handleCopy() {
    this.setState({copied: true});
  }
}

ImageFooter.propTypes = {
  image: PropTypes.object,
  isActive: PropTypes.bool,
  lifespan: PropTypes.number,
  pips: PropTypes.bool,
  pipsToggle: PropTypes.func,
};
