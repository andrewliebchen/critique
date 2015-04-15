Session.setDefault('currentPlacemark', null);
Session.setDefault('currentUser', null);

Template.dropboxChooser.events({
  'click #mtr_dropbox' : function(event){
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
          Router.go('index', {_id: data});
        });
      },
      cancel: function(){
        console.log('Cancelled');
      }
    });
  }
});

Template.image.helpers({
  image: function(){
    return Images.find({});
  },

  expired: function(){
    if(moment().isAfter(this.expires)){
      return true;
    }
  },

  timeLeft: function(){
    return moment(this.expires).fromNow();
  },

  expiration: function(){
    return moment(this.expires).format('h:mm a on dddd, MMM. Do')
  }
});

Template.image.events({
  'click .mtr_add-placemark': function(event){
    // Probably only want to do this when a comment is added
    var targetOffset = $(event.target).offset();
    var top = event.clientY - targetOffset.top + document.body.scrollTop;
    var left = event.clientX - targetOffset.left;
    Meteor.call('addPlacemark', {
      parent: this._id,
      top: top,
      left: left
    });
  },

  'click .mtr_delete-image': function(){
    Meteor.call('deleteImage', this._id);
  }
});

Template.placemarks.helpers({
  placemark: function(){
    return Placemarks.find({parent: this._id});
  },

  active: function(){
    return Session.equals('currentPlacemark', this._id);
  },

  commentCount: function(){
    return Comments.find({parent: this._id}).count();
  }
});

Template.placemarks.events({
  'click .mtr_placemark': function(){
    Session.set('currentPlacemark', this._id);
  }
});

Template.comments.helpers({
  comment: function(){
    var currentPlacemark = Session.get('currentPlacemark');
    return Comments.find({parentPlacemark: currentPlacemark});
  }
});

Template.comments.events({
  'click .mtr_add-comment': function(event, template){
    var parentPlacemark = Session.get('currentPlacemark');
    var parentImage = Images.find({parent: parentPlacemark.parent})._id;

    var username = template.find('.mtr_user');
    var message = template.find('.mtr_message');

    if(message.value !== '') {
      Meteor.call('addComment', {
        parentImage: parentImage,
        parentPlacemark: parentPlacemark,
        name: username.value,
        message: message.value,
        createdAt: moment()
      });

      message.value = '';
    }
  }
});
