$(document).ready(function() {
  $('.navigation .menu').on('click', '.fa-eye', function(event) {
    $('.fa-eye').removeClass('fa-eye').addClass('fa-eye-slash');
  });

  $('.navigation .menu').on('click', '.fa-eye-slash', function(event) {
    $('.fa-eye-slash').removeClass('fa-eye-slash').addClass('fa-eye');
  });
});
