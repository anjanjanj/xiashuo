// FlowRouter.route('/', {
//   name: 'threadList',
//   action: function(params) {
//     BlazeLayout.render("mainLayout", {content: "threadList"});
//   }
// });
//
// FlowRouter.route('/newthread', {
//   name: 'insertThreadForm',
//   action: function(params) {
//     BlazeLayout.render("mainLayout", {content: "insertThreadForm"});
//   }
// });

Router.configure({
  layoutTemplate: 'mainLayout'
});

Router.route('/', function () {
  this.render('threadList');
});

Router.route('/newthread', function () {
  this.render('insertThreadForm');
});
