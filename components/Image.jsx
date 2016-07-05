import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import { Container, Donut, Section, Heading, SectionHeader, Panel, PanelHeader, Switch } from 'rebass';
import { Flex, Box } from 'reflexbox';
import { Images, Pips } from '../api/main';
import PipsContainer from './PipsContainer.jsx';
import NewImage from './NewImage.jsx';

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pips: true,
    };
  }

  render() {
    const { dataIsReady, image, pips } = this.props;
    const lifespanEllapsed = moment(image.expires_at).subtract(Date.now());
    const lifespanTotal = moment(image.expires_at).subtract(image.created_at);
    const lifespan = lifespanEllapsed / lifespanTotal;
    if (dataIsReady) {
      return (
        <div>
          {image.expires_at > 0 && lifespan > 0 ?
            <div className="image__container">
              <img src={image.url} className="image__element"/>
              <PipsContainer imageId={image._id} pips={pips} showPips={this.state.pips}/>
            </div>
          : <div className="image__expired">Image is expired</div>}
          <Container>
            <Flex align="center">
              {image.expires_at > 0 &&
                <Box>
                  <Donut
                    color="primary"
                    size={64}
                    strokeWidth={8}
                    value={lifespan}/>
                </Box>}
              <Box px={2}>
                <Heading href={image.url}>{image.title ? image.title : image.url}</Heading>
                Image expires {moment(image.expires_at).fromNow()} at {moment(image.expires_at).format()}
              </Box>
              <Box>
                <div className="pip-switch">
                  <Switch
                    checked={this.state.pips}
                    onClick={this.handlePipsToggle.bind(this)}/>
                  Display pips
                </div>
              </Box>
            </Flex>
          </Container>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }

  handlePipsToggle() {
    this.setState({pips: !this.state.pips});
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
