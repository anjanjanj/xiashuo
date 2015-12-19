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
    type: String,
    max: 200
  },
  "posts.$.timestamp": {
    type: Date
  },
  "posts.$.displayName": {
    // autogenerate this on server side
    type: String,
    optional: true
  },

  title: {
    type: String,
    max: 80
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
