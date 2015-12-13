Meteor.publish('threads', function(distance, longitude, latitude) {
  check(distance, Number);
  check(longitude, Number);
  check(latitude, Number);

  // @TODO: remove this and add other options
  if (distance !== 1000) distance = 1000;

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
