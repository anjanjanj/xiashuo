Template.newThreadModal.events({
  "submit #newThreadForm": function (event, template) {

    event.preventDefault();
    //IonLoading.show();

    Meteor.call('addThread', event.target.title.value, event.target.message.value, Geolocation.latLng().lng, Geolocation.latLng().lat);

    //IonLoading.hide();
    IonModal.close();
  }
});

Template.newThreadModal.onRendered(function() {
  $('#newThreadForm').validate();
});
