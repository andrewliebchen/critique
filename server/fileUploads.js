import { Meteor } from 'meteor/meteor';

Slingshot.fileRestrictions('fileUploads', {
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif'],
  maxSize: 10 * 1024 * 1024,
});

Slingshot.createDirective('fileUploads', Slingshot.S3Storage, {
  bucket: Meteor.settings.AWSBucketName,
  acl: 'public-read',

  authorize() {
    // if (!this.userId) {
    //   throw new Meteor.Error(403, "Login Required");
    // }

    return true;
  },

  key(file) {
    return `${file.name}_${Date.now()}`;
  },
});
