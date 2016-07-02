import { Mongo } from 'meteor/mongo';

export const Images = new Mongo.Collection('images');

if (Meteor.isServer) {
  Meteor.publish('image', function imagePublication(id) {
    return Images.find({_id: id});
  });
}
