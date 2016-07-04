import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import EmojiPicker from './EmojiPicker.jsx';

export default class Pip extends Component {
  render() {
    const { pip, picker, handleClick, closePicker } = this.props;
    const containerClassName = classnames({
      'pip__container': true,
      'is-selected': picker,
    });
    return (
      <div
        className={containerClassName}
        style={{
          left: `${pip.x}%`,
          top: `${pip.y}%`,
        }}>
        <div className="pip" onClick={handleClick.bind(null, pip._id)}>
          <span className="emoji">{pip.emoji}</span>
        </div>
        {picker &&
          <EmojiPicker onChange={(emoji) => {
            Meteor.call('updateEmoji', {
              id: this.props.pip._id,
              emoji: emoji,
            });
          }}/>}
      </div>
    );
  }
 };

Pip.propTypes = {
  pip: PropTypes.object,
  imageId: PropTypes.string,
  picker: PropTypes.bool,
  handleClick: PropTypes.func,
};
