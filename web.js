var express = require('express');
var os = require("os");
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require("socket.io").listen(server, { resource: '/socket.io' });
var mongoose = require('mongoose');
var mongopath = process.env['MONGOHQ_URL'] || 'mongodb://localhost/prezenter';

app.configure(function() {
  app.use(express.logger());
  app.use(express.static(__dirname + '/public'));
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'prezenter app'}));
  app.set('view engine', 'jade');
  mongoose.connect(mongopath, function(err) {
    if(err) throw err;
  });
});

var models = {
  User: require('./models/User')(app, mongoose),
  Slides: require('./models/Slides')(app, mongoose)
};

var routes = require('./routes')(app, mongoose, models);

// production configuration only
app.configure('production', function() {
  io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
  });
});

io.sockets.on('connection', function (socket) {
  socket.on('change', function (data) {
    socket.broadcast.emit('update', data);
  });
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("Listening on " + os.hostname() + ":" + port);
});

