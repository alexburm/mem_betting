function endTrial()
{
    clearInterval(delay_interval);
    t1=performance.now();
            feedback_frames_time = Math.floor(t1-t0);
            var element_colors = [];
            for (var element=0; element < set_size; element++)
            {
                element_colors.push(color_rows[element]);
            }
            var height_stored = [];
            for (var height=0; height<360;height++)
            {
                height_stored.push(Math.floor(height_at_angle[height]*1000));
            }
           trial_data_strings[trial_num] = trial_num + " " + current_block_num + " " + trial_in_block + " " + real_trial_num + " " + color_rows[probed_element-1] + " " + 
                   Math.floor(height_at_angle[color_rows[probed_element-1]]*1000) + " " + element_colors;
           trial_height_strings[trial_num] = JSON.stringify(height_stored);
           bet_values_strings[trial_num] = bet_values;
           if (this.preview == 0)
              {
                  if (typeof hitID !== 'undefined' && data_recorded_for_this_trial == 0)
                  {
                     
                    $.get("https://www.fougnielab.org/online_experiments/betting_game_default/save_to_txt_file.php",{hitID:hitID, workerID:workerID, data: trial_data_strings[trial_num]});
                                      data_recorded_for_this_trial = 1;
                  }
              }
              if (this.preview == 0)
              {
                  if (timing_recorded_for_this_trial == 0)
                  {
                  timing_data_strings[trial_num] = moment().format() + " " + trial_num + " " + current_block_num + " " + trial_in_block + " " + real_trial_num + " " + text_frames_time + " " + encoding_frames_time + " " + delay_frames_time + " " + encoding2_frames_time + " " + rt + " " + feedback_frames_time;
                  $.get("https://www.fougnielab.org/online_experiments/betting_game_default/save_timing_to_txt_file.php",{hitID:hitID, workerID:workerID, data: timing_data_strings[trial_num]});
                  timing_recorded_for_this_trial = 1;
                    }
                    if (heights_recorded_for_this_trial == 0)
                    {
                            $.get("https://www.fougnielab.org/online_experiments/betting_game_default/save_heights_to_txt_file.php",{hitID:hitID, workerID:workerID, data: trial_height_strings[trial_num]});
                            heights_recorded_for_this_trial = 1;
               
                    }
              }
   IncrementTrial();
};

function PrepareBlockTrials()
{
    block_trials = [];
    for (var block_trial=1; block_trial <= trials_per_block; block_trial++)
    {
        var this_trial_num = ((current_block_num-1)*trials_per_block) + block_trial;

        block_trials.push(this_trial_num);
    }
    shuffle(block_trials);
};

function RunTrial()
{
        allocated_change = 0;
        colors = [];
        color_rows = [];
        orientations = [];
        locations = [];
        bet_values = [];
        //change detection or localization
        probed_element = getRandomIntInclusive(1, set_size);
        for (var element=0; element < set_size; element++)
        {
            var location;

            var rand_color = Math.random() * 360;
            color_rows.push(Math.floor(rand_color));
            location = Math.floor((360/set_size) * element)+((360/set_size)/2);
            locations.push(location*(Math.PI/180));

        }   
        
        for (var element=0; element< set_size; element++)
        {
        circle_vertices.push(makeCircleVertices(Math.sin(locations[element])*radius,Math.cos(locations[element])*radius, 0.1, 100));
        }
        
        createArcVerticesForAllElements();
        if (text_frames_start == 0)
        {
            t0 = performance.now();
            text_frames_start = 1;
        }
        overlay.style.left = (Math.floor(canvas.width/2)-200).toString() + "px";
        overlay.style.top = Math.floor(canvas.height/2).toString() + "px";
        overlay.style.color = "blue";
        if (preview == 1)
        {
            textNode.nodeValue = "TRIAL: " + trial_in_block + " OF 10";
        }
        else
        {
            textNode.nodeValue = "TRIAL: " + trial_in_block + " OF " + trials_per_block + " BLOCK: " + current_block_num + " OF " + num_repetitions;
        }
        if (debug == 1)
        {
            textNode.nodeValue = "TRIAL_IN_BLOCK: " + trial_in_block + " TRIAL_NUM: " + trial_num + " PROBED ELEMENT " + probed_element;
        }    
        drawDelayFrameWithoutCross();
        interval = setInterval(drawEncodingFrame1,1000);
        
};

function IncrementTrial()
{
    response_phase = 0;
    start_rt=0;
    num_bets = 0;
    answer = 0;
data_recorded_for_this_trial = 0;
timing_recorded_for_this_trial = 0;
heights_recorded_for_this_trial = 0;
height_at_angle = Array(360).fill(0);
attached_gaussians_height = Array(360).fill(0);
       if (preview == 1 && trial_num == 10)
        {
                overlay.style.color = "blue";
                textNode.nodeValue = "End of Experiment Preview. Press [ENTER to exit]";
                experiment_end = 1;
                waiting_for_key = 1;
                wait_interval = setInterval(drawWaitFrame,16);
        }
        else
        {
            if (trial_num > num_trials)
            {
                alert("Thank you for participating.");
            }
            else if (trial_num == num_trials)
            {
                //end experiment
                overlay.style.color = "blue";
                textNode.nodeValue = "End of Experiment. Press [ENTER to exit]";
                waiting_for_key = 1;
                experiment_end = 1;
                wait_interval = setInterval(drawWaitFrame,16);
            }
            else if (trial_in_block == trials_per_block)
            {
                overlay.style.color = "blue";
                textNode.nodeValue = "End of Block Number " + current_block_num + " of " + num_repetitions + ". Press [ENTER] to continue.";
                PrepareBlockTrials();
                current_block_num = current_block_num+1;
                waiting_for_key = 1;
                trial_in_block = 0;
                wait_interval = setInterval(drawWaitFrame,16);
            }
            else
            {
                trial_num=trial_num+1;
                real_trial_num=trial_num;
                trial_in_block=trial_in_block+1;
                 if (preview == 0)
                {
                $.get("https://www.fougnielab.org/online_experiments/betting_game_default/save_trial_update.php",{hitID:hitID, workerID:workerID, data: current_block_num + " " + trial_in_block});
                }
                RunTrial();
            }
        }
};