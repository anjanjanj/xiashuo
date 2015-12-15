Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.route('/', function () {
  this.render('threadList');
}, {
  name: 'threadList'
});

Router.route('/thread/:_id', function() {
  this.render('threadDetail');
}, {
  name: 'threadDetail'
});
