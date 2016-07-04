import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { ReactPageClick } from 'react-page-click';
import EmojiPicker from './EmojiPicker.jsx';

export default class Pip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picker: false,
    };
  }

  render() {
    const { pip } = this.props;
    const containerClassName = classnames({
      'pip__container': true,
      'is-selected': this.state.picker,
    });
    return (
      <div
        className={containerClassName}
        style={{
          left: `${pip.x}%`,
          top: `${pip.y}%`,
        }}>
        <div
          className="pip"
          onClick={this.handlePipClick.bind(this)}>
          <span className="emoji">{pip.emoji}</span>
        </div>
        {this.state.picker &&
          <EmojiPicker onChange={(emoji) => {
            Meteor.call('updateEmoji', {
              id: this.props.pip._id,
              emoji: emoji,
            }, (err, success) => {
              this.setState({picker: false});
            });
          }}/>
          }
      </div>
    );
  }

  handlePipClick(event) {
    event.stopPropagation();
    this.setState({picker: true});
  }

  closePicker(event) {
    event.stopPropagation();
    this.setState({picker: false});
  }
 };

Pip.propTypes = {
  pip: PropTypes.object,
  imageId: PropTypes.string,
};
