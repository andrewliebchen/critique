// Meteor.publish('image', function(id){
//   return [
//     Images.find(id),
//     Placemarks.find({parent: id}),
//     Comments.find({parentImage: id})
//   ];
// });

Meteor.publish('image', function(){
  return [
    Images.find({}),
    Placemarks.find({}),
    Comments.find({})
  ];
});
