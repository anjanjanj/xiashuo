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
    });
  }
});
