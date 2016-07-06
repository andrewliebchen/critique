import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {
  ButtonOutline,
  Checkbox,
  Container,
  Donut,
  Heading,
  Section,
} from 'rebass';
import { Flex, Box } from 'reflexbox';
import moment from 'moment';
import truncate from 'truncate';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Images, Pips } from '../api/main';
import PipsContainer from './PipsContainer.jsx';
import NewImage from './NewImage.jsx';

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      pips: true,
    };
  }

  render() {
    const { dataIsReady, image, pips } = this.props;
    if (dataIsReady) {
      const lifespanEllapsed = moment(image.expires_at).subtract(Date.now());
      const lifespanTotal = moment(image.expires_at).subtract(image.created_at);
      const lifespan = lifespanEllapsed / lifespanTotal;
      const isActive = lifespan > 0;
      return (
        <div>
          <div className="image__container">
            <img src={image.url} className="image__element"/>
            <PipsContainer
              imageId={image._id}
              pips={pips}
              showPips={this.state.pips}
              canAdd={image.expires_at <= 0}/>
          </div>
          <Container>
            <Flex align="center">
              {image.expires_at > 0 &&
                <Box>
                  <Donut
                    color={isActive ? 'primary' : 'error'}
                    size={64}
                    strokeWidth={8}
                    value={isActive ? 1 - lifespan : 1}/>
                </Box>}
              <Box px={2} auto>
                <Heading href={image.url}>
                  {image.title ? image.title : truncate(image.url, 8)}
                </Heading>
                {image.expires_at > 0 ?
                  <span>
                    {isActive ? 'Expires' : 'Expired'} {moment(image.expires_at).fromNow()} at {moment(image.expires_at).format('h:mma [on] dddd MMM Do')}
                  </span>
                : <span>Sweet, image doesn't expire</span>}
              </Box>
              <Box>
                <Checkbox
                  label="Display pips"
                  name="displayPips"
                  checked={this.state.pips}
                  onChange={this.handlePipsToggle.bind(this)}/>
                <CopyToClipboard
                  text={`http://example.com/i/${image._id}`}
                  onCopy={this.handleCopy.bind(this)}>
                  <ButtonOutline theme="success" pill style={{float: 'right'}}>
                    {this.state.copied ? 'Copied!' : 'Copy link'}
                  </ButtonOutline>
                </CopyToClipboard>
              </Box>
            </Flex>
          </Container>
        </div>
      );
    } else {
      return <span className="loader">Loading...</span>;
    }
  }

  handlePipsToggle() {
    this.setState({pips: !this.state.pips});
  }

  handleCopy() {
    this.setState({copied: true});
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
