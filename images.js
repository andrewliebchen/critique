if (Meteor.isClient) {
  Session.setDefault('dropboxImage', null);

  Template.dropboxChooser.events({
    'click #mtr_dropbox' : function(event){
      event.preventDefault();
      Dropbox.choose({
        linkType: 'direct',
        multiselect: false,
        success: function(image){
          Session.set('dropboxImage', image);
        },
        cancel: function(){
          console.log('Cancelled');
        }
      });
    }
  });

  Template.image.helpers({
    image: function(){
      return Session.get('dropboxImage');
    }
  });

  Template.image.events({
    'click .mtr_delete-image': function(){
      Session.set('dropboxImage', null);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
