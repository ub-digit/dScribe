import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var list=[];
    for(var i=1;i<=101;i++){
      var str = "" + i
      var pad = "0000"
      var str = pad.substring(0, pad.length - str.length) + str
      list.push({
        small: "images/sample_jobs/job1/web_small/" + str + ".jpg", 
        tiny: "images/sample_jobs/job1/web_tiny/" + str + ".jpg", title: str,
        selection: {x: 200, y: 200, w: 200, h: 200}
      });
    }
    return list;
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    console.log('model', model);
  }
});
