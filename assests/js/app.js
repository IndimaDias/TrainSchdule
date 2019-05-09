$(function(){
// Your web app's Firebase configuration

var firebaseConfig = {
  apiKey: "AIzaSyBxCExKHzstENGY32_qYBadJzNh9KOPDaA",
  authDomain: "train-shedule-22334.firebaseapp.com",
  databaseURL: "https://train-shedule-22334.firebaseio.com",
  projectId: "train-shedule-22334",
  storageBucket: "train-shedule-22334.appspot.com",
  messagingSenderId: "644413015328",
  appId: "1:644413015328:web:2b9622b6655ba52a"
};
        // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var startTime = "";
  var frequency = "";

  // ................................................................................................................
  
  $(document).on("click", "#btnAdd",function(event){

    // function at on click for submit button 
    event.preventDefault(); // prevent default submit action

    // read form inputs
    trainName = $("#trainName").val().trim();
    destination = $("#trainDes").val().trim();
    startTime = moment($("#firstTrain").val().trim(),"HH:mm").format("HH:mm"); //save time in the format
    frequency = $("#freqency").val().trim();

    // Add record to the database 
    database.ref().push({
        trainName : trainName,
        destination : destination,
        startTime : startTime,
        frequency : frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });

  //.................................................................................................................
  //This event would be fired when a new record is added to the database

  database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // creating table body and table row
    var tblBody = $("#tableBody");
    var tblRow = $("<tr>");

    // get next train arrival time and no of minutes for the next train 
    var nextTrainTime = nextArrivalTime(sv.startTime,sv.frequency);
    var minutesToNext = minutesAway(nextTrainTime);

    // assign record to the table 
    trainName =  $("<th>").text(sv.trainName);
    destination = $("<th>").text(sv.destination);
    frequency = $("<th>").text(sv.frequency);
    nextTime = $("<th>").text(nextTrainTime);
    minutesTo = $("<th>").text(minutesToNext);

    // add fileds to the row and then the row to the table
    tblRow.append(trainName,destination,frequency,nextTime,minutesTo );
    tblBody.append(tblRow);

  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

//...................................................................................................................
  function nextArrivalTime(firstTrainTime, pFrequency){

    //read current time in 24 hour clock
    var currentTime =moment().format("HH:mm");

    // convert first train time to moment object
    var newTime = moment(firstTrainTime,"HH:mm");

    // check difference between current time and train start time 
    var diffTime = moment().diff(moment(newTime), "minutes");

    // get the remainder after dividing the difference of the current time and the first train time  
    var timeRemain = diffTime % pFrequency;
    // number of minutes for the next train
    var timeTillNextTrain = pFrequency - timeRemain;

    //add timetill next train to the current time to get the next train time 
    var nextTrain = moment().add(timeTillNextTrain, 'minutes');
	  nextTrain = moment(nextTrain).format('HH:mm');

    return nextTrain;

  }

//....................................................................................................................  
  function minutesAway (pTrainTime){

    var nextTrainTime = moment(pTrainTime,"HH:mm");
    var diffTime = moment(nextTrainTime).diff(moment(), "minutes");
    // return moment.minute(diffTime);
    return diffTime;

  }

});