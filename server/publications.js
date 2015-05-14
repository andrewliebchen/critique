Meteor.publish('image', function(id){
  return [
    Images.find(id),
    Stickers.find({parent: id})
  ];
});
