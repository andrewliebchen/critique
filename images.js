// Split up this file
// Add iron router
// Cookie current user name
// Cookie current user email?

Images = new Mongo.Collection('images');
Placemarks = new Mongo.Collection('placemarks');
Comments = new Mongo.Collection('comments');

if (Meteor.isClient) {
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

          Meteor.call('createImage', _.extend(
            _.extend.apply(_, image),
            {expires: expirationTime}
          ));
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
      var top = event.clientY + document.body.scrollTop;
      Meteor.call('addPlacemark', {
        parent: this._id,
        top: top,
        left: event.clientX
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
      return Comments.find({parent: Session.get('currentPlacemark')});
    }
  });

  Template.comments.events({
    'click .mtr_add-comment': function(event, template){
      var username = template.find('.mtr_user');
      var message = template.find('.mtr_message');

      if(message.value !== '') {
        Meteor.call('addComment', {
          parent: Session.get('currentPlacemark'),
          name: username.value,
          message: message.value,
          createdAt: moment()
        });

        message.value = '';
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    'createImage': function(image){
      Images.insert(image);
    },

    'deleteImage': function(imageId){
      Images.remove(imageId);
    },

    'addPlacemark': function(args){
      Placemarks.insert({
        parent: args.parent,
        top: args.top,
        left: args.left
      });
    },

    'addComment': function(args){
      Comments.insert({
        parent: args.parent,
        name: args.name,
        message: args.message,
        createdAt: args.createdAt
      });
    }
  });
}
