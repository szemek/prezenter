$(function(){
  var progress_bar = function() {
    var hash = window.location.hash;
    var position = parseInt(hash.substr(1), 10) || 0;
    var sections = $('section').length;
    var progress = (position + 1) / sections;

    var width = progress * window.innerWidth;

    $('#progress .bar').css('width', width);
  };

  progress_bar();
  $(window).on('hashchange', progress_bar);

  $.getJSON('.', function(data) {
    var duration = data.duration * 60 * 1000; // ms
    var start = new Date();

    var clock = function(difference) {
      var progress = difference / duration;

      var width = progress * window.innerWidth;
      $('#clock .bar').css('width', width);
    };

    var clock_bar = function() {
      var difference = new Date() - start;
      if(difference < duration) {
        clock(difference);
        setTimeout(clock_bar, 1000);
      }
    };

    setTimeout(clock_bar, 1000);
  });
});
