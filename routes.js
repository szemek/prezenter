module.exports = function(app, mongoose, models) {
  var requireAuthentication = function(req, res, next) {
    if(req.path === '/sign_in' || req.path === '/sign_up') {
      next();
      return;
    }

    if(req.session.user) {
      var user = req.session.user;
      models.User.check(user, function(err, doc) {
        if(err) { res.redirect('/sign_in'); }
        else { next(); }
      });
    }
    else { res.redirect('/sign_in'); }
  };

  app.all('/slides/create', requireAuthentication);
  app.all('/slides/:id/edit', requireAuthentication);
  app.all('/slides/:id/update', requireAuthentication);
  app.all('/slides/:id/remove', requireAuthentication);
  app.all('/slides/:id/prezent', requireAuthentication);

  var requireAuthorization = function(req, res, next) {
    var id = req.params.id;
    var username = req.session.user.username;
    models.Slides.find(id, function(err, doc) {
      if(err) { res.redirect('/sign_in'); }
      else {
        if(doc.username == username) { next(); }
        else { res.redirect('/slides'); }
      }
    });
  };

  app.all('/slides/:id/edit', requireAuthorization);
  app.all('/slides/:id/update', requireAuthorization);
  app.all('/slides/:id/remove', requireAuthorization);
  app.all('/slides/:id/prezent', requireAuthorization);

  app.get('/sign_in', function(req, res) {
    res.render('auth/sign_in');
  });

  app.post('/sign_in', function(req, res) {
    var username = req.param('username', null);
    var password = req.param('password', null);

    var success = function(user){
      req.session.user = user;
      res.redirect('/');
    };
    var failure = function(){ res.render('auth/sign_in'); };
    var _user = { username: username, password: password };
    models.User.login(_user, success, failure);
  });

  app.get('/sign_up', function(req, res) {
    res.render('auth/sign_up');
  });

  app.post('/sign_up', function(req, res) {
    var username = req.param('username', null);
    var password = req.param('password', null);

    var success = function(user){
      req.session.user = user;
      res.redirect('/');
    };
    var failure = function(){ res.render('auth/sign_up'); };
    var _user = { username: username, password: password };
    models.User.register(_user, success, failure);
  });

  var root = function(req, res) {
    models.Slides.all(function(err, docs) {
      res.render('slides/index', {slides: docs, user: req.session.user});
    });
  };

  app.get('/sign_out', function(req, res) {
    req.session.user = null;
    res.redirect('/');
  });

  app.get('/', root);
  app.get('/slides', root);

  app.post('/slides/create', function(req, res) {
    var name = req.param('name', null);
    var username = req.session.user.username;

    var success = function(slides) {
      var id = slides.id;
      res.redirect('/slides/' + id + '/edit');
    };
    var failure = function() { res.redirect('/slides'); }
    models.Slides.create(name, username, success, failure);
  });

  app.get('/slides/:id/edit', function(req, res) {
    var id = req.params.id;

    models.Slides.find(id, function(err, doc) {
      res.render('slides/edit', {slides: doc, user: req.session.user});
    });
  });

  app.post('/slides/:id/update', function(req, res) {
    var id = req.params.id;

    var jade = req.param('jade', null);
    var css = req.param('css', null);
    var slides = {jade: jade, css: css};
    models.Slides.update(id, slides, function(err, doc) {
      res.redirect('slides/' + id + '/edit');
    });
  });

  app.post('/slides/:id/remove', function(req, res) {
    var id = req.params.id;

    models.Slides.remove(id, function(err, doc) {
      res.redirect('/slides');
    });
  });

  // Modes
  // view
  app.get('/slides/:id/view', function(req, res) {
    var id = req.params.id;

    models.Slides.find(id, function(err, doc) {
      res.render('slides/modes/view', {slides: doc});
    });
  });

  // prezent
  app.get('/slides/:id/prezent', function(req, res) {
    var id = req.params.id;

    models.Slides.find(id, function(err, doc) {
      res.render('slides/modes/prezent', {slides: doc});
    });
  });
};
