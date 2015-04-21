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
          Router.go('imageShow', {_id: data});
        });
      },
      cancel: function(){
        console.log('Cancelled');
      }
    });
  }
});
