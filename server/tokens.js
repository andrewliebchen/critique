import { Meteor } from 'meteor/meteor';
import { Tokens } from '../api/main';

Meteor.methods({
  createToken(args) {
    return Tokens.insert({
      recipient: args.recipient,
      created_at: args.created_at,
    });
  },

  deleteToken(id) {
    return Tokens.remove(id);
  },
});
