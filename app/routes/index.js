import Ember from 'ember';
import Item from 'd-scribe/models/item';

export default Ember.Route.extend({
  model: function() {
    var list = Ember.A([]);
    var currentItem = null;
    var previousItem = null;
    for(var i=1;i<=501;i++){
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
//        tiny: "images/sample_jobs/job1/web_tiny/" + str + ".jpg", title: str,
	tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDACAWGBwYFCAcGhwkIiAmMFA0MCws\nMGJGSjpQdGZ6eHJmcG6AkLicgIiuim5woNqirr7EztDOfJri8uDI8LjKzsb/\n2wBDASIkJDAqMF40NF7GhHCExsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbG\nxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsb/wAARCAERAL8DAREAAhEBAxEB/8QA\nGgAAAwEBAQEAAAAAAAAAAAAAAAECAwUEBv/EADgQAAICAAMFBQYFBAIDAAAA\nAAABAhEDITEEEkFRcRQiMjNhNFJygZGhBRMVQtEjYmOxU/CCweH/xAAXAQEB\nAQEAAAAAAAAAAAAAAAAAAQID/8QAHREBAQEBAAMBAQEAAAAAAAAAAAERMQIS\nIUFRYf/aAAwDAQACEQMRAD8A4EYuUkoq2wNuyYqaTSVq9SauVPZ8X3Bp60dm\nxfc+41fWjs2L7v3GnrVR2TGk6UfuNT1qnsG0L9q+o0wdg2j3F9Rphdix7rdX\n1GmDsO0e59xpg7Dj+59xph9h2j3F9RpgWwbQ/wBi+o0wdg2j3F9Rpg7Dj+6v\nqhpg7Bj+6vqNMP8AT8flH6jTES2PGi6cV9Rp60uy4vJfUavrR2XF5L6jT1o7\nLi8l9Rp60dlxeS+o09apbHi8k+OTGpled5MqNNnV48E3Sbol4s66WNurESjo\nlRl0KEXOcYLWTpAdF/hG7FuWPFJavd0LjPshfh2Dx2zD+i/kYe7TC2HAhJvt\neG6Xp/IxL5NPydmWu1w+38jDSez7K9dqVehcTS7Psd5bSl0QxZ5YqGBss5Rh\nHaXKTySrUYmt/wBMw/fl9hhrzbVsqw8OE8LEbUnWZF+vNW4rlJsiou3bYBcF\nwbAPzOSoAUpy0AmStZtMDBqmGpdIKAABptaAcyec31NuNVheZHqS8Xx66M/H\nRl1abN7ThfGv9hLx9DjRU8CcZK04vI25OFGdwlcI92SS+bdgDnupuMYrOS06\ngGJLdeKlGCUZUu6uKf8AADxsWUN7cUVU3+1en8gXaWLhpRhTk0+4tMgK2HEk\n8fZrUc5STqKXADsY0pOSwkvHxXBcf++pK34ydef8UqOzQSySlX2JU8euS2SN\nUioQFrcis3bIFKdrkuQVNhEvMprNqiNykAANAcyfjl1NuVPD8yPUl4TrpYnm\n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\nAAAAAAAAAAAAAAAAAAAAAAAAAH//2Q==\n",
        title: str,
        selection: {x: 20, y: 20, w: 500, h: 800},
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
