import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import Pip from './Pip.jsx';

export default class PipsContainer extends Component {
  constructor(props) {
    super(props);
    this.handlePickerToggle = this.handlePickerToggle.bind(this);
    this._handleEscKey = this._handleEscKey.bind(this);
    this.state = {
      sessionPips: [],
      picker: false,
    };
  }

  _handleEscKey(event){
    if (event.keyCode === 27) {
      this.setState({picker: false});
    }
  }

  componentWillMount() {
    document.addEventListener('keydown', this._handleEscKey, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._handleEscKey, false);
  }

  render() {
    const { pips, imageId, dataIsReady, showPips } = this.props;
    return (
      <div
        className="pips"
        onClick={this.handleAddPip.bind(this)}
        ref="pips">
        {pips && showPips && pips.map((pip, i) =>
          <Pip
            key={i}
            pip={pip}
            imageId={imageId}
            picker={this.state.picker === pip._id}
            handleClick={this.handlePickerToggle}/>
        )}
      </div>
    );
  }

  handleAddPip(event) {
    const pips = $(ReactDOM.findDOMNode(this.refs.pips));
    const pipsWidth = pips.outerWidth();
    const pipsHeight = pips.outerHeight();

    if (!this.props.showPips || this.state.picker) {
      // Don't add a pip if the picker is open, or pips are hidden
      this.setState({picker: false});
    } else {
      Meteor.call('addPip', {
        imageId: this.props.imageId,
        x: (event.pageX - pips.offset().left) / pipsWidth * 100,
        y: (event.pageY - pips.offset().top) / pipsHeight * 100,
        created_at: Date.now(),
        emoji: '😀',
      }, (err, id) => {
        if (id) {
          this.setState({sessionPips: this.state.sessionPips.concat(id)});
        }
      });
    }
  }

  handlePickerToggle(id, event) {
    event.stopPropagation();
    this.setState({picker: id});
  }
};

PipsContainer.propTypes = {
  imageId: PropTypes.string,
  pips: PropTypes.array,
  showPips: PropTypes.bool,
};
