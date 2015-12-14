Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.route('/', function () {
  this.render('threadList');
});
