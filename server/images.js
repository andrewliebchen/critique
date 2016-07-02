import { Meteor } from 'meteor/meteor';
import { Images } from '../api/images.js';

Meteor.methods({
  addImage(args) {
    return Images.insert({
      url: args.url,
      date: args.date,
      pips: [],
    });
  },

  addPip(args) {
    return Images.update(args.imageId, {
      $push: {
        pips: {
          id: args.id,
          x: args.x,
          y: args.y,
          created_at: args.created_at,
          emoji: args.emoji,
        }
      }
    })
  },
});
