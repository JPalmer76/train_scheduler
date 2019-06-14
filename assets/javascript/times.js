    $(document).ready(function(){
        

    var firebaseConfig = {
        apiKey: "AIzaSyBe_lQAkAU9oOnhcWKULyHtI1lWb5MRXXY",
        authDomain: "thursd-64bb3.firebaseapp.com",
        databaseURL: "https://thursd-64bb3.firebaseio.com",
        projectId: "thursd-64bb3",
        storageBucket: "thursd-64bb3.appspot.com",
        messagingSenderId: "937403905657",
        appId: "1:937403905657:web:49474150907ae768"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      
      var database = firebase.database();
      // 2. Button for adding Trains
      $("#add-train-btn").on("click", function(event) {
        event.preventDefault();
      
        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var firstTrain = $("#first-train-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();
        
        // Creates local "temporary" object for holding train data
        // database.ref().push(newTrain);
        var newTrain = {
          name: trainName,
          destination: trainDestination,
          trainTime: firstTrain,
          frequency: trainFrequency
        };

       


      
        // Uploads train data to the database
        database.ref().push(newTrain); 
      
        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-train-input").val("");
        $("#frequency-input").val("");
      });
        database.ref().on("child_added", function(childSnapshot) {
        // console.log('SNAPSHOT', childSnapshot.val());
      
        // Store everything into a variable.
        var trainNames = childSnapshot.val().name;
        var trainDestinations = childSnapshot.val().destination;
        var firstTrains = childSnapshot.val().trainTime;
        var trainFrequencies = childSnapshot.val().frequency;
      
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var firstTrainConverted = moment(firstTrains, "HH:mm");
      
        console.log(childSnapshot.val().trainTime, "firebase time");
        var diffTime = moment.utc(moment(childSnapshot.val().trainTime, "HH:mm:ss").diff(moment(currentTime, "HH:mm:ss"))).format("mm");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        
        var Remainder = diffTime % childSnapshot.val().frequency;
        console.log(Remainder);

        var minutesTillTrain = childSnapshot.val().frequency - Remainder;
        console.log(minutesTillTrain);

        var nextTrains = moment().add(minutesTillTrain, "m").format("mm");
        console.log(nextTrains);
      
        // Create the new row
        var newRow = $("<tr>").append(
          $("<td>").text(trainNames),
          $("<td>").text(trainDestinations),
          $("<td>").text(trainFrequencies),
          $("<td>").text(firstTrainConverted),
          $("<td>").text(nextTrains)
        );
      
        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
      });








































});