import Ember from 'ember';
import Item from 'd-scribe/models/item';

export default Ember.Route.extend({
  model: function() {
    var list = Ember.A([]);
    var currentItem = null;
    var previousItem = null;
    for(var i=1;i<=101;i++){
      var str = "" + i
      var pad = "0000";
      var str = pad.substring(0, pad.length - str.length) + str;
      //If number is even, set LeftPage 
      var physical = "RightPage";
      if (i % 2 == 0) {
        physical = "LeftPage"
      }
      currentItem = Item.create({
        small: "images/sample_jobs/job1/web_small/" + str + ".jpg", 
        tiny: "images/sample_jobs/job1/web_tiny/" + str + ".jpg", title: str,
        selection: {x: 200, y: 200, w: 200, h: 200},
        logical: 'undefined',
        physical: physical,
        previousItem: previousItem
      });
      list.pushObject(currentItem);
      if (previousItem !== null){
        previousItem.set('nextItem', currentItem);
      }
      previousItem = currentItem;
    }
    return list;
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }
});
