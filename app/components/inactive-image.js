import Ember from 'ember';
import InViewportMixin from 'd-scribe/mixins/in-view-port';

export default Ember.Component.extend(InViewportMixin, {
  classNames: ['inactive-image'],
  classNameBindings: ['enteredViewport:entered-viewport']
});
