module.exports = function(app, mongoose) {
  var crypto = require('crypto');

  var UserSchema = new mongoose.Schema({
    username: { type: String, index: { unique: true } },
    digest: { type: String }
  });

  var User = mongoose.model('User', UserSchema);

  var register = function(_user, success, failure) {
    var hash = crypto.createHash('sha256');
    hash.update(_user.password);
    var user = new User({username: _user.username, digest: hash.digest('hex')});
    user.save(function(err, user) {
      if(err){ failure(); }
      else{ success(user); }
    });
  };

  var login = function(_user, success, failure) {
    var hash = crypto.createHash('sha256');
    hash.update(_user.password);
    User.findOne({username: _user.username, digest: hash.digest('hex')}, function(err, user) {
      if(user){ success(user); }
      else { failure(); }
    });
  };

  var find = function(id, callback) {
    User.findOne({_id: id}, callback);
  };

  var check = function(user, callback) {
    User.findOne(user, callback);
  };

  return {
    register: register,
    login: login,
    find: find,
    check: check,
    User: User
  };
};
