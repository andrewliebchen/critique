Session.setDefault('currentPlacemark', null);

Template.placemarks.helpers({
  placemark: function(){
    return Placemarks.find({parent: this._id});
  },

  selected: function(){
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
