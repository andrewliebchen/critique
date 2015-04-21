Session.setDefault('currentPlacemarkType', 'pin');
Session.setDefault('currentPlacemark', null);

Template.placemarkToggle.events({
  'click .mtr_placemark-toggle__item': function(event, template){
    var $this = $(event.target);
    var $selectedElement = $this.closest('.mtr_placemark-toggle__item');
    var selectedType = $selectedElement.data('type');

    $selectedElement.closest('.mtr_placemark-toggle').find('.is-selected').removeClass('is-selected');
    $selectedElement.addClass('is-selected');

    Session.set('currentPlacemarkType', selectedType);
  }
});

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
