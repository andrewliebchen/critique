import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import EmojiPicker from './EmojiPicker.jsx';

export default class Pip extends Component {
  render() {
    const { pip, picker, handleClick, currentSession } = this.props;
    const containerClassName = classnames({
      'pip__container': true,
      'is-selected': picker,
      'is-current': currentSession,
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
        <CSSTransitionGroup
          transitionName="picker"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {picker && currentSession &&
            <EmojiPicker onChange={(emoji) => {
              Meteor.call('updateEmoji', {
                id: this.props.pip._id,
                emoji: emoji,
              });
            }}/>}
        </CSSTransitionGroup>
      </div>
    );
  }
 }

Pip.propTypes = {
  pip: PropTypes.object,
  imageId: PropTypes.string,
  picker: PropTypes.bool,
  handleClick: PropTypes.func,
  currentSession: PropTypes.bool,
};
