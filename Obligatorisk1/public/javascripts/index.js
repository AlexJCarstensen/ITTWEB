function addRow(){
    var table = document.getElementById("newWorkoutTable");
    var rowNumber = table.rows.length;
    var row = table.insertRow(rowNumber);

    for(i = 0; i < 4; i++)
    {
        var input = document.createElement("input");
        var cell = row.insertCell(i);
        cell.appendChild(input);
    }
   
};