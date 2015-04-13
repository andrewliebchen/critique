Meteor.publish('image', function(id){
  return [
    Images.find(id),
    Placemarks.find({parent: id}),
    Comments.find({parentImage: id})
  ];
});
