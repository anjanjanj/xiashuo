Template.threadDetail.onCreated(function() {
  // show the loading spinner
  IonLoading.show();

  this.subscribe('threadDetail', Router.current().params._id, function () {
    console.log("Thread data ready.");
    // data is ready, remove the loading spinner
    IonLoading.hide();
  });

});

Template.threadDetail.helpers({
  thread: function() {
    return Threads.findOne({});
  }
});

Template.threadDetail.events({
  "click #sendMessage": function(event, template) {
    console.log($("#messageBox").val());
    console.log(event);
    console.log(template);
    // Meteor.call('addPost', )
  }
});
