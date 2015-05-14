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
  getMeteorState: function() {
    return {
      expires: moment(this.props.expires)
    };
  },

  componentDidMount: function() {
    setInterval(function(){
      this.setState({done: moment(this.state.done).subtract(1, 'seconds')});
    }.bind(this), 1000);
  },

  render: function() {
    return (
      <div className="countdown">
        {this.state.done ? this.state.done.format('h:mm:ss') : null}
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
      image: Images.findOne()
    };
  },

  render: function() {
    return (
      <div className="images-wrapper">
        <div className="images">
          <header className="images-header">
            <Countdown expires={this.state.image.expires}/>
          </header>
            <div className="image">
              {moment().isAfter(this.state.image.expires) ?
                <p>Image expired at {this.state.expires}</p>
              :
                <span>
                  <header className="image-header">
                    <strong className="image-title">{this.state.image.name}</strong>
                  </header>
                  <Image link={this.state.image.link} id={this.state.image._id}/>
                </span>
              }
            </div>
        </div>
        <button className="button button-large add-image">Add another image</button>
      </div>
    );
  }
});
