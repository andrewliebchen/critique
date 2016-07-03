import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import EmojiOne from 'emojione';
import EmojiPicker from 'emojione-picker';

export default class Pip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picker: false,
    };
  }

  renderEmoji() {
    const emoji = this.props.pip.emoji;
    return {
      __html: emoji ? EmojiOne.toImage(emoji) : ''
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
          onClick={this.handlePipClick.bind(this)}
          dangerouslySetInnerHTML={this.renderEmoji()}>
        </div>
        {this.state.picker && <EmojiPicker onChange={this.handleSelectEmoji.bind(this)}/>}
      </div>
    );
  }

  handlePipClick(event) {
    event.stopPropagation();
    this.setState({picker: true});
  }

  handleSelectEmoji(data) {
    Meteor.call('updateEmoji', {
      imageId: this.props.imageId,
      pipId: this.props.pip.id,
      emoji: data.shortname,
    });
  }
};

Pip.propTypes = {
  pip: PropTypes.object,
  imageId: PropTypes.string,
};
