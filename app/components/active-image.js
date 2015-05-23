import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'canvas',
  classNames: ['active-image'],
  height: 700,
  activeFrame: false,

  didInsertElement: function(){
    var that = this;
    var item = this.get('item');

    // Load image
    
    var promise = new Promise(function(resolve,reject){
      var image = new Image();
      image.onload = function(){
        resolve(image);
      };
      image.src = item.small; // Must be placed AFTER image.load
      //that.set('image', image);
    });

    // Runs when image is loaded
    promise.then(function(image){
      that.set('image', image);
      that.set('item.selection', {x: 0, y: 0, h: image.height, w: image.width});
      Ember.run.scheduleOnce('afterRender', this, function() {
      // creating canvas and context objects
        //that._renderCanvas();
      });
    });
  },
  draw: function(){
    var image = this.get('image');
    var scaleratio = image.height/this.get('height');
    var selection = this.get('item.selection');
    var canvas = this.get('element');
    var ctx = canvas.getContext('2d');
  
    canvas.height = this.get('height');
    canvas.width = image.width/scaleratio;
    // create initial selection
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas
    // draw source image
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);
    // and make it darker
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.strokeRect(selection.x/scaleratio, selection.y/scaleratio, selection.w/scaleratio, selection.h/scaleratio);
    // draw part of original image
    ctx.drawImage(image, selection.x, selection.y, selection.w, selection.h,selection.x/scaleratio, selection.y/scaleratio, selection.w/scaleratio, selection.h/scaleratio);

    // Draw page type
    ctx.font="20px Arial";
    ctx.fillText(this.get('item.physical'),ctx.canvas.width-100,20);

    // Draw active stuff
    if (this.get('activeFrame')){
      ctx.font="20px Arial";
      ctx.fillText(this.get('selectionString'),selection.x,selection.y+20);
    }
  }.observes('image', 'item.selection.x', 'item.selection.y', 'item.selection.h', 'item.selection.w', 'height', 'activeFrame', 'item.physical', 'item.logical'),
  willDestroyElement: function(){
    //console.log('Destroying elememnt');
  },
  mouseEnter: function(){
    this.set('activeFrame', true);
    //this._renderCanvas();
    return this.$().attr({ tabindex: 1 }), this.$().focus();
  },
  mouseLeave: function(){
    this.set('activeFrame', false);
    //this._renderCanvas();
  },

  keyDown: function(e) {
    var that = this;
    e.preventDefault();
    
    switch(e.keyCode) {
    case 38:
      that._moveSelectionUp();
      break;
    case 40:
      that._moveSelectionDown();
      break;
    case 37:
      that._moveSelectionLeft();
      break;
    case 39:
      that._moveSelectionRight();
      break;
    case 102:
      that._expandSelectionHorizontal(6);
      break;
    case 100:
      that._reduceSelectionHorizontal(6);
      break;
    case 104:
      that._expandSelectionVertical(6);
      break;
    case 98:
      that._reduceSelectionVertical(6);
      break;
    default:
        console.log('keyPress', this.get('item.title'), e.keyCode);
    } 
  },

  _moveSelectionUp: function(){
    this.decrementProperty('item.selection.y');
  },

  _moveSelectionDown: function(){
    this.incrementProperty('item.selection.y');
  },

  _moveSelectionLeft: function(){
    this.decrementProperty('item.selection.x');
  },

  _moveSelectionRight: function(){
    this.incrementProperty('item.selection.x');
  },

  _expandSelectionHorizontal: function(spread){
    this.decrementProperty('item.selection.x', parseInt(spread/2));
    this.incrementProperty('item.selection.w', spread);
  },

  _reduceSelectionHorizontal: function(spread){
    this.incrementProperty('item.selection.x', parseInt(spread/2));
    this.decrementProperty('item.selection.w', spread);
  },

  _expandSelectionVertical: function(spread){
    this.decrementProperty('item.selection.y', parseInt(spread/2));
    this.incrementProperty('item.selection.h', spread);
  },

  _reduceSelectionVertical: function(spread){
    this.incrementProperty('item.selection.y', parseInt(spread/2));
    this.decrementProperty('item.selection.h', spread);
  },

  selectionString: Ember.computed('item.selection.x', 'item.selection.y', 'item.selection.h', 'item.selection.w', function(){
    return this.get('item.selection.x') + ', ' + this.get('item.selection.y') + ' ' + this.get('item.selection.w') + ' x ' + this.get('item.selection.h');
  })
});
