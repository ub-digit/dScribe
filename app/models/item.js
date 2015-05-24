import Ember from 'ember';

export default Ember.Object.extend({

  isRightPage: Ember.computed.equal('physical', 'RightPage'),

  isLeftPage: Ember.computed.equal('physical', 'LeftPage'),

  isUndefined: Ember.computed.equal('physical', 'undefined'),

  isDoublePage: Ember.computed.equal('physical', 'DoublePage'),

  isSameSelectionAsPartner: Ember.computed('selection.x', 'selection.y', 'selection.w', 'selection.h', 'partnerPage.selection.x', 'partnerPage.selection.y', 'partnerPage.selection.h', 'partnerPage.selection.w','partnerPage', function(){
    if (this.get('partnerPage') && this._selectionEqualTo(this.get('partnerPage.selection'))) {
      return true;
    }
    return false;
  }),

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
  }),

  // Returns true if items selection box is equal to given box object
  _selectionEqualTo: function(selection) {
    if (this.get('selection.x') === selection.x && this.get('selection.y') === selection.y && this.get('selection.h') === selection.h && this.get('selection.w') === selection.w) {
      return true;
    }
    return false;
  }
});
