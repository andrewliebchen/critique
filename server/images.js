import { Meteor } from 'meteor/meteor';
import { Images } from '../api/images.js';

Meteor.methods({
  addImage(args) {
    return Images.insert({
      url: args.url,
      date: args.date,
    });
  }
});
