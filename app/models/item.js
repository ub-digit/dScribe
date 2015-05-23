import Ember from 'ember';

export default Ember.Object.extend({

  isRightPage: Ember.computed.equal('physical', 'RightPage'),

  isLeftPage: Ember.computed('physical', function(){
    return this.get('physical') === 'LeftPage';
  }),

  // Returns true if item should be displayed on its own
  isAlone: Ember.computed('physical', 'nextItem', 'previousItem', function(){
    if (this.get('physical') === 'DoublePage') {
      return true;
    }
    if (this.get('isLeftPage') && !this.get('nextItem').get('isRightPage')) {
      console.log('leftpage', this.get('nextItem'));
      return true;
    }
    if (this.get('isRightPage') && (!this.get('previousItem') || (!this.get('previousItem').get('isLeftPage')))) {
      console.log('rightpage', this.get('previousItem'));
      return true;
    }
    return false;
  })
});
