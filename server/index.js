Meteor.methods({
  'createImage': function(image){
    return Images.insert(image);
  },

  'deleteImage': function(imageId){
    Images.remove(imageId);
  },

  'addPlacemark': function(args){
    Placemarks.insert({
      parent: args.parent,
      top: args.top,
      left: args.left
    });
  },

  'addComment': function(args){
    Comments.insert({
      parentImage: args.parentImage,
      parentPlacemark: args.parentPlacemark,
      name: args.name,
      message: args.message,
      createdAt: args.createdAt
    });
  }
});
