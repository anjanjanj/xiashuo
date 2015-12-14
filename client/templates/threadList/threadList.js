Template.threadList.onCreated(function() {
  // show the loading spinner
  IonLoading.show();

  // initialise geolocation (gps.js)
  Geo.initLocation();

  var self = this;
  self.autorun(function() {
    var ready = Session.get('locationReady');
    if (ready) {
      console.log('GPS Ready');
      self.subscribe('threads', 1000, Geo.getLocation()[0], Geo.getLocation()[1], function () {
        console.log("Threads data ready.");
        // data is ready, remove the loading spinner
        IonLoading.hide();
      });
    }
  });
});

Template.threadList.helpers({
  threads: function() {
    return Threads.find();
  }
});
