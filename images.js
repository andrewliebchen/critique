Images = new Mongo.Collection('images');
Placemarks = new Mongo.Collection('placemarks');

if (Meteor.isClient) {
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
    }
  });
}

if (Meteor.isServer) {
  // Meteor.startup(function(){
  //   Images.remove({});
  // });

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
    }
  });
}
