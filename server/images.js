import { Meteor } from 'meteor/meteor';
import { Images } from '../api/main';

Meteor.methods({
  addImage(args) {
    return Images.insert({
      url: args.url,
      date: args.date,
      pips: [],
    });
  },
});
