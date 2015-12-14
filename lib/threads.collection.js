Threads = new Mongo.Collection("threads");

Threads.attachSchema(new SimpleSchema({
  loc: {
    type: Object
  },
  "loc.type": {
    // = "Point"
    type: String
  },
  "loc.coordinates": {
    type: [Number],
    decimal:true
  },

  posts: {
    type: [Object]
  },
  "posts.$.authorId": {
    type: String
  },
  "posts.$.message": {
    type: String
  },
  "posts.$.timestamp": {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    }
  },
  // "posts.$.emojiIcon": {
  //   type: String // autogenerate this on server side?
  // },

  title: {
    type: String
  },

  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    }
  },

  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  }

}));
