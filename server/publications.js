Meteor.publish('threads', function(distance, longitude, latitude) {
  check(distance, Number);
  check(longitude, Number);
  check(latitude, Number);

  // only allow 100m, 1km, or 10km
  if ([100, 1000, 10000].indexOf(distance) < 0) distance = 1000;

  var data = Threads.find({
    loc: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude]
        },
        $maxDistance: distance,
        $minDistance: 0
      }
    }
  }, {
    fields: {
      _id: 1,
      title: 1,
      createdAt: 1,
      updatedAt: 1
    },
    sort: {
      createdAt: -1
    },
    limit: 20
  });

  if (data) {
    return data;
  }

  return this.ready();
});

Meteor.publish('threadDetail', function(threadId) {
  check(threadId, String);

  var data = Threads.find({
    _id: threadId
  }, {
    fields: {
      _id: 1,
      title: 1,
      createdAt: 1,
      updatedAt: 1,
      "posts.message": 1,
      "posts.timestamp": 1
    },
    limit: 1
  });

  if (data) {
    return data;
  }

  return this.ready();
});
