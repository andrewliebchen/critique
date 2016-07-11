import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

const emojis = [
  '👍',
  '👎',
  '✅',
  '❌',
  '😀',
  '😬',
  '🙃',
  '😍',
  '😎',
  '🙄',
  '🤔',
  '😳',
  '☹️',
  '😮',
  '😱',
  '😧',
  '🤐',
  '😴',
  '👏',
  '💪',
  '💅',
  '💁',
  '🙅',
  '💃',
  '👯',
  '🎉',
  '🌟',
  '💥',
  '💖',
  '💯',
];

export default class EmojiPicker extends Component {
  constructor(props) {
    super(props);
    this.handleChangeEmoji = this.handleChangeEmoji.bind(this);
  }
  render() {
    return (
      <div className="picker">
        {emojis.map((emoji, i) =>
          <div
            className="picker__emoji"
            onClick={this.handleChangeEmoji.bind(null, emoji)}
            key={i}>
            <span className="emoji">{emoji}</span>
          </div>
        )}
        <button
          className="button error picker__delete"
          onClick={this.handleDeleteEmoji.bind(this)}>Delete this emoji</button>
      </div>
    );
  }

  handleChangeEmoji(emoji) {
    Meteor.call('updateEmoji', {
      id: this.props.pipId,
      emoji: emoji,
    });
  }

  handleDeleteEmoji() {
    if (window.confirm('Are you sure you want to delete this pip?')) {
      Meteor.call('deletePip', this.props.pipId);
    }
  }
}

EmojiPicker.proptypes = {
  pipId: PropTypes.string,
};
