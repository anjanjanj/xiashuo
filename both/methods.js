Meteor.methods({
  addThread: function (title, message, lng, lat) {
    check(title, String);
    check(message, String);
    check(lng, Number);
    check(lat, Number);

    // verify the user is logged in, just in case something went wrong
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    // // @TODO: add this kind of checking for spoofing later? maybe with a range? will it help?
    // if (Meteor.isClient) {
    //   var reportedGPS = Geo.getLocation();
    //   if (reportedGPS[0] !== lng || reportedGPS[1] !== lat) {
    //     throw new Meteor.Error("not-authorized");
    //   }
    // }

    var loc = {
      type: "Point",
      coordinates: [lng, lat]
    };

    // @TODO: call addPost instead of doing this manually? DRY

    var posts = [{
      authorId: Meteor.userId(),
      message: message,
      timestamp: new Date()
    }];

    Threads.insert({
      title: title,
      createdAt: new Date(),
      loc: loc,
      posts: posts
    }, function (err, _id) {
      if (err) throw new Meteor.Error(err);
      Meteor.call("generateDisplayName", _id);
    });
  },

  addPost: function (threadId, message) {
    check(threadId, String);
    check(message, String);

    if (message.length < 1) {
      throw new Meteor.Error("invalid-input");
    }

    // @TODO: add rate limiting

    // verify the user is logged in, just in case something went wrong
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Threads.update({_id: threadId}, {
      $push: {
        posts: {
          authorId: Meteor.userId(),
          message: message,
          timestamp: new Date()
        }
      }
    }, function (err, numUpdated) {
      if (err) throw new Meteor.Error(err);
      if (numUpdated === 0) throw new Meteor.Error("invalid-thread");
      Meteor.call("generateDisplayName", threadId);
    });

  }
});
