import { Meteor } from 'meteor/meteor';
import { Pips } from '../api/main';

Meteor.methods({
  addPip(args) {
    return Pips.insert({
      imageId: args.imageId,
      x: args.x,
      y: args.y,
      created_at: args.created_at,
      emoji: args.emoji,
    });
  },

  updateEmoji(args) {
    return Pips.update(args.id, {
      $set: {
        emoji: args.emoji,
      },
    });
  },

  deletePip(id) {
    return Pips.remove(id);
  },
});
