Images = new Mongo.Collection('images');

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
    }
  });

  Template.image.events({
    'click .mtr_delete-image': function(){
      Meteor.call('deleteImage', this._id);
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
    }
  });
}
