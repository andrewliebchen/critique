import React, { Component, PropTypes } from 'react';

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
  render() {
    return (
      <div className="picker">
        {emojis.map((emoji, i) =>
          <div
            className="picker__emoji"
            onClick={this.props.onChange.bind(null, emoji)}
            key={i}>
            {emoji}
          </div>
        )}
      </div>
    );
  }
};
