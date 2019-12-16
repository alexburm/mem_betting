function resizeCanvas() {
   // only change the size of the canvas if the size it's being displayed
   // has changed.
   var width = window.innerWidth;
   var height = window.innerHeight;
   if (canvas.width != width ||
       canvas.height != height) {
     // Change the size of the canvas to match the size it's being displayed
     canvas.width = width;
     canvas.height = height;
   }
   widthheight = width/height;
overlay.style.left = (Math.floor(canvas.width/2)-20).toString() + "px";
overlay.style.top = Math.floor(canvas.height/2).toString() + "px";
};


function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
};

function createArcVerticesForAllElements()
{
    arc_vertices = [];
    for (var angle=0; angle<=350; angle=angle+10)
    {
           var these_arc_vertices = makeArcVertices(0.0,0.0, radius+.2, 10,0.075,angle,angle+20);
    
        arc_vertices.push(these_arc_vertices);
    }
};

function makeCircleVertices(centerX, centerY, radius, vertexCount) {
   var circleData = [];
   circleData.push(centerX/widthheight);
   circleData.push(centerY);
   circleData.push(0.0);
   for ( var i = 0; i <= vertexCount; i++) {
      var angle = i/vertexCount * 2 * Math.PI;
      circleData.push( (centerX + radius*Math.cos(angle))/widthheight );
      circleData.push( centerY + radius*Math.sin(angle) );
      circleData.push(0.0);
   }
   
   circleData.push(centerX/widthheight);
   circleData.push(centerY);
   circleData.push(0.0);
   return circleData;
};   

function makeArcVertices(centerX, centerY, radius, numsegments, width, start,end) {
   var circleData = [];
   var start_rad = start*Math.PI/180;
   var end_rad = end*Math.PI/180;
   var increment = (end_rad-start_rad) / numsegments;
   for ( var i = start_rad; i <= end_rad; i+=increment) {
      var angle = i;
      
      circleData.push( (centerX + (radius)*Math.cos(angle))/widthheight );
      circleData.push( centerY + (radius)*Math.sin(angle) );
      circleData.push(0.0);
      circleData.push( (centerX + (width+radius)*Math.cos(angle))/widthheight );
      circleData.push( centerY + (width+radius)*Math.sin(angle) );
      circleData.push(0.0);
    
   }
   return circleData;
};
