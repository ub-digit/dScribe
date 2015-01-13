// variables
var canvas, ctx;
var canvas2, ctx2;
var image;
var image2;
var iMouseX, iMouseY = 1;
var theSelection;
var theSelection2;

// define Selection constructor
function Selection(x, y, w, h){
    this.x = x; // initial positions
    this.y = y;
    this.w = w; // and size
    this.h = h;

    this.px = x; // extra variables to dragging calculations
    this.py = y;

    this.csize = 6; // resize cubes size
    this.csizeh = 10; // resize cubes size (on hover)

    this.bHow = [false, false, false, false]; // hover statuses
    this.iCSize = [this.csize, this.csize, this.csize, this.csize]; // resize cubes sizes
    this.bDrag = [false, false, false, false]; // drag statuses
    this.bDragAll = false; // drag whole selection
}

// define Selection draw method
Selection.prototype.draw = function(){

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x, this.y, this.w, this.h);

    // draw part of original image
    if (this.w > 0 && this.h > 0) {
        ctx.drawImage(image, this.x, this.y, this.w, this.h, this.x, this.y, this.w, this.h);
    }

    // draw resize cubes
    ctx.fillStyle = '#fff';
    ctx.fillRect(this.x - this.iCSize[0], this.y - this.iCSize[0], this.iCSize[0] * 2, this.iCSize[0] * 2);
    ctx.fillRect(this.x + this.w - this.iCSize[1], this.y - this.iCSize[1], this.iCSize[1] * 2, this.iCSize[1] * 2);
    ctx.fillRect(this.x + this.w - this.iCSize[2], this.y + this.h - this.iCSize[2], this.iCSize[2] * 2, this.iCSize[2] * 2);
    ctx.fillRect(this.x - this.iCSize[3], this.y + this.h - this.iCSize[3], this.iCSize[3] * 2, this.iCSize[3] * 2);

}

// define Selection draw method
Selection.prototype.draw2 = function(){
	
	ctx2.strokeStyle = '#000';
    ctx2.lineWidth = 1;
    ctx2.strokeRect(this.x, this.y, this.w, this.h);

    // draw part of original image
    if (this.w > 0 && this.h > 0) {
        ctx2.drawImage(image2, this.x, this.y, this.w, this.h, this.x, this.y, this.w, this.h);
    }

    // draw resize cubes
    ctx2.fillStyle = '#fff';
    ctx2.fillRect(this.x - this.iCSize[0], this.y - this.iCSize[0], this.iCSize[0] * 2, this.iCSize[0] * 2);
    ctx2.fillRect(this.x + this.w - this.iCSize[1], this.y - this.iCSize[1], this.iCSize[1] * 2, this.iCSize[1] * 2);
    ctx2.fillRect(this.x + this.w - this.iCSize[2], this.y + this.h - this.iCSize[2], this.iCSize[2] * 2, this.iCSize[2] * 2);
    ctx2.fillRect(this.x - this.iCSize[3], this.y + this.h - this.iCSize[3], this.iCSize[3] * 2, this.iCSize[3] * 2);
}

function drawScene() { // main drawScene function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas

    // draw source image
    ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);

    // and make it darker
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // draw selection
    theSelection.draw();
	
	
	ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height); // clear canvas

    // draw source image
    ctx2.drawImage(image2, 0, 0, ctx2.canvas.width, ctx2.canvas.height);

    // and make it darker
    ctx2.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx2.fillRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);

    // draw selection
    theSelection2.draw2();
}

$(function(){
    // loading source image
    image = new Image();
    image.onload = function () {
    }
    image.src = 'images/0002.jpg';
	image2 = new Image();
    image2.onload = function () {
    }
    image2.src = 'images/0003.jpg';

    // creating canvas and context objects
    canvas = document.getElementById('panel');
	canvas2 = document.getElementById('panel2');
    ctx = canvas.getContext('2d');
	ctx2 = canvas2.getContext('2d');
	canvas.height = image.height;
	canvas.width = image.width;
	canvas2.height = image2.height;
	canvas2.width = image2.width;

    // create initial selection
    theSelection = new Selection(200, 200, 200, 200);
	theSelection2 = new Selection(200, 200, 200, 200);

    $('#panel').mousemove(function(e) { // binding mouse move event
        var canvasOffset = $(canvas).offset();
        iMouseX = Math.floor(e.pageX - canvasOffset.left);
        iMouseY = Math.floor(e.pageY - canvasOffset.top);

        // in case of drag of whole selector
        if (theSelection.bDragAll) {
            theSelection.x = iMouseX - theSelection.px;
            theSelection.y = iMouseY - theSelection.py;
        }

        for (i = 0; i < 4; i++) {
            theSelection.bHow[i] = false;
            theSelection.iCSize[i] = theSelection.csize;
        }

        // hovering over resize cubes
        if (iMouseX > theSelection.x - theSelection.csizeh && iMouseX < theSelection.x + theSelection.csizeh &&
            iMouseY > theSelection.y - theSelection.csizeh && iMouseY < theSelection.y + theSelection.csizeh) {

            theSelection.bHow[0] = true;
            theSelection.iCSize[0] = theSelection.csizeh;
        }
        if (iMouseX > theSelection.x + theSelection.w-theSelection.csizeh && iMouseX < theSelection.x + theSelection.w + theSelection.csizeh &&
            iMouseY > theSelection.y - theSelection.csizeh && iMouseY < theSelection.y + theSelection.csizeh) {

            theSelection.bHow[1] = true;
            theSelection.iCSize[1] = theSelection.csizeh;
        }
        if (iMouseX > theSelection.x + theSelection.w-theSelection.csizeh && iMouseX < theSelection.x + theSelection.w + theSelection.csizeh &&
            iMouseY > theSelection.y + theSelection.h-theSelection.csizeh && iMouseY < theSelection.y + theSelection.h + theSelection.csizeh) {

            theSelection.bHow[2] = true;
            theSelection.iCSize[2] = theSelection.csizeh;
        }
        if (iMouseX > theSelection.x - theSelection.csizeh && iMouseX < theSelection.x + theSelection.csizeh &&
            iMouseY > theSelection.y + theSelection.h-theSelection.csizeh && iMouseY < theSelection.y + theSelection.h + theSelection.csizeh) {

            theSelection.bHow[3] = true;
            theSelection.iCSize[3] = theSelection.csizeh;
        }

        // in case of dragging of resize cubes
        var iFW, iFH;
        if (theSelection.bDrag[0]) {
            var iFX = iMouseX - theSelection.px;
            var iFY = iMouseY - theSelection.py;
            iFW = theSelection.w + theSelection.x - iFX;
            iFH = theSelection.h + theSelection.y - iFY;
        }
        if (theSelection.bDrag[1]) {
            var iFX = theSelection.x;
            var iFY = iMouseY - theSelection.py;
            iFW = iMouseX - theSelection.px - iFX;
            iFH = theSelection.h + theSelection.y - iFY;
        }
        if (theSelection.bDrag[2]) {
            var iFX = theSelection.x;
            var iFY = theSelection.y;
            iFW = iMouseX - theSelection.px - iFX;
            iFH = iMouseY - theSelection.py - iFY;
        }
        if (theSelection.bDrag[3]) {
            var iFX = iMouseX - theSelection.px;
            var iFY = theSelection.y;
            iFW = theSelection.w + theSelection.x - iFX;
            iFH = iMouseY - theSelection.py - iFY;
        }

        if (iFW > theSelection.csizeh * 2 && iFH > theSelection.csizeh * 2) {
            theSelection.w = iFW;
            theSelection.h = iFH;

            theSelection.x = iFX;
            theSelection.y = iFY;
        }

		$('#results #height').text(theSelection.h); //Display the current width
		$('#results #width').text(theSelection.w); //Display the current width
		$('#results #x').text(theSelection.x); //Display the current x-offset
		$('#results #y').text(theSelection.y); //Display the current y-offset
		
        drawScene();
    });

    $('#panel').mousedown(function(e) { // binding mousedown event
        var canvasOffset = $(canvas).offset();
        iMouseX = Math.floor(e.pageX - canvasOffset.left);
        iMouseY = Math.floor(e.pageY - canvasOffset.top);

        theSelection.px = iMouseX - theSelection.x;
        theSelection.py = iMouseY - theSelection.y;

        if (theSelection.bHow[0]) {
            theSelection.px = iMouseX - theSelection.x;
            theSelection.py = iMouseY - theSelection.y;
        }
        if (theSelection.bHow[1]) {
            theSelection.px = iMouseX - theSelection.x - theSelection.w;
            theSelection.py = iMouseY - theSelection.y;
        }
        if (theSelection.bHow[2]) {
            theSelection.px = iMouseX - theSelection.x - theSelection.w;
            theSelection.py = iMouseY - theSelection.y - theSelection.h;
        }
        if (theSelection.bHow[3]) {
            theSelection.px = iMouseX - theSelection.x;
            theSelection.py = iMouseY - theSelection.y - theSelection.h;
        }
        

        if (iMouseX > theSelection.x + theSelection.csizeh && iMouseX < theSelection.x+theSelection.w - theSelection.csizeh &&
            iMouseY > theSelection.y + theSelection.csizeh && iMouseY < theSelection.y+theSelection.h - theSelection.csizeh) {

            theSelection.bDragAll = true;
        }

        for (i = 0; i < 4; i++) {
            if (theSelection.bHow[i]) {
                theSelection.bDrag[i] = true;
            }
        }
		
    });

    $('#panel').mouseup(function(e) { // binding mouseup event
        theSelection.bDragAll = false;

        for (i = 0; i < 4; i++) {
            theSelection.bDrag[i] = false;
        }
        theSelection.px = 0;
        theSelection.py = 0;
    });
	
	drawScene();
	
	
	$('#panel2').mousemove(function(e) { // binding mouse move event
        var canvasOffset = $(canvas2).offset();
        iMouseX = Math.floor(e.pageX - canvasOffset.left);
        iMouseY = Math.floor(e.pageY - canvasOffset.top);

        // in case of drag of whole selector
        if (theSelection2.bDragAll) {
            theSelection2.x = iMouseX - theSelection2.px;
            theSelection2.y = iMouseY - theSelection2.py;
        }

        for (i = 0; i < 4; i++) {
            theSelection2.bHow[i] = false;
            theSelection2.iCSize[i] = theSelection2.csize;
        }

        // hovering over resize cubes
        if (iMouseX > theSelection2.x - theSelection2.csizeh && iMouseX < theSelection2.x + theSelection2.csizeh &&
            iMouseY > theSelection2.y - theSelection2.csizeh && iMouseY < theSelection2.y + theSelection2.csizeh) {

            theSelection2.bHow[0] = true;
            theSelection2.iCSize[0] = theSelection2.csizeh;
        }
        if (iMouseX > theSelection2.x + theSelection2.w-theSelection2.csizeh && iMouseX < theSelection2.x + theSelection2.w + theSelection2.csizeh &&
            iMouseY > theSelection2.y - theSelection2.csizeh && iMouseY < theSelection2.y + theSelection2.csizeh) {

            theSelection2.bHow[1] = true;
            theSelection2.iCSize[1] = theSelection2.csizeh;
        }
        if (iMouseX > theSelection2.x + theSelection2.w-theSelection2.csizeh && iMouseX < theSelection2.x + theSelection2.w + theSelection2.csizeh &&
            iMouseY > theSelection2.y + theSelection2.h-theSelection2.csizeh && iMouseY < theSelection2.y + theSelection2.h + theSelection2.csizeh) {

            theSelection2.bHow[2] = true;
            theSelection2.iCSize[2] = theSelection2.csizeh;
        }
        if (iMouseX > theSelection2.x - theSelection2.csizeh && iMouseX < theSelection2.x + theSelection2.csizeh &&
            iMouseY > theSelection2.y + theSelection2.h-theSelection2.csizeh && iMouseY < theSelection2.y + theSelection2.h + theSelection2.csizeh) {

            theSelection2.bHow[3] = true;
            theSelection2.iCSize[3] = theSelection2.csizeh;
        }

        // in case of dragging of resize cubes
        var iFW, iFH;
        if (theSelection2.bDrag[0]) {
            var iFX = iMouseX - theSelection2.px;
            var iFY = iMouseY - theSelection2.py;
            iFW = theSelection2.w + theSelection2.x - iFX;
            iFH = theSelection2.h + theSelection2.y - iFY;
        }
        if (theSelection2.bDrag[1]) {
            var iFX = theSelection2.x;
            var iFY = iMouseY - theSelection2.py;
            iFW = iMouseX - theSelection2.px - iFX;
            iFH = theSelection2.h + theSelection2.y - iFY;
        }
        if (theSelection2.bDrag[2]) {
            var iFX = theSelection2.x;
            var iFY = theSelection2.y;
            iFW = iMouseX - theSelection2.px - iFX;
            iFH = iMouseY - theSelection2.py - iFY;
        }
        if (theSelection2.bDrag[3]) {
            var iFX = iMouseX - theSelection2.px;
            var iFY = theSelection2.y;
            iFW = theSelection2.w + theSelection2.x - iFX;
            iFH = iMouseY - theSelection2.py - iFY;
        }

        if (iFW > theSelection2.csizeh * 2 && iFH > theSelection2.csizeh * 2) {
            theSelection2.w = iFW;
            theSelection2.h = iFH;

            theSelection2.x = iFX;
            theSelection2.y = iFY;
        }

		$('#results2 #height').text(theSelection2.h); //Display the current width
		$('#results2 #width').text(theSelection2.w); //Display the current width
		$('#results2 #x').text(theSelection2.x); //Display the current x-offset
		$('#results2 #y').text(theSelection2.y); //Display the current y-offset
		
        drawScene();
    });

    $('#panel2').mousedown(function(e) { // binding mousedown event
        var canvasOffset = $(canvas2).offset();
        iMouseX = Math.floor(e.pageX - canvasOffset.left);
        iMouseY = Math.floor(e.pageY - canvasOffset.top);

        theSelection2.px = iMouseX - theSelection2.x;
        theSelection2.py = iMouseY - theSelection2.y;

        if (theSelection2.bHow[0]) {
            theSelection2.px = iMouseX - theSelection2.x;
            theSelection2.py = iMouseY - theSelection2.y;
        }
        if (theSelection2.bHow[1]) {
            theSelection2.px = iMouseX - theSelection2.x - theSelection2.w;
            theSelection2.py = iMouseY - theSelection2.y;
        }
        if (theSelection2.bHow[2]) {
            theSelection2.px = iMouseX - theSelection2.x - theSelection2.w;
            theSelection2.py = iMouseY - theSelection2.y - theSelection2.h;
        }
        if (theSelection2.bHow[3]) {
            theSelection2.px = iMouseX - theSelection2.x;
            theSelection2.py = iMouseY - theSelection2.y - theSelection2.h;
        }
        

        if (iMouseX > theSelection2.x + theSelection2.csizeh && iMouseX < theSelection2.x+theSelection2.w - theSelection2.csizeh &&
            iMouseY > theSelection2.y + theSelection2.csizeh && iMouseY < theSelection2.y+theSelection2.h - theSelection2.csizeh) {

            theSelection2.bDragAll = true;
        }

        for (i = 0; i < 4; i++) {
            if (theSelection2.bHow[i]) {
                theSelection2.bDrag[i] = true;
            }
        }
		
    });

    $('#panel2').mouseup(function(e) { // binding mouseup event
        theSelection2.bDragAll = false;

        for (i = 0; i < 4; i++) {
            theSelection2.bDrag[i] = false;
        }
        theSelection2.px = 0;
        theSelection2.py = 0;
    });

    drawScene();
});

function getResults() {
    var temp_ctx, temp_canvas;
    temp_canvas = document.createElement('canvas');
    temp_ctx = temp_canvas.getContext('2d');
    temp_canvas.width = theSelection.w;
    temp_canvas.height = theSelection.h;
    temp_ctx.drawImage(image, theSelection.x, theSelection.y, theSelection.w, theSelection.h, 0, 0, theSelection.w, theSelection.h);
    var vData = temp_canvas.toDataURL();
    $('#crop_result').attr('src', vData);
}
function getResults2() {
    var temp_ctx, temp_canvas;
    temp_canvas = document.createElement('canvas2');
    temp_ctx = temp_canvas.getContext('2d');
    temp_canvas.width = theSelection2.w;
    temp_canvas.height = theSelection2.h;
    temp_ctx.drawImage(image2, theSelection2.x, theSelection2.y, theSelection2.w, theSelection2.h, 0, 0, theSelection2.w, theSelection2.h);
    var vData = temp_canvas.toDataURL();
    $('#crop_result2').attr('src', vData);
}

function copyFrame() {
    //theSelection2.x = theSelection.x;
	//theSelection2.y = theSelection.y;
	theSelection2.w = theSelection.w;
	theSelection2.h = theSelection.h;
	drawScene();
}
function copyFrame2() {
    //theSelection2.x = theSelection.x;
	//theSelection2.y = theSelection.y;
	theSelection.w = theSelection2.w;
	theSelection.h = theSelection2.h;
	drawScene();
}