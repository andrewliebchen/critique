Router.configure({
  layoutTemplate: 'application',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('home', { path: '/' });

  this.route('image', {
    path: '/images/:_id',
    waitOn: function() {
      return Meteor.subscribe('image', this.params._id);
    },
    data: function() {
      return [
        Images.findOne(),
        Placemarks.find({}),
        Comments.find({})
      ];
    }
  });
});
