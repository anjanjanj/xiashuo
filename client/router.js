// @FIXME: get react routing working - does BlazeLayout need to be removed?

FlowRouter.route('/', {
  name: 'main'
  // action: function(params) {
  //   ReactLayout.render(MainLayout, {content: <TestPage />});
  // }
});

FlowRouter.route('/newthread', {
  name: 'insertThreadForm',
  action: function(params) {
    BlazeLayout.render("mainLayout", {content: "insertThreadForm"});
  }
});
