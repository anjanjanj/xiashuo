// Template.hello.helpers({
//   loc: function() {
//     return Geo.getLocation();
//   },
//   uid: function() {
//     return Meteor.userId();
//   }
// });

Meteor.autorun(function() {
  var ready = Session.get('locationReady');

  if (ready) {
    console.log('GPS Ready');
    Meteor.subscribe('threads', 1000, Geo.getLocation()[0], Geo.getLocation()[1], function () {
      console.log("Threads data ready.");
    });
  }

});

Meteor.startup(function() {
  // initialise geolocation (gps.js)
  Geo.initLocation();
});
