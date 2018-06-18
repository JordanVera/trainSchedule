// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAXdu8s6JVzMHn5iU0djLxG7Euzk3OtLHA",
    authDomain: "trainapp-eb715.firebaseapp.com",
    databaseURL: "https://trainapp-eb715.firebaseio.com",
    projectId: "trainapp-eb715",
    storageBucket: "trainapp-eb715.appspot.com",
    messagingSenderId: "870020531435"
  };
  firebase.initializeApp(config);

/* Global Variables
_______________________*/

const trainData = firebase.database();


/* functions f(x)
_____________________*/
document.querySelector('#addTrainButton').addEventListener('click', function(event) {
	
	// Local Variables for 'click' event listener on addTrainButton ID
	const trainName   	= document.querySelector('#trainNameInput').value.trim(),
		  destination 	= document.querySelector('#destinationInput').value.trim(),
		  firstTrain 	= moment(document.querySelector('#firstTrainInput').value.trim(), 'HH:mm').subtract(10, 'years').format('X'),
		  frequency		= document.querySelector('#frequencyInput').value.trim();
	/* Create an object that is made up of user inputs into our <HTML> form,
	this object will be comprised of the varibles created above*/
	let 	  newTrain 		= {
			name: 			trainName,
			destination: 	destination,
			firstTrain: 	firstTrain,
			frequency: 		frequency
	}
	
	// This one line of code will save the newTrain object into our database everytime the button is clicked
	trainData.ref().push(newTrain);
	
	alert('Train Added!');
	
// Log each variable to make sure our JS is working
//	console.log(trainName);
//	console.log(destination);
//	console.log(firstTrain);
//	console.log(frequency);

document.querySelector('#trainNameInput').value = '';
document.querySelector('#destinationInput').value = '';
document.querySelector('#firstTrainInput').value = '';
document.querySelector('#frequencyInput').value = '';
	
	event.preventDefault();
});


trainData.ref().on('child_added', function(snapshot) {
	// Local Variables for 'child_added' event listener on trainList database
	const name 			= snapshot.val().name,
		  destination 	= snapshot.val().destination,
		  frequency 	= snapshot.val().frequency,
		  firstTrain	= snapshot.val().firstTrain;
		  remainder 	= moment().diff(moment.unix(firstTrain),'minutes')%frequency,
		  minutes		= frequency - remainder,
		  arrival 		= moment().add(minutes, 'm').format('hh:mm A');
		  
	$('#javascriptDump').append(`
	<tr>
		<td>${name}</td>
		<td>${destination}</td>
		<td>${frequency}</td>
		<td>${arrival}</td>
		<td>${minutes}</td>
	</tr>
	
	`);
});



