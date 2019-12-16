/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    
    $(document).keydown(function(e){
        if (waiting_for_key == 1)
        {
            if (e.keyCode == 90) { 
               key_press=1;
            }
            else if (e.keyCode == 77) { 
               key_press=2;
            }
            else if (e.keyCode == 13) {
                key_press = 3;
            }
            waiting_for_key = 0;
        }
    
});
    
});

