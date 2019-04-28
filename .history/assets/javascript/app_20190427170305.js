
const config = {
  apiKey: "AIzaSyDN9ZP4apX7vzu0MW2XZskBR8hRfz9tpQg",
  authDomain: "trains-566c2.firebaseapp.com",
  databaseURL: "https://trains-566c2.firebaseio.com",
  projectId: "trains-566c2",
  storageBucket: "trains-566c2.appspot.com",
  messagingSenderId: "625190360747"
};

firebase.initializeApp(config)
const database = firebase.database();
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFirst = $("#first-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

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
});
// this adds all the rows from the database
database.ref().on("child_added", function (snap) {
    console.log(snap.val())
    let trainName = snap.val().name;
    let trainDestination = snap.val().destination;
    let trainFirst = snap.val().first;
    let trainFrequency = snap.val().frequency;
    // convert to current + next
    let minLeft = calcTimeLeft(trainFirst, trainFrequency);
    // add frequency to first
    // convert to next to minutes from now
    let nextTrain = calcNextTrain(minLeft);
    // Create the new row
  let newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(trainDestination),
  $("<td>").text(trainFrequency),
  $("<td>").text(trainFirst),
  $("<td>").text(nextTrain),
  $("<td>").text(minLeft)
  );
  $("#train-table > tbody").append(newRow);
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code)
  }); 
function calcTimeLeft(trainFirst, trainFrequency) {
  let minutesLeft = 0
  let now = moment();  
  console.log("now: "+now);
  let today = moment().format("YYYY-MM-DD")
  console.log("today: "+today);
  // if time portion of now is before the start? count forward
  // if time portion of now is after start? count backwards
  // if moment===moment, time is now, minutes is 0
  // console.log(trainFirst);
  let firstTrainTime = moment(today+' '+trainFirst,"YYYY-MM-DD HH:mm")   // date portion + first 
  let isValidTS = firstTrainTime.isValid()
  console.log("firstTrainTime: " + firstTrainTime + isValidTS)
  // diff between now and firstTrain
  minutesLeft = now.diff(firstTrainTime, "minutes")
  if (minutesLeft<0) {
    // minutesLeft = now.diff(firstTrainTime,"minutes")
    console.log("minutesLeft: " + minutesLeft)
  } else if (minutesLeft>0) {
    // minutesLeft = firstTrainTime.diff(now, "minutes")
    minutesLeft = (minutesLeft % trainFrequency) // 12 of 20 minutes
  // calculate how many cycles and remainer in minutes
  }

  // let firstTrainToUnix=moment.unix(firstTrain)
  // let timeSince = now-firstTrain;
  // let minutesLeft = %(timeSince/frequency)
  // it has been 322 minutes  : frequency of 20 : 2 minutes from now
  // given you know when the first Train was, the current time, and the frequency
  // how long ago was the first time, and how many trips "frequency" have elapsed?
  // how many minutes are left between now and then?
  return minutesLeft
  console.log("minutesLeft: "+minutesLeft)
}
function calcNextTrain(minutesLeft) {
  // given you know current time and minutesLeft, what time will it be then?
  
  //let currTime=moment()
  //let minutesLeft=23;

  let now = moment().add(minutesLeft)
  console.log("now: " + now)
  nextArrival = moment.(now, "YYYY-MM-DD HH:mm")
  return nextArrival
  };
    // 

