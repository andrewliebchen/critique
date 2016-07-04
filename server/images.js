import { Meteor } from 'meteor/meteor';
import { Images } from '../api/main';

Meteor.methods({
  addImage(args) {
    return Images.insert({
      url: args.url,
      title: args.title,
      date: args.date,
      pips: [],
    });
  },
});
