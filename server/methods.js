Meteor.methods({
  // generateDisplayName checks a thread that has just been posted
  // and sets the display names for all the users inside.
  // server side only so client doesn't know userIds between threads
  generateDisplayName: function(threadId) {
    check(threadId, String);

    var thread = Threads.findOne({_id: threadId});

    if (!thread) {
      throw new Meteor.Error("invalid-thread");
    }

    var usersSymbols = {};

    thread.posts.forEach(function(post) {
      if (!post.displayName) {
        if (usersSymbols[post.authorId]) {
          // set the displayName of the post to what was previously used for this user
          post.displayName = usersSymbols[post.authorId];
        }
        else {
          // we need to generate a new displayName for this user
          var dataSet = staticData.emojis;
          var displayName;

          // first, get a random emoji
          // use 1000 just incase they all get used and the server freezes
          // maybe add an error check for that case eventually
          for (var i = 0; i < 1000; i++) {
            displayName = dataSet[_.random(0, dataSet.length - 1)];
            // if it's not in thread.posts .displayName
            if (!_.some(thread.posts, function(post) {
              return post.displayName == displayName;
            })) {
              break;
            }
          }

          // update the dictionary and the post
          usersSymbols[post.authorId] = displayName;
          post.displayName = displayName;
        }
      }
      else {
        // the post already has a display name, we can add it to the dictionary
        usersSymbols[post.authorId] = post.displayName;
      }
      //console.log(thread.posts);
    });

    // update the thread with the displayName'd posts
    Threads.update({_id: threadId}, {
      $set: {
        posts: thread.posts
      }
    }, function(err, numUpdated) {
      if (err) throw new Meteor.Error(err);
    });

    //console.log(thread.posts);
  }
});
