Template.testStats.helpers({
  loc: function() {
    return Geo.getLocation();
  },
  uid: function() {
    return Meteor.userId();
  }
});

// Meteor.autorun(function() {
//   var ready = Session.get('locationReady');
//
//   if (ready) {
//     console.log('GPS Ready');
//     Meteor.subscribe('threads', 1000, Geo.getLocation()[0], Geo.getLocation()[1], function () {
//       console.log("Threads data ready.");
//     });
//   }
//
// });

Meteor.startup(function() {
  // initialise geolocation (gps.js)
  Geo.initLocation();
});

Template.threadList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var ready = Session.get('locationReady');
    if (ready) {
      console.log('GPS Ready');
      self.subscribe('threads', 1000, Geo.getLocation()[0], Geo.getLocation()[1], function () {
        console.log("Threads data ready.");
      });
    }
  });
});

Template.threadList.helpers({
  threads: function() {
    // var postId = FlowRouter.getParam('postId');
    // var post = Posts.findOne({_id: postId}) || {};
    // return post;
    return Threads.find();
  }
});
