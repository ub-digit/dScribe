import Ember from 'ember';
import InViewportMixin from 'd-scribe/mixins/in-view-port';

export default Ember.Component.extend(InViewportMixin, {
  tagName: 'div',
  classNames: ['inactive-image'],
  classNameBindings: ['enteredViewport:entered-viewport', 'item.isAlone:col-xs-12:col-xs-6'],
  activeFrame: false,

  mouseEnter: function(){
    this.set('activeFrame', true);
  },
  mouseLeave: function(){
    this.set('activeFrame', false);
  },

  actions: {
    copyFrame: function(fromItem, toItem){
      toItem.set('selection', Ember.copy(fromItem.get('selection')));
    },
    setPhysical: function(item, physical){
      item.set('physical', physical);
    }
  }
});
