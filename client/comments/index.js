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
