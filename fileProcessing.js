function ProcessTrialsFile(trial_data_file)
{
    var trial_data = "";
    var trial_update_data = "";
    trial_data = readTextFile(trial_data_file);
 var lines = trial_data.split('\n');
    for(var line = 0; line < lines.length-1; line++){
      var line_elements = lines[line].split(' ');
          var block_trials_list = line_elements[3];
          var these_block_trials = block_trials_list.split(',');
          all_real_trials.push(these_block_trials);
    }
    
trial_update_data = readTextFile("trial_update/" + hitID + "_" + workerID + ".txt");
var trial_updates = trial_update_data.split(' ');
    current_block_num = parseInt(trial_updates[0]);
    trial_in_block = parseInt(trial_updates[1])-1;
    trial_num = (current_block_num-1)*trials_per_block + trial_in_block;
};

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var allText = [];
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
};