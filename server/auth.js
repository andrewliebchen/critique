import { Meteor } from 'meteor/meteor';

Meteor.methods({
  checkAuth(password) {
    if (password === Meteor.settings.adminPassword) {
      return true;
    }
  },
});
