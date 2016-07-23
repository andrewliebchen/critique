import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Checkbox } from 'rebass';
import { Flex, Box } from 'reflexbox';
import CopyToClipboard from 'react-copy-to-clipboard';
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
    const { image, isActive, pips, pipsToggle } = this.props;
    const lifespanEllapsed = image.lifespan - ((Date.now() - image.created_at) / 3600000);
    const remainingLifespan = lifespanEllapsed / image.lifespan;
    const isExpired = image.lifespan > 0 && remainingLifespan < 0;
    const lifespanClassName = classnames({
      'lifespan': true,
      'is-expired': isExpired,
    });

    return (
      <footer className="footer">
        <Flex align="center">
          <Box>
            {isExpired ? 'Image is expired 🙅' : `⏳ ${expireMessage(lifespanEllapsed)}`}
          </Box>
          <Box auto>
            <h2 className="image__title">{image.title}</h2>
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
        {image.lifespan > 0 &&
          <div className={lifespanClassName}>
            <div
              className="lifespan__fill"
              style={{
                width: `${isActive ? (1 - remainingLifespan) * 100 : 100}%`,
              }}/>
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
  pips: PropTypes.bool,
  pipsToggle: PropTypes.func,
  canEdit: PropTypes.bool,
};
