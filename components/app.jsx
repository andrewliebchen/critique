/**
 * @jsx React.DOM
 */

var Countdown = ReactMeteor.createClass({
  render: function() {
    return (
      <div className="countdown">
        <span className="countdown__value hours">4</span>
        <span className="countdown__spacer">:</span>
        <span className="countdown__value minute_tens">0</span>
        <span className="countdown__value minute_ones">0</span>
        <span className="countdown__spacer">:</span>
        <span className="countdown__value second_tens">0</span>
        <span className="countdown__value second_ones">0</span>
      </div>
    );
  }
});

var Image = ReactMeteor.createClass({
  render: function() {
    return (
      <div className="image-container">
        {/*{{>stickers}}*/}
        <img src={this.props.link}/>
      </div>
    );
  }
});

var ImagesList = ReactMeteor.createClass({
  templateName: "Images",

  getMeteorState: function() {
    return {
      images: Images.find({}),
      sticker: Stickers.find({parent: this._id})
    };
  },

  render: function() {
    return (
      <div className="images-wrapper">
        <div className="images">
          <header className="images-header">
            <Countdown/>
          </header>
          {this.state.images.map(function(image, i){
            return(
              <div key={i} className="image">
                {moment().isAfter(this.expires) ? <p>Image expired at {image.expiration}</p> :
                <span>
                  <header className="image-header">
                    <strong className="image-title">{image.name}</strong>
                  </header>
                  <Image link={image.link}/>
                </span>}
              </div>
            );
          })}
        </div>
        <button className="button button-large add-image">Add another image</button>
      </div>
    );
  }
});
