$(function(){
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyAERNx9OFaENXT69izKD405kyicRE4JcPs",
        authDomain: "testfirebaseproject-feb43.firebaseapp.com",
        databaseURL: "https://testfirebaseproject-feb43.firebaseio.com",
        projectId: "testfirebaseproject-feb43",
        storageBucket: "testfirebaseproject-feb43.appspot.com",
        messagingSenderId: "1049012481959",
        appId: "1:1049012481959:web:a2787d0f138750e4"
      };
        // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var startTime = "";
  var frequency = "";

  $(document).on("click", ".btnAdd",function(){
    trainName = $("#trainName").val().trim();
    destination = $("#trainDes").val().trim();
    startTime = $("#firstTrain").val().trim();
    frequency = $("#freqency").val().trim();

    database.ref().push({
        trainName : trainName,
        destination : destination,
        startTime : startTime,
        frequency : frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

  });

  database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(snapshot.val());
    
    // Handle the errors
    debugger;
    var tblBody = $("#tableBody");
    var tblRow = $("<tr>");
    
    trainName =  $("<th>").text(sv.trainName);
    destination = $("<th>").text(sv.destination);
    startTime = $("<th>").text(sv.startTime);
    frequency = $("<th>").text(sv.frequency);

     
    tblRow.append(trainName,destination,startTime,frequency );
    tblBody.append(tblRow);

  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});