import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';

export default class Pips extends Component {
  render() {
    const { pips } = this.props;
    return (
      <div
        className="pips"
        onClick={this.handleAddPip.bind(this)}
        ref="pips">
        {pips ? pips.map((pip, i) =>
          <div
            className="pip"
            key={i}
            style={{
              left: `${pip.x}%`,
              top: `${pip.y}%`,
            }}/>
        ) : null}
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
    });
  }
};

Pips.propTypes = {
  imageId: PropTypes.string,
  pips: PropTypes.array,
};
