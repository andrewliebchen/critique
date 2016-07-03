import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import EmojiOne from 'emojione';
import EmojiPicker from 'emojione-picker';
import { ReactPageClick } from 'react-page-click';

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
        {/* emoji picker is slooooow */}
        {this.state.picker &&
          <ReactPageClick notify={this.closePicker.bind(this)}>
            <EmojiPicker onChange={this.handleSelectEmoji.bind(this)}/>
          </ReactPageClick>}
      </div>
    );
  }

  handlePipClick(event) {
    event.stopPropagation();
    this.setState({picker: true});
  }

  handleSelectEmoji(data) {
    // How to stop emoji place underneath? Blank div?
    const { pip } = this.props;
    Meteor.call('updateEmoji', {
      id: pip._id,
      emoji: data.shortname,
    });
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
