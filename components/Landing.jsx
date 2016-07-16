import React, { Component } from 'react';

export default class Landing extends Component {
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
          <form>
            <div className="form-group inline-form">
              <input
                type="email"
                className="input"
                placeholder="you@example.com"/>
              <button className="button white">Send</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
