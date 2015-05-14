Meteor.methods({
  'createImage': function(image){
    return Images.insert(image);
  },

  'deleteImage': function(imageId){
    Images.remove(imageId);
  },

  'addSticker': function(args){
    return Stickers.insert({
      parent: args.parent,
      top: args.top,
      left: args.left
    });
  }
});
