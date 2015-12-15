Template.threadList.onCreated(function() {
  // show the loading spinner
  IonLoading.show();

  var self = this;
  self.autorun(function() {
    if (Geolocation.latLng()) {
      console.log('GPS Ready');
      self.subscribe('threads', 1000, Geolocation.latLng().lng, Geolocation.latLng().lat, function () {
        console.log("Threads data ready.");
        // data is ready, remove the loading spinner
        IonLoading.hide();
      });
    }
  });
});

Template.threadList.helpers({
  threads: function() {
    return Threads.find({}, {sort: {createdAt:-1}});
  },

  getThreadPath: function() {
    // hacky.
    return Router.routes.threadDetail.path({_id: this._id});
  }
});
