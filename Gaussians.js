function getGaussian(mean, standardDeviation, maxHeight,x) {
    return maxHeight * Math.pow(Math.E, -Math.pow(x - mean, 2) / (2 * (standardDeviation * standardDeviation)));
};

function attachGaussian(angle,heights)
{
    var left_side = Math.floor(angle) - 50;
    if (left_side < 0){
        left_side = 360 - Math.abs(left_side);
    }
    for (var a = 1; a <= 50; a++)
    {
        var temp_angle = left_side + a;
        if (temp_angle > 360){
            temp_angle = temp_angle - 360;
        }
        if (heights[temp_angle]>.01)
        {
            heights[temp_angle] = heights[temp_angle] + .5*getGaussian(50,8,.1,a);
        }
        else
        {
            heights[temp_angle] = getGaussian(50,8,.1,a);
        }
        if (heights[temp_angle] < .01)
        {
            heights[temp_angle] = 0;
        }
    }
    for (var b=1; b <= 50; b++)
    {
        var temp_angle = Math.floor(angle) + b;
        if (temp_angle>360){
            temp_angle = temp_angle - 360;
        }
        
        if (temp_angle < 0){
            temp_angle = 360 - Math.abs(temp_angle);
        }
        if (heights[temp_angle]>.01)
        {
            heights[temp_angle] = heights[temp_angle] + .5*getGaussian(50,8,.1,(b+50-1));
        }
        else
        {
            heights[temp_angle] = getGaussian(50,8,.1,(b+50-1));
        }
        if (heights[temp_angle] < .01)
        {
            heights[temp_angle] = 0;
        }
    }
    return heights;
};

function moveGaussian(angle)
{
    var heights = Array(360).fill(0);
    var left_side = Math.floor(angle) - 50;
    if (left_side <= 0){
        left_side = 360 - Math.abs(left_side);
    }
    for (var a = 1; a <= 50; a++)
    {
        var temp_angle = left_side + a;
        if (temp_angle >= 360){
            temp_angle = temp_angle - 360;
        }
        if (heights[temp_angle]>.01)
        {
            heights[temp_angle] = heights[temp_angle] + .5*getGaussian(50,8,.1,a);
        }
        else
        {
            heights[temp_angle] = getGaussian(50,8,.1,a);
        }
    }
    for (var b=1; b <= 50; b++)
    {
        var temp_angle = Math.floor(angle) + b;
        if (temp_angle>=360){
            temp_angle = temp_angle - 360;
        }
        if (temp_angle < 0){
            temp_angle = 360 - Math.abs(temp_angle);
        }
        if (heights[temp_angle]>.01)
        {
            heights[temp_angle] = heights[temp_angle] + .5*getGaussian(50,8,.1,(b+50-1));
        }
        else
        {
            heights[temp_angle] = getGaussian(50,8,.1,(b+50-1));
        }
        if (heights[temp_angle] < .01)
        {
            heights[temp_angle] = 0;
        }
    }
    return heights;
};