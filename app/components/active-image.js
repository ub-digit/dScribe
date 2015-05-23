import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'canvas',
  classNames: ['active-image'],
  height: 700,
  selection: {x: 200, y: 200, h: 200, w: 200},

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
      that.set('image', image)
      var image = that.get('image');
      var scaleratio = image.height/700;
      Ember.run.scheduleOnce('afterRender', this, function() {
      // creating canvas and context objects
        that._renderCanvas();
      });
    });
  },
  _renderCanvas: function(){
    var image = this.get('image');
    var scaleratio = image.height/this.get('height');
    var selection = this.get('selection');
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
  },
  willDestroyElement: function(){
  //console.log('Destroying elememnt');
  },
  mouseEnter: function(){
    console.log('mouse over ', this.get('item'));
  }
});
