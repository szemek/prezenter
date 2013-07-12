var casper = require('casper').create();
var SUBMIT = true;

casper.start('http://localhost:3000/sign_in', function() {
  this.test.assertTitle('Sign in');
});

casper.then(function() {
  this.test.assertExists('form[action="/sign_in"]');
  this.test.assertExists('input[type="submit"]');
  this.fill('form[action="/sign_in"]', {
    username: 'username',
    password: 'password'
  }, SUBMIT);
});

casper.then(function() {
  this.test.assertNotEquals(this.getCurrentUrl(), 'http://localhost:3000/');
});

casper.thenOpen('http://localhost:3000/sign_up', function() {
  this.test.assertTitle('Sign up');
});

casper.then(function() {
  this.test.assertExists('form[action="/sign_up"]');
  this.test.assertExists('input[type="submit"]');
  this.fill('form[action="/sign_up"]', {
    username: 'username',
    password: 'password'
  }, SUBMIT);
});

casper.then(function() {
  this.test.assertEquals(this.getCurrentUrl(), 'http://localhost:3000/');
});

casper.run(function() {
  this.test.renderResults(true);
});
