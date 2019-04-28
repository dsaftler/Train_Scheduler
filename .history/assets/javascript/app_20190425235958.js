
const config = {
  apiKey: "AIzaSyDN9ZP4apX7vzu0MW2XZskBR8hRfz9tpQg",
  authDomain: "trains-566c2.firebaseapp.com",
  databaseURL: "https://trains-566c2.firebaseio.com",
  projectId: "trains-566c2",
  storageBucket: "trains-566c2.appspot.com",
  messagingSenderId: "625190360747"
}
  // apiKey: "AIzaSyAHuSX3WfG-Tc2ZVrHJHJaYoTyGH-akUuc",
  // authDomain: "bootcamp7-cf117.firebaseapp.com",
  // databaseURL: "https://bootcamp7-cf117.firebaseio.com",
  // projectId: "bootcamp7-cf117",
  // storageBucket: "bootcamp7-cf117.appspot.com",
  // messagingSenderId: "178428359597"

firebase.initializeApp(config)
const database = firebase.database();
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  let trainName = $("#train-name-input").val().trim();
  let trainDestination = $("#destination-input").val().trim();
  let trainFirst = $("#first-input").val().trim();
  let trainFrequency = $("#frequency-input").val().trim();

  let newTrain = {
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


  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val())
    // convert to current + next
    let firstTime = "ArrivesNext";
    // convert to next to minutes from now
    let nextTrain = "in x minutes";
    // Create the new row
    let newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(firstTime),
      $("<td>").text(nextTrain)
    );
    $("#train-table > tbody").append(newRow);
  }); 
})
