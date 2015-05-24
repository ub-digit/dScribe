import Ember from 'ember';

export default Ember.Object.extend({

  isRightPage: Ember.computed.equal('physical', 'RightPage'),

  isLeftPage: Ember.computed.equal('physical', 'LeftPage'),

  isUndefined: Ember.computed.equal('physical', 'undefined'),

  isDoublePage: Ember.computed.equal('physical', 'DoublePage'),

  // Returns true if item should be displayed on its own
  isAlone: Ember.computed('physical', 'nextItem.physical', 'previousItem.physical', function(){
    if (this.get('isDoublePage')) {
      return true;
    }
    if (this.get('isLeftPage') && !this.get('nextItem').get('isRightPage')) {
      return true;
    }
    if (this.get('isRightPage') && (!this.get('previousItem') || (!this.get('previousItem').get('isLeftPage')))) {
      return true;
    }
    if (this.get('isUndefined') && (!this.get('nextItem') || (!this.get('nextItem').get('isUndefined')))) {
      console.log('undefined', this.get('nextItem'));
      return true;
    }
    return false;
  }),

  partnerPage: Ember.computed('physical', 'nextItem', 'previousItem', function(){
    if (this.get('isLeftPage') && this.get('nextItem') && this.get('nextItem').get('isRightPage')) {
      return this.get('nextItem');
    }
    if (this.get('isRightPage') && this.get('previousItem') && this.get('previousItem').get('isLeftPage')) {
      return this.get('previousItem');
    }
    return null;
  })
});
