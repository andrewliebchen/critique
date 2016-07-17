import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class Landing extends Component {
  renderHoneypot() {
    return (
      <div style={{position: 'absolute', left: -5000}} aria-hidden="true">
        <input
          type="text"
          name="b_e93b523e4e3239a13520e2bc9_7dfd73f790"
          tabIndex="-1"
          value=""/>
      </div>
    );
  }

  render() {
    return (
      <div className="inverse__wrapper">
        <div className="inverse__container">
          <h1>Critique</h1>
          <p>
            Critique is a quick way to get pointed feedback on your designs.
            Upload your design, set an expiration time like Snapchat (or let just it run forever), then send the link to whomever.
            They use emoji's to add feedback 👍👎 to specific points on the design.
          </p>
          <YouTube
            videoId="3v1dP1o7h0M"
            className="youtube"
            opts={{
              height: '360',
              width: '640',
              autohide: 1,
              fs: 0,
              modestbranding: 1,
              showinfo: 0,
            }}/>
          <p>
            Leave your email, and I'll send you a beta invite.
            No span, I promise! 💖Andrew
          </p>
          <form
            action="//andrew-liebchen.us5.list-manage.com/subscribe/post?u=e93b523e4e3239a13520e2bc9&amp;id=7dfd73f790"
            method="post"
            name="mc-embedded-subscribe-form"
            noValidate>
            <div className="form-group inline-form">
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                name="EMAIL"/>
              {this.renderHoneypot()}
              <input
                type="submit"
                name="subscribe"
                className="button white"
                value="Subscribe"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
