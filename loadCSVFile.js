function loadCSVFile(file){

xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET",file,false);
xmlhttp.send(null);
var fileContent = xmlhttp.responseText;
var rArray=csvToArray(fileContent);
return rArray;
};

function csvToArray (csv) {
    rows  = csv.split("\n");
    return rows.map(function (row) {
    	return row.split(",");
    });
};