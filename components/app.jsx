/**
 * @jsx React.DOM
 */

var DropboxChooser = ReactMeteor.createClass({
  handleDropbox: function(event) {
    event.preventDefault();
    Dropbox.choose({
      linkType: 'direct',
      multiselect: false,
      success: function(image){
        var expirationTime = moment().add(4, 'h').format();
        var imageFields = _.extend(
          _.extend.apply(_, image),
          {expires: expirationTime}
        );

        Meteor.call('createImage', imageFields, function(err, data){
          Router.go('imageShow', {_id: data});
        });
      },
      cancel: function(){
        console.log('Cancelled');
      }
    });
  },

  render: function() {
    return (
      <button type="button" className="button button-large" onClick={this.handleDropbox}>
        Click here to Choose Dropbox Files
      </button>
    );
  }
});

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

var StickersList = ReactMeteor.createClass({
  getMeteorState: function() {
    return {
      stickers: Stickers.find({}).fetch()
    };
  },

  handleAddSticker: function(imageId, event) {
    var targetOffset = $(event.target).offset();
    var top = event.clientY - targetOffset.top + document.body.scrollTop;
    var left = event.clientX - targetOffset.left;

    Meteor.call('addSticker', {
      parent: imageId,
      top: top,
      left: left
    });
  },

  render: function() {
    return (
      <div className="stickers" onClick={this.handleAddSticker.bind(null, this.props.id)}>
        {this.state.stickers.map(function(sticker, i){
          var stickerStyle = {
            top: sticker.top,
            left: sticker.left
          };
          return <div key={i} className="sticker" style={stickerStyle}/>;
        }.bind(this))}
      </div>
    );
  }
});

var Image = ReactMeteor.createClass({
  render: function() {
    return (
      <div className="image-container">
        <StickersList id={this.props.id}/>
        <img src={this.props.link}/>
      </div>
    );
  }
});

var Home = ReactMeteor.createClass({
  templateName: "Home",

  render: function() {
    return (
      <div className="home-content">
        <h1>Critique</h1>
        <DropboxChooser/>
        <p>Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam.</p>
      </div>
    );
  }
});

var ImagesList = ReactMeteor.createClass({
  templateName: "Images",

  getMeteorState: function() {
    return {
      images: Images.find({}).fetch()
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
                {moment().isAfter(this.expires) ?
                  <p>Image expired at {image.expiration}</p>
                :
                  <span>
                    <header className="image-header">
                      <strong className="image-title">{image.name}</strong>
                    </header>
                    <Image link={image.link} id={image._id}/>
                  </span>
                }
              </div>
            );
          }.bind(this))}
        </div>
        <button className="button button-large add-image">Add another image</button>
      </div>
    );
  }
});
