function Prezenter(socket, mode){
  var self = this;

  self.mode = mode;
  self.socket = socket;

  self.prepare = function() {
    var sections = $('section');
    _.each(sections, function(section, index) {
      section.dataset.id = index;
    })
  };

  self.notify = function() {
    if(self.mode === 'prezenter') {
      var channel = utils.channel();
      var hash = window.location.hash;
      self.socket.trigger('sync.change', JSON.stringify({channel: channel, hash: hash}));
    }
  };

  self.set_slide = function(){
    var sections = $('section');
    var hash = window.location.hash;
    var position = parseInt(hash.substr(1), 10) || 0;

    _.each(sections, function(section, index){
      if(position == index){ $(section).addClass('top'); }
      else { $(section).removeClass('top'); }
    });

  };

  self.change_slide = function(event) {
    var sections = $('section');
    var Key = {
      LEFT: 37,
      RIGHT: 39,
      HOME: 36,
      END: 35
    };

    var key = event.keyCode;
    var hash = window.location.hash;
    var position = parseInt(hash.substr(1), 10) || 0;

    if(key === Key.LEFT) { position = Math.max(position-1, 0); }
    else if(key === Key.RIGHT) { position = Math.min(position+1, sections.length-1); }
    else if(key == Key.HOME) { position = 0; }
    else if(key == Key.END) { position = sections.length-1; }

    window.location.hash = position;
  };

  self.bind_events = function(){
    $(window).on('hashchange', self.notify);
    $(window).on('hashchange', self.set_slide)
    $(window).on('keydown', self.change_slide);
  };

  self.listen = function(){
    if(self.mode === 'viewer'){
      self.socket.bind('update', function(message) {
        if($('.fa-eye-slash').length > 0) { return; }

        if(message != null && message != "") {
          var parsed = JSON.parse(message);
          if(parsed.channel == utils.channel()) {
            window.location.hash = parsed.hash;
          }
        }
      });
    }
  };

}

var utils = {
  channel: function() {
    var parts =_.compact(location.pathname.split("/"));
    var id = parts[1];
    return id;
  }
};

$(document).ready(function(){
  var socket = new WebSocketRails(location.host + '/websocket');
  socket.bind('connected', function(object){
    console.log(object.message);
  });
  socket.trigger('sync.connected');

  $("[data-mode='viewer'], [data-mode='prezenter']").each(function(){
    var prezenter = new Prezenter(socket, this.dataset.mode);
    prezenter.prepare();
    prezenter.listen();
    prezenter.bind_events();
    prezenter.set_slide();
  });
});
