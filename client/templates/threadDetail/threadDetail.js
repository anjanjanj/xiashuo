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
  },

  getOPDisplayName: function(posts) {
    return posts[0].displayName;
  }
});

Template.threadDetail.events({
  "click #sendMessageBtn": function(event, template) {
    event.preventDefault();

    // only submit if a message has been written
    if ($("#messageBox").val().length > 0) {

      Meteor.call('addPost', $("#post-title").attr("data-thread"), $("#messageBox").val(), function(err, data) {
        if (err) console.log(err);

        $(".content-stable").animate({scrollTop:$("div.view").height()}, 300);
      });

      $("#messageBox").val("");

    }
  }
});
