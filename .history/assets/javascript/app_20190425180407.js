
var config = {
  apiKey: "AIzaSyA_8FNRBqKrIrPYlgIl4lmDyBDEuvmq6ZI",
  authDomain: "train-sched-1fa6c.firebaseapp.com",
  databaseURL: "https://train-sched-1fa6c.firebaseio.com",
  projectId: "train-sched-1fa6c",
  storageBucket: "train-sched-1fa6c.appspot.com",
  messagingSenderId: "389877377811"
};
firebase.initializeApp(config);
var database=firebase.database();
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName=$("#train-name-input").val().trim();
  var trainDestination=$("#destination-input").val().trim();
  var trainFirst=$("#first-input").val().trim();
  var trainFrequency=$("#frequency-input").val();trim();

  var newTrain = {
      name: trainName,
      destination: trainDestination,
      first: trainFirst,
      frequency: trainFrequency
      };
  database.ref().push(newTrain);
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
  // Assumptions

  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val())
    //convert to current + next
    var firstTime = "ArrivesNext";
    // convert to next to minutes from now
    var nextTrain = "in x minutes";
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequencyrequency),
      $("<td>").text(firstTime),
      $("<td>").text(nextTrain),
    );
    $("#train-table > tbody").append(newRow);
  }); 
})
