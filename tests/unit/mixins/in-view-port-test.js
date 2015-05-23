import Ember from 'ember';
import InViewPortMixin from 'd-scribe/mixins/in-view-port';

module('InViewPortMixin');

// Replace this with your real tests.
test('it works', function() {
  var InViewPortObject = Ember.Object.extend(InViewPortMixin);
  var subject = InViewPortObject.create();
  ok(subject);
});
