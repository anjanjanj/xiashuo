Meteor.startup(function () {
  Threads._ensureIndex({'loc':'2dsphere'});
});
