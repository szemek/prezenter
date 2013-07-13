$(document).ready(function(){
  $("[data-mode='viewer'], [data-mode='prezenter']").each(function(){
    var index = 0;
    var sections = null;

    var Prezenter = {
      initialize: {},
      notify: {},
      update: {},
      viewer: {
        passive: true
      }
    };

    // initialize
    Prezenter.initialize.sections = function() {
      sections = document.querySelectorAll('section');
      for (var i = 0, length = sections.length; i < length; i++) {
        sections[i].dataset.id = i;
      }
    };

    // notify
    Prezenter.notify.viewers = function(hash) {
      socket.trigger('sync.change', hash);
    }

    // update
    Prezenter.update.hash = function() {
      var hash = window.location.hash;
      if(hash){
        var position = parseInt(hash.substr(1));
        var section = sections[position];
        for(var i=0; i<sections.length; i++) {
          if(sections[i] === section) {
            section.classList.add('top');
            index = i;
          }
          else {
            sections[i].classList.remove('top');
          }
        }
      }
      else {
        window.location.hash = '#0';
      }
    };

    Prezenter.update.slide = function(event) {
      var key = event.keyCode;
      if(key === 37) {
        index = Math.max(index-1, 0);
        window.location.hash = sections[index].dataset.id;
      }
      else if(key === 39) {
        index = Math.min(index+1, sections.length-1);
        window.location.hash = sections[index].dataset.id;
      }
    };

    var socket = new WebSocketRails(location.host + '/websocket');

    window.addEventListener('load', function() {
      Prezenter.initialize.sections();
      Prezenter.update.hash();
    });

    window.addEventListener('hashchange', function() {
      Prezenter.update.hash();
    });

    window.addEventListener('load', function() {
      var mode = document.querySelector('#wrapper').dataset.mode;

      // Prezenter mode
      if(mode === 'prezenter') {
        window.addEventListener('hashchange', function() {
          Prezenter.notify.viewers(window.location.hash);
        });
      }

      window.addEventListener('keydown', function(event) {
        if(mode === 'viewer' && event.keyCode === 27) {
          Prezenter.viewer.passive = !(Prezenter.viewer.passive);
          if(Prezenter.viewer.passive) {
            alert("You are now in passive mode");
          }
          else {
            alert("You are now in active mode");
          }
        }
        if(mode === 'prezenter' || !(Prezenter.viewer.passive)) {
          Prezenter.update.slide(event);
        }
      });

      // Viewer mode
      socket.bind('update', function(hash) {
        if(mode === 'viewer' && Prezenter.viewer.passive) {
          window.location.hash = hash;
        }
      });
    });
  });
});
