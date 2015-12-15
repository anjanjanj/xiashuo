Template.selectRangePopover.events({
  "touchstart, mousedown #rangeSelect": function(event, template) {
    //console.log($(event.target).attr('data-range'));
    Session.set('threadSearchRange', $(event.target).attr('data-range'));
  }
});
