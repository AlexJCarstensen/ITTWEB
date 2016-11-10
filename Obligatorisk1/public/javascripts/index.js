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

$(document).ready(function(){
    $('#clickme').click(function(){
         console.log("hej");
    var table = document.getElementById("newWorkoutTable");
     var rows = table.rows.length;
     
     var workout = new Object();
     workout.exercises = [];
        for (var r = 1; r < rows; r++) { 
         var exercise = new Object();
         console.log("hej");
                     
          exercise.name = table.rows[r].cells[0].children[0].value;
          console.log(table.rows[r].cells[0].children[0].value)
          exercise.Description = table.rows[r].cells[1].children[0].value;
          exercise.Sets = table.rows[r].cells[2].children[0].value;
          exercise.Repetitions = table.rows[r].cells[3].children[0].value;
          workout.exercises.push(exercise);
          console.log(workout.exercises)
        }
     

       $.ajax({
						type: 'POST',
						data: JSON.stringify(workout),
				        contentType: 'application/json',
                        url: 'http://localhost:3000/add',						
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
       });
      
});
});


