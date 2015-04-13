Meteor.methods({
  'createImage': function(image){
    Images.insert(image);
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
      parent: args.parent,
      name: args.name,
      message: args.message,
      createdAt: args.createdAt
    });
  }
});
