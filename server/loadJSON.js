Meteor.startup(function () {
  staticData = Object.create(null);

  staticData.emojis = JSON.parse(Assets.getText('emojis.json'));
  console.log("Emojis data loaded from JSON");
});
