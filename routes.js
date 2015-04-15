Router.configure({
  layoutTemplate: 'application',
  loadingTemplate: 'loading'
});

Router.onBeforeAction('bodyClass');

Router.map(function() {
  this.route('home', { path: '/' });

  this.route('index', {
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
