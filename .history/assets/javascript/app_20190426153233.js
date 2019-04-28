
const config = {
  apiKey: "AIzaSyDN9ZP4apX7vzu0MW2XZskBR8hRfz9tpQg",
  authDomain: "trains-566c2.firebaseapp.com",
  databaseURL: "https://trains-566c2.firebaseio.com",
  projectId: "trains-566c2",
  storageBucket: "trains-566c2.appspot.com",
  messagingSenderId: "625190360747"
};
  // apiKey: "AIzaSyAHuSX3WfG-Tc2ZVrHJHJaYoTyGH-akUuc",
  // authDomain: "bootcamp7-cf117.firebaseapp.com",
  // databaseURL: "https://bootcamp7-cf117.firebaseio.com",
  // projectId: "bootcamp7-cf117",
  // storageBucket: "bootcamp7-cf117.appspot.com",
  // messagingSenderId: "178428359597"

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
    let minLeft = calcTimeLeft(trainFirst);
    // add frequency to first
    // convert to next to minutes from now
    let nextTrain = calcNextTrain(minLeft);
    // Create the new row
  let newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(trainDestination),
  $("<td>").text(trainFrequency),
  $("<td>").text(firstTime),
  $("<td>").text(nextTrain)
  );
  $("#train-table > tbody").append(newRow);
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code); 
    function calcTimeLeft(trainFirst){
      let minutesLeft = 0
      let now = moment();  
      let today = moment().format('YYYYMMDD')
      // if time portion of now is before the start? count forward
      // if time portion of now is after start? count backwards
      // if moment===moment, time is now, minutes is 0
      let firstTrain=today+' '+trainFirst   // date portion + first Time
      if (now.isBefore(moment(firstTrain))){
          //diff between now and firstTrain
        minutesLeft = now.diff(firstTrain,'minutes')
      }else if (now.isAfter(moment(firstTrain))){
        minutesLeft = firstTrain.diff(now, 'minutes')
        minutesLeft = (minutesLeft % 60)
          // calculate how many cycles and remainer in minutes
      };

       
      // let firstTrainToUnix=moment.unix(firstTrain)
      // let timeSince = now-firstTrain;
      // let minutesLeft = %(timeSince/60)
    // given you know when the first Train was, the current time, and the frequency
    // how long ago was the first time, and how many trips "frequency" have elapsed?
    // how many minutes are left between now and then?
      return minutesLeft
  };
    function calcNextTrain(minutesLeft)
    // given you know current time and minutesLeft, what time will it be then?
    // if the remaining time pushes you past midnight, add 1 to the day
    let now=moment()
    
    return moment.duration().add(minutesLeft)
    // 
});
