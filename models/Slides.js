module.exports = function(app, mongoose) {
  var jade = require('jade');

  var SlidesSchema = new mongoose.Schema({
    name: { type: String, index: { unique: true } },
    html: { type: String },
    jade: { type: String },
    css: { type: String },
    username: { type: String }
  });

  var Slides = mongoose.model('Slides', SlidesSchema);

  var all = function(callback) {
    Slides.find({}).exec(callback);
  };

  var create = function(name, username, success, failure) {
    var slides = new Slides({name: name, jade: "", css: "", username: username});
    slides.save(function(err, slides) {
      if(err) { failure(); }
      else { success(slides); }
    });
  };

  var find = function(id, callback) {
    Slides.findOne({_id: id}, callback);
  };

  var update = function(id, slides, callback) {
    slides.html = jade.compile(slides.jade)();
    Slides.findByIdAndUpdate(id, slides, callback);
  };

  var remove = function(id, callback) {
    Slides.findByIdAndRemove(id, callback);
  };

  return {
    Slides: Slides,
    all: all,
    create: create,
    find: find,
    update: update,
    remove: remove
  };
};
