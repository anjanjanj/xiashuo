Template.threadDetail.onCreated(function() {
  // show the loading spinner
  IonLoading.show();

  this.subscribe('threadDetail', Router.current().params._id, function () {
    console.log("Thread data ready.");
    // data is ready, remove the loading spinner
    IonLoading.hide();
  });

});
