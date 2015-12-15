Template.threadList.onCreated(function() {
  // show the loading spinner
  IonLoading.show();

  if (!Session.get('threadSearchRange')) {
    Session.set('threadSearchRange', 1000);
  }

  var self = this;
  self.autorun(function() {
    if (Geolocation.latLng()) {
      console.log('GPS Ready');
      self.subscribe('threads', Number(Session.get('threadSearchRange')), Geolocation.latLng().lng, Geolocation.latLng().lat, function () {
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
  },

  getSessionRange: function() {
    var range = Session.get('threadSearchRange');
    if (range >= 1000) {
      return (Math.round(range/1000) + "km");
    }
    else {
      return range + "m";
    }
  }
});
