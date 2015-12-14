FlowRouter.route('/', {
  name: 'threadList',
  action: function(params) {
    BlazeLayout.render("mainLayout", {content: "threadList"});
  }
});

FlowRouter.route('/newthread', {
  name: 'insertThreadForm',
  action: function(params) {
    BlazeLayout.render("mainLayout", {content: "insertThreadForm"});
  }
});
