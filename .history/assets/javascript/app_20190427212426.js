
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
  var minutesLeft = 0;
    let trainName = snap.val().name;
    let trainDestination = snap.val().destination;
    let trainFirst = snap.val().first;
    let trainFrequency = snap.val().frequency;
    // convert to current + next
   minutesLeft = calcTimeLeft(trainFirst, trainFrequency);
    // add frequency to first
    // convert to next to minutes from now
  let nextTrain = calcNextTrain(minutesLeft);
    // Create the new row
  let newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(trainDestination),
  $("<td>").text(trainFrequency),
  $("<td>").text(trainFirst),
  $("<td>").text(nextTrain),
    $("<td>").text(minutesLeft)
  );
  $("#train-table > tbody").append(newRow);
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code)
  }); 
function calcTimeLeft(trainFirst, trainFrequency) {
  var minutesLeft = 0
  let now = moment();  
  console.log("now: "+now)

  let today = moment().format("YYYY-MM-DD");
  console.log("now date: " + today);
  // if time portion of now is before the start? count forward
  // if time portion of now is after start? count backwards
  // if moment===moment, time is now, minutes is 0
  // console.log(trainFirst);
  let firstTrainTime = moment(today+' '+trainFirst,"YYYY-MM-DD HH:mm")   // date portion + first 
  let trainFormat = firstTrainTime.format("YYYY-MM-DD HH:mm")
  console.log("firstTrainTime: " + firstTrainTime+' '+trainFormat)
  let firstTrainTS=moment(firstTrainTime);
  console.log(now-firstTrainTS)

  // diff between now and firstTrain
  minutesLeft = now.diff(firstTrainTime, "minutes")
  console.log("Diff @74 minutes: " + minutesLeft)
  console.log(typeof minutesLeft)
  var myMin = minutesLeft
  console.log("minutesLeft: " + minutesLeft)
  console.log(typeof minutesLeft)

   if (minutesLeft>0) {
    // minutesLeft = firstTrainTime.diff(now, "minutes")
     console.log("minutesLeft; " + minutesLeft)
    let trainFreqNum = parseInt(trainFrequency)
    console.log("TrainFreqNum: " + trainFreqNum)
     let remainder = minutesLeft % trainFreqNum // 12 of 20 minutes
    console.log(typeof remainder)
    minutesLeft = trainFreqNum - remainder

  // calculate how many cycles and remainer in minutes
  }

  // let firstTrainToUnix=moment.unix(firstTrain)
  // let timeSince = now-firstTrain;
  // let minutesLeft = %(timeSince/frequency)
  // it has been 322 minutes  : frequency of 20 : 2 minutes from now
  // given you know when the first Train was, the current time, and the frequency
  // how long ago was the first time, and how many trips "frequency" have elapsed?
  // how many minutes are left between now and then?
  console.log("minutesLeft @104: " + minutesLeft)

  return minutesLeft

}
function calcNextTrain(minutesLeft) {
  // given you know current time and minutesLeft, what time will it be then?
  
  //let currTime=moment()
  //let minutesLeft=23;

  let now = moment().add(minutesLeft,'minutes')
  console.log("minutesLeft: " + minutesLeft + " now: " +now)
  let nextArrival = now.format("ddd h:mmA")
  return nextArrival
  };
    // 

