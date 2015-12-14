Template.newThreadModal.events({
  // @TODO: change submit to click?
  "submit #newThreadForm": function (event, template) {
    // @FIXME: make this work with Geo instead of using Location.

    event.preventDefault();
    //IonLoading.show();

    //console.log(event.target.title.value, event.target.message.value, Location.getReactivePosition().longitude, Location.getReactivePosition().latitude);

    //console.log(event.target.message.value);
    Meteor.call('addThread', event.target.title.value, event.target.message.value, Location.getReactivePosition().longitude, Location.getReactivePosition().latitude);

    //IonLoading.hide();
    IonModal.close();
  }
});
