Template.testStats.helpers({
  loc: function() {
    return Geo.getLocation();
  },
  uid: function() {
    return Meteor.userId();
  }
});
