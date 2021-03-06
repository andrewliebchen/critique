import { Meteor } from 'meteor/meteor';
import { Images } from '../api/main';

Meteor.methods({
  addImage(args) {
    return Images.insert({
      url: args.url,
      title: args.title,
      lifespan: args.lifespan,
      created_at: args.created_at,
      token: args.token,
    });
  },

  deleteImage(id) {
    return Images.remove(id);
  },

  updateTitle(args) {
    return Images.update(args.id, {
      $set: {
        title: args.title,
      },
    });
  },
});
