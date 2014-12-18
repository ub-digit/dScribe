App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    var list=[];
    for(var i=1;i<=1012;i++){
      var str = "" + i
      var pad = "0000"
      var str = pad.substring(0, pad.length - str.length) + str
      list.push({small: "sample_jobs/job1/web_small/" + str + ".jpg", tiny: "sample_jobs/job1/web_tiny/" + str + ".jpg", title: str});
    }
    return list;
    //return ['Shiba Inu', 'Siberian Husky', 'Labrador', 'Golden Retriever', 'Malamute', 'Pomeranian', 'Doberman'];
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }
});

App.InViewportMixin = Ember.Mixin.create({
  scrollTimeout: 100,
  boundingClientRect: 0,
  windowHeight: 0,
  windowWidth: 0,
  enteredViewport: Em.computed('boundingClientRect', 'windowHeight', 'windowWidth', function() {
    var rect, windowHeight, windowWidth;
    rect = this.get('boundingClientRect');
    windowHeight = this.get('windowHeight');
    windowWidth = this.get('windowWidth');
    console.log(rect.height)
    return (
      rect.top >= -200-rect.height && 
      rect.left >= 0 && 
      rect.bottom <= windowHeight+200+rect.height && 
      rect.right <= windowWidth

    );
  }),
  exitedViewport: Em.computed.not('enteredViewport'),
  _updateBoundingClientRect: function() {
    var el;
    el = this.$()[0];
    this.set('boundingClientRect', el.getBoundingClientRect());
  },
  _setup: (function() {
    return Em.run.scheduleOnce('afterRender', this, function() {
      this._updateBoundingClientRect();
      this.set('windowHeight', window.innerHeight || document.documentElement.clientHeight);
      this.set('windowWidth', window.innerWidth || document.documentElement.clientWidth);
    });
  }).on('didInsertElement'),
  _scrollHandler: function() {
    return Em.run.debounce(this, '_updateBoundingClientRect', this.get('scrollTimeout'));
  },
  _bindScroll: (function() {
    var scrollHandler;
    scrollHandler = this._scrollHandler.bind(this);
    Ember.$(document).on('touchmove.scrollable', scrollHandler);
    Ember.$(window).on('scroll.scrollable', scrollHandler);
  }).on('didInsertElement'),
  _unbindScroll: (function() {
    Ember.$(window).off('.scrollable');
    Ember.$(document).off('.scrollable');
  }).on('willDestroyElement')
});

App.ThisIsDogComponent = Ember.Component.extend(App.InViewportMixin, {
  classNames: ['dog-card'],
  classNameBindings: ['enteredViewport:entered-viewport']
});
