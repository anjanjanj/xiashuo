// @TODO: move to somewhere else later.
Session.set('locationReady', false);

Geo = Object.create(null);

Geo.initLocation = function() {
  //Success Will fire upon completion of the GPS check
  //State will be different for Android and iOS

  //Android States:
  //Enabled
  //Disabled

  //iOS States: (See IOS KClAuthorizationStatus Documentation for more information)
  //NotDetermined -- Never asked user for auhtorization
  //Denied -- Asked User for authorization but they denied
  //Restricted -- Same As Not Determined

  function success(state) {
    if (state === 'Enabled') {
      console.log("GPS Is Enabled");
      Location.locate(function(pos) {
        console.log("Got a position!", pos);
        Session.set('locationReady', true);
      }, function(err) {
        console.log("Oops! There was an error", err);
      });
    }
  }

  //This will fire if either your not running in a cordova application
  //Or the plugin was not found for some reason
  function failure() {
    console.log("Failed to get the GPS State");
  }

  //Options: The only option right now is to show
  //a dialog if gps is disabled. The dialog has a
  //button on it that directs the user to the settings
  //page assocaited with enabling their gps for your app.
  // Dialog : true means the pop up will appear
  var options = {
    dialog: true
  };

  Location.getGPSState(success, failure, options);
};

Geo.getLocation = function() {
  if (Session.get('locationReady')) {
    return [Location.getReactivePosition().longitude, Location.getReactivePosition().latitude];
  }
  else {
    return false;
  }
};
