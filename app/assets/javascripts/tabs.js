$(document).ready(tabs);

function tabs() {
  var tabs = $('a[href^="#"]');
  var textareas = $('textarea');

  _.each(tabs, function(tab){
    $(tab).on('click', function(event){
      $(tabs).removeClass();
      $(this).addClass('active');

      var href = $(this).attr('href');

      $(textareas).addClass('hidden');
      $(href).removeClass().addClass('active');

      event.preventDefault();
    })
  });
}
