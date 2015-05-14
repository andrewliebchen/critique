Template.stickers.helpers({
  sticker: function(){
    return Stickers.find({parent: this._id});
  }
});
