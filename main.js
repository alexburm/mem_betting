       "use strict";
var gl;   // The webgl context, to be initialized in init().
var prog;
var t1;
var t0;
var mousePos;
var bet_values = [];
var bet_values_strings = [];
var bg_color = 0.75;
var add_a_bet = 0;
var training = 0;
var mDistributionsHeight = [];
var heights_recorded_for_this_trial = 0;
var total_points = 0;
var num_bets = 0;
var answer = 0;
var response_phase = 0;
var mouse_clicked = 0;
var gaussian_vertices = [];
var height_at_angle = [];
var trial_height_strings = [];
var attached_gaussians_height = [];
var num_trials = 200;
var trials_per_block = 50;
var probed_element = 0;
var trial_data_strings = [];
var widthheight = 0;
var num_wait_frames = 0;
var start_rt=0;
var wait_interval;
var exp;// Identifies the webgl shader program.
var vertexAttributeBuffer;   // Identifies the databuffer where vertex coords are stored.
var vertexAttributeLocation; // Identifies the vertex attribute variable in the shader program.
var colorUniformLocation;    // Identifies the color uniform variable in the shader program.
var encoding_frames;
var timing_recorded_for_this_trial = 0;
var feedback_frames;
var timing_data_strings = [];
var text_frames_start = 0;
var encoding_frames_start = 0;
var delay_frames_start = 0;
var encoding2_frames_start = 0;
var text_frames_time = 0;
var encoding_frames_time = 0;
var delay_frames_time = 0;
var encoding2_frames_time = 0;
var rand_hit = 0;
var rand_worker = 0;
var debug = 0;
var sandbox =0;
var data_recorded_for_this_trial = 0;
var url;
var rt = 0;
var experiment_end = 0;
var delay_frames;
var block_trials;
var real_trial_num;
var change_params_set = 0;
var num_trials;
var delay_interval;
var trial_frames;
var trial_correct = 0;
var radius = .45;
var stim_type = 4;
var color_rows = [];
var colors = [];
var orientations =[];
var locations=[];
var allocated_change = 0;
var feedback_frames_start = 0;
var feedback_frames_time = 0;
var interval;
var change_signal = 0;
var changed_element;
var changed_element_2;
var colormatrix =[];
var set_size = 6;
var encoding = 2000;
var delay = 1000;
var textTime = 1000;
var feedbackTime = 2000;
var text_frames;
var trial_start = 1;
var change_types = [1,2,3,4];
var change_magnitudes = [10,20,40,80,160];
var change_present = [0,1];
var num_repetitions = 10;
var trial_change_types = [];
var trial_change_magnitudes = [];
var trial_change_pres = [];
var trial_num = 0;
var circleIndices = [];
var arcColorWheelIndices = [];
var key_press = 0;
var waiting_for_key = 0;
var textNode;
var overlay;
var arcIndices = [];
var trial_in_block = 0;
var trials_per_block;
var current_block_num = 1;
var trial_list = [];
var arc_vertices = [];
var circle_vertices = [];
var gaussian_vertices = [];
var lineIndices = [];
var arc_color_wheel_vertices = [];
var gaussianArcIndices = [];
var canvas = document.getElementById('glcanvas');
gl = canvas.getContext('experimental-webgl');
init();

$('#glcanvas').click(function(){
    if (response_phase == 1)
    {
        mouse_clicked = 1;
    }
});

function init(){
    document.onmousemove = handleMouseMove;
for (var index=0; index <= 102; index++)
{
    circleIndices.push(index);
}
for (var index=0; index < 20; index++)
{
    arcIndices.push(index);
}
for (var index=0; index < 2; index++)
{
    lineIndices.push(index);
}
for (var index=0; index <= 366; index++)
{
    gaussianArcIndices.push(index);
}
    // look up the elements we want to affect
var elem = document.getElementById('glcanvas');
var textElement = document.getElementById("text");
overlay = document.getElementById("overlay");
// Create text nodes to save some time for the browser.
textNode = document.createTextNode("");
overlay.style.left = (Math.floor(canvas.width/2)-20).toString() + "px";
overlay.style.top = Math.floor(canvas.height/2).toString() + "px";
// Add those text nodes where they need to go
textElement.appendChild(textNode);
if (test == 1)
{
    hitID = getRandomIntInclusive(1,10000);
    workerID = getRandomIntInclusive(1, 10000);
}
    resizeCanvas();
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  
    gl.clearColor(0.5, 0.5, 0.5, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    text_frames = textTime / 1000 * 60;
    encoding_frames = encoding / 1000 * 60;
    delay_frames = delay /1000 *60;
    feedback_frames = feedbackTime / 1000 * 60;
     colormatrix = loadCSVFile("assets/colors/colormatrix.csv",colormatrix);

    waiting_for_key = 1;
      if (preview == 0)
    {
    var trial_data_file = "trials/" + hitID + "_" + workerID + ".txt";
    $.get(trial_data_file)
    .done(function() { 
        
        ProcessTrialsFile(trial_data_file);
        // exists code 
overlay.style.left = (Math.floor(canvas.width/2)-100).toString() + "px";
overlay.style.top = (Math.floor(canvas.height/2)-200).toString() + "px";
    textNode.nodeValue = "Press [ENTER] to resume.\n";
    }).fail(function() { 
        // not exists code
        
overlay.style.left = (Math.floor(canvas.width/2)-600).toString() + "px";
overlay.style.top = (Math.floor(canvas.height/2)-200).toString() + "px";
    textNode.nodeValue = "Please remember the 6 colors presented and where each of them is located.\nThen after the delay, match the correct color with the location given.\n Press [ENTER] to continue.";
    training = 1;
})
    }
        wait_interval = setInterval(drawWaitFrame,16);
};



function endExperiment()
{
    if (test == 1)
    {
        alert("Thank you for participating");
    }
    else
    {
        if (sandbox == 1)
        {
        window.location.href = "https://www.fougnielab.org/online_experiments/submit_turk_results_sandbox.php?aID=" + assignmentID;
        }
        else
        {
        window.location.href = "https://www.fougnielab.org/online_experiments/submit_turk_results.php?aID=" + assignmentID;
        }       
    }
};









