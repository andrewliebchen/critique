import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import Pip from './Pip.jsx';

export default class PipsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePips: [],
    };
  }

  render() {
    const { pips, imageId, dataIsReady } = this.props;
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

    Meteor.call('addPip', {
      imageId: this.props.imageId,
      x: (event.pageX - pips.offset().left) / pipsWidth * 100,
      y: (event.pageY - pips.offset().top) / pipsHeight * 100,
      created_at: Date.now(),
      emoji: '😀',
    }, (err, id) => {
      if (id) {
        this.setState({activePips: this.state.activePips.concat(id)});
      }
    });
  }
};

PipsContainer.propTypes = {
  imageId: PropTypes.string,
  pips: PropTypes.array,
};
