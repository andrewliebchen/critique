import { Mongo } from 'meteor/mongo';

const Images = new Mongo.Collection('images');
const Pips = new Mongo.Collection('pips');

if (Meteor.isServer) {
  Meteor.publish('image', function imagePublication(id) {
    return [
      Images.find({_id: id}),
      Pips.find({imageId: id})
    ];
  });
}

export { Images, Pips };
