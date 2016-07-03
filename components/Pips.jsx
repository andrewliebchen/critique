import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import randomToken from 'random-token';
import Pip from './Pip.jsx';

export default class Pips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePips: [],
    };
  }

  render() {
    const { pips, imageId } = this.props;
    return (
      <div
        className="pips"
        onClick={this.handleAddPip.bind(this)}
        ref="pips">
        {pips && pips.map((pip, i) =>
          <Pip key={i} pip={pip} imageId={imageId}/>
        )}
      </div>
    );
  }

  handleAddPip(event) {
    const pips = $(ReactDOM.findDOMNode(this.refs.pips));
    const pipsWidth = pips.outerWidth();
    const pipsHeight = pips.outerHeight();
    const pipId = randomToken(5);

    Meteor.call('addPip', {
      imageId: this.props.imageId,
      id: pipId,
      x: (event.pageX - pips.offset().left) / pipsWidth * 100,
      y: (event.pageY - pips.offset().top) / pipsHeight * 100,
      created_at: Date.now(),
      emoji: ':grinning:',
    }, (err, success) => {
      if (success) {
        this.setState({activePips: this.state.activePips.concat(pipId)});
      }
    });
  }
};

Pips.propTypes = {
  imageId: PropTypes.string,
  pips: PropTypes.array,
};
