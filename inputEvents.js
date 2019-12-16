function waitForKey()
{
    if (key_press == 1 || key_press == 2)
        {
            t1=performance.now();
            rt = t1-t0;
            if (feedback_frames_start == 0)
            {
                t0=performance.now();
                start_rt = 0;
                feedback_frames_start = 1;
            }
            drawDelayFrameWithoutCross();
            if (key_press == (change_signal+1))
            {
                overlay.style.left = (Math.floor(canvas.width/2)-150).toString() + "px";
                overlay.style.top = Math.floor(canvas.height/2).toString() + "px";
                overlay.style.color = "blue";
                textNode.nodeValue = "CORRECT";
                trial_correct = 1;
              
            }
            else
            {
                
                overlay.style.left = (Math.floor(canvas.width/2)-150).toString() + "px";
                overlay.style.top = Math.floor(canvas.height/2).toString() + "px";
                overlay.style.color = "red";
                textNode.nodeValue = "INCORRECT";
                trial_correct = 0;
            }
            rt = Math.floor(rt);
            clearInterval(interval);
            delay_interval = setInterval(basicDelay,2000);
            
            
        }
       
};


function getMouseAngle(x,y)
{
    var radians = Math.atan2(y,x);  
    var degrees =(360-((radians * 180/Math.PI)))%360;
    return degrees;
};

function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
var rect = canvas.getBoundingClientRect();
        // Use event.pageX / event.pageY here
        mousePos = {
            x: event.pageX,
            y: event.pageY,
            width: rect.width,
            height: rect.height
        };
    };
