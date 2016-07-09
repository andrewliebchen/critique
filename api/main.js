import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Images = new Mongo.Collection('images');
const Pips = new Mongo.Collection('pips');
const Tokens = new Mongo.Collection('tokens');

if (Meteor.isServer) {
  Meteor.publish('image', function imagePublication(id) {
    return [
      Images.find({_id: id}),
      Pips.find({imageId: id}),
    ];
  });

  Meteor.publish('admin', function adminPublication() {
    return [
      Images.find({}),
      Tokens.find({}),
    ];
  });
}

export { Images, Pips, Tokens };
