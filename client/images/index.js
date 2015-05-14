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
  'click .mtr_add-sticker': function(event){
    // Probably only want to do this when a comment is added
    var targetOffset = $(event.target).offset();
    var top = event.clientY - targetOffset.top + document.body.scrollTop;
    var left = event.clientX - targetOffset.left;

    Meteor.call('addSticker', {
      parent: this._id,
      top: top,
      left: left
    });
  },

  'click .mtr_delete-image': function(){
    Meteor.call('deleteImage', this._id);
  }
});
