function drawElement(element){
    var rgb_colors = colormatrix[color_rows[element]];
    var thisColor = [];
    thisColor.push(rgb_colors[0]/255);
    thisColor.push(rgb_colors[1]/255);
    thisColor.push(rgb_colors[2]/255);
    draw(gl.TRIANGLE_FAN,thisColor,circle_vertices[element],circleIndices);
   

};

function drawColorWheel(){
    var count = 0;
    
     for (var angle=0; angle<=35;angle++)
    {
    var rgb_colors = colormatrix[angle*10];
       var thisColor = [];
     thisColor.push(rgb_colors[0]/255);
    thisColor.push(rgb_colors[1]/255);
    thisColor.push(rgb_colors[2]/255);
        draw(gl.TRIANGLE_STRIP,thisColor,arc_vertices[angle],arcIndices);
    }
    
};

function drawEncodingFrame1(){
clearInterval(interval);
        if (encoding_frames_start == 0)
        {
            t1 = performance.now();
            text_frames_time = Math.floor(t1-t0);
            t0 = performance.now();
            text_frames_start = 0;
            encoding_frames_start = 1;
        }
        textNode.nodeValue = "";
    gl.clearColor(bg_color, bg_color, bg_color, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
drawFixationCross();
    for (var element=0; element < set_size; element++)
    {
        drawElement(element);
    }
    interval = setInterval(drawDelayFrame1,encoding);
};

function drawDelayFrame1()
{
    clearInterval(interval);
    if (delay_frames_start == 0)
        {
            t1 = performance.now();
            encoding_frames_time = Math.floor(t1-t0);
            t0 = performance.now();
            encoding_frames_start = 0;
            delay_frames_start = 1;
        }
        if (change_signal == 1 && change_params_set == 0)
        {
            setChangeParams();
        }
        drawDelayFrameWithCross();
        interval = setInterval(drawResponse,delay);
};

function drawResponse()
{
    
    response_phase = 1;
    clearInterval(interval);
    if (start_rt == 0)
        {
            t1=performance.now();
            encoding2_frames_time = Math.floor(t1-t0);
            t0 = performance.now();
            encoding2_frames_start = 0;
            start_rt = 1;
        }
        
        gl.clearColor(bg_color, bg_color, bg_color, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    if (training == 1)
    {
        interval = setInterval(drawTrainingFrame,16);
    }
    else
    {
        interval = setInterval(drawResponseFrame,16);
    }
     
};

function drawAnswer()
{
       clearInterval(interval);
 
    var correct_color = color_rows[probed_element-1];
    var correct_arc_vertices = makeArcVertices(0.0, 0.0, 0.0, 10, .725, correct_color-3,correct_color+3);
    var points = Math.floor(height_at_angle[correct_color] * 1000);
    draw(gl.TRIANGLE_STRIP,[0.0,1.0,0.0],correct_arc_vertices,arcIndices);
    
                overlay.style.color = "blue";
                if (training==1)
                {
                    
                    waiting_for_key = 1;
                    textNode.nodeValue = "You earned " + points + " points. The number of points you earn per\n\
            trial is proportional to the height of the stacked bets at the location of the correct answer. The faster you earn points, the quicker the experiment will\n\
end as it will finish after a fixed number is earned. Once the answer display has disappeared, press [ENTER] to start main experiment.";
                    training=0;
                    wait_interval = setInterval(drawWaitFrame,10000);
                }
                else
                {
                    total_points = total_points + points;
                    textNode.nodeValue = "You earned " + points + " points, for a total of " + total_points + " points.";
                    delay_interval = setInterval(endTrial,2000);
                }
};

function addBet()
{
     var mouse_angle = Math.floor(getMouseAngle(mousePos.x-mousePos.width/2,mousePos.y-mousePos.height/2));
   
    num_bets++;
    bet_values[num_bets-1] = mouse_angle;
    //attach gaussian
    height_at_angle = attachGaussian(mouse_angle,height_at_angle);
    if (num_bets == 8)
    {
        answer = 1;
    }
};

function drawTrainingFrame()
{
    drawDelayFrameWithCross();
    
        drawBetsAndProbe();
    if (mouse_clicked == 0)
    {
               overlay.style.color = "blue";
               textNode.nodeValue = "Please place the first bet at the color you remember for this location.";

    }
    else
    {
        mouse_clicked = 0;
        clearInterval(interval);
        addBet();
        overlay.style.color = "blue";
        textNode.nodeValue = "Now place the second bet overlapping with the first bet.";
        interval = setInterval(secondBetFrame,16);
    }
};

function secondBetFrame()
{
    
        drawBetsAndProbe();
    if (mouse_clicked == 1)
    {
        mouse_clicked = 0;
        var mouse_angle = Math.floor(getMouseAngle(mousePos.x-mousePos.width/2,mousePos.y-mousePos.height/2));
        if (Math.abs(circdist(mouse_angle,bet_values[0])) > 40)
        {
            overlay.style.color = "blue";
            textNode.nodeValue = "Please place the second bet OVERLAPPING with the first.";
        }
        else
        {
            addBet();
            clearInterval(interval);
            overlay.style.color = "blue";
            textNode.nodeValue = "When you place overlapping bets, the height that is added in the overlapping section is less than it would be if there was \n\
no overlap. Now place the third bet overlapping with the first two bets.";
            interval = setInterval(thirdBetFrame,16);
        }
    }
};

function thirdBetFrame()
{
    
        drawBetsAndProbe();
    if (mouse_clicked == 1)
    {
        mouse_clicked = 0;
        var mouse_angle = Math.floor(getMouseAngle(mousePos.x-mousePos.width/2,mousePos.y-mousePos.height/2));
        if (Math.abs(circdist(mouse_angle,bet_values[0])) > 40 && Math.abs(circdist(mouse_angle,bet_values[1]))>40)
        {
            overlay.style.color = "blue";
            textNode.nodeValue = "Please place the third bet OVERLAPPING with the first two bets.";
        }
        else
        {
            addBet();
            clearInterval(interval);
            overlay.style.color = "blue";
            textNode.nodeValue = "Now place the fourth bet NOT overlapping with any other bets.";
            interval = setInterval(forthBetFrame,16);
        }
    }
};

function forthBetFrame()
{
    
        drawBetsAndProbe();
    if (mouse_clicked == 1)
    {
        mouse_clicked = 0;
        var mouse_angle = Math.floor(getMouseAngle(mousePos.x-mousePos.width/2,mousePos.y-mousePos.height/2));
        if (Math.abs(circdist(mouse_angle,bet_values[0])) < 40 || Math.abs(circdist(mouse_angle,bet_values[1]))<40 || Math.abs(circdist(mouse_angle,bet_values[2]))<40)
        {
            overlay.style.color = "blue";
            textNode.nodeValue = "Please place the forth bet NOT overlapping with the first three bets.";
        }
        else
        {
            addBet();
            clearInterval(interval);
            overlay.style.color = "blue";
            textNode.nodeValue = "When your bet does not overlap, its height is greater than when it does overlap. Now place the remaining four bets wherever you want.";
            interval = setInterval(otherBetFrame,16);
        }
    }
};

function otherBetFrame()
{
    
        drawBetsAndProbe();
    if (mouse_clicked == 1)
    {
        mouse_clicked = 0;
        addBet();
        overlay.style.color = "blue";
        textNode.nodeValue = "";
    }
};

function drawResponseFrame()
{
    drawDelayFrameWithCross();
    
        drawBetsAndProbe();
    if (mouse_clicked == 1)
    {
        mouse_clicked = 0;
        addBet();
    }
};

function drawBetsAndProbe()
{
    
    var mouse_angle = Math.floor(getMouseAngle(mousePos.x-mousePos.width/2,mousePos.y-mousePos.height/2));
    var temp_height = Array(360).fill(0);
    var rgb_colors = colormatrix[mouse_angle];
        var thisColor = [];
        thisColor.push(rgb_colors[0]/255);
        thisColor.push(rgb_colors[1]/255);
        thisColor.push(rgb_colors[2]/255);
        draw(gl.TRIANGLE_FAN,thisColor,circle_vertices[probed_element-1],circleIndices);
        if (answer == 0)
        {
            temp_height = moveGaussian(mouse_angle);
        }
        
                gaussian_vertices = [];
         for (var angle=0; angle <=359; angle=angle+2)
        {
                var this_vertex_x =   ((radius+.25+height_at_angle[angle+3]+temp_height[angle+1])*Math.cos(deg2rad(angle+1)))/widthheight;
                var this_vertex_y = ((radius+.25+height_at_angle[angle+3]+temp_height[angle+1])*Math.sin(deg2rad(angle+1)));
                gaussian_vertices.push(this_vertex_x);
                gaussian_vertices.push(this_vertex_y);
                gaussian_vertices.push(0.0);
                var this_vertex_x2 =   ((radius+.25)*Math.cos(deg2rad(angle+1)))/widthheight;
                var this_vertex_y2 = ((radius+.25)*Math.sin(deg2rad(angle+1)));
                gaussian_vertices.push(this_vertex_x2);
                gaussian_vertices.push(this_vertex_y2);
                gaussian_vertices.push(0.0);
        }
         for (var angle=0; angle <=6; angle=angle+2)
        {
                var this_vertex_x =   ((radius+.25+height_at_angle[angle+1]+temp_height[angle+1])*Math.cos(deg2rad(angle+1)))/widthheight;
                var this_vertex_y = ((radius+.25+height_at_angle[angle+1]+temp_height[angle+1])*Math.sin(deg2rad(angle+1)));
                gaussian_vertices.push(this_vertex_x);
                gaussian_vertices.push(this_vertex_y);
                gaussian_vertices.push(0.0);
                var this_vertex_x2 =   ((radius+.25)*Math.cos(deg2rad(angle+1)))/widthheight;
                var this_vertex_y2 = ((radius+.25)*Math.sin(deg2rad(angle+1)));
                gaussian_vertices.push(this_vertex_x2);
                gaussian_vertices.push(this_vertex_y2);
                gaussian_vertices.push(0.0);
        }
                draw(gl.TRIANGLE_STRIP,[1.0,1.0,1.0],gaussian_vertices,gaussianArcIndices);
            
        drawColorWheel();
        if (answer == 1)
        {
            drawAnswer();
        }
};

function drawDelayFrameWithCross()
{
    
    gl.clearColor(bg_color, bg_color, bg_color, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
drawFixationCross();
};

function drawDelayFrameWithoutCross()
{
    
    gl.clearColor(bg_color, bg_color,bg_color, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
};

function drawFixationCross()
{
    
    draw(gl.LINES,[0.0,0.0,0.0],[-.03/widthheight,0,0,.03/widthheight,0,0],lineIndices);
    
    draw(gl.LINES,[0.0,0.0,0.0],[0,-.03,0,0,.03,0],lineIndices);
};

function drawWaitFrame()
{
gl.clearColor(bg_color, bg_color, bg_color, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

    if (key_press == 3)
    {
        key_press = 0;
        clearInterval(wait_interval);
        if (experiment_end == 1)
        {
            endExperiment();
        }
        else
        {
            IncrementTrial();
        }
    }
    
};

function draw(draw_mode,color,vertices,indices)
{
         // Create an empty buffer object to store vertex buffer
         var vertex_buffer = gl.createBuffer();

         // Bind appropriate array buffer to it
         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
         
         // Pass the vertex data to the buffer
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

         // Unbind the buffer
         gl.bindBuffer(gl.ARRAY_BUFFER, null);

         // Create an empty buffer object to store Index buffer
         var Index_Buffer = gl.createBuffer();

         // Bind appropriate array buffer to it
         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

         // Pass the vertex data to the buffer
         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
         
         // Unbind the buffer
         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

         /*================ Shaders ====================*/
         
         // Vertex shader source code
         var vertCode =
            'attribute vec3 coordinates;' +
				
            'void main(void) {' +
               ' gl_Position = vec4(coordinates, 1.0);' +
            '}';
            
         // Create a vertex shader object
         var vertShader = gl.createShader(gl.VERTEX_SHADER);

         // Attach vertex shader source code
         gl.shaderSource(vertShader, vertCode);

         // Compile the vertex shader
         gl.compileShader(vertShader);

         //fragment shader source code
         var fragCode =
            'void main(void) {' +
               ' gl_FragColor = vec4('+color[0]+','+color[1]+','+color[2]+',1.0);' +
            '}';
            
         // Create fragment shader object
         var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

         // Attach fragment shader source code
         gl.shaderSource(fragShader, fragCode); 
         
         // Compile the fragmentt shader
         gl.compileShader(fragShader);

         // Create a shader program object to store
         // the combined shader program
         var shaderProgram = gl.createProgram();

         // Attach a vertex shader
         gl.attachShader(shaderProgram, vertShader);

         // Attach a fragment shader
         gl.attachShader(shaderProgram, fragShader);

         // Link both the programs
         gl.linkProgram(shaderProgram);

         // Use the combined shader program object
         gl.useProgram(shaderProgram);

         /*======= Associating shaders to buffer objects =======*/

         // Bind vertex buffer object
         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

         // Bind index buffer object
         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
         
         // Get the attribute location
         var coord = gl.getAttribLocation(shaderProgram, "coordinates");

         // Point an attribute to the currently bound VBO
         gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); 
         
         // Enable the attribute
         gl.enableVertexAttribArray(coord);

         /*=========Drawing the triangle===========*/



         // Set the view port

         // Draw the triangle
         gl.drawElements(draw_mode, indices.length, gl.UNSIGNED_SHORT,0);
};

