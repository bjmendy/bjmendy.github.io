//javascript start//
console.log("Pokemon!");

alert('Click the timer to begin! You will have 60 seconds to win!');

//variables//
var score = 0
var dataOutSideOfAjax = ''
//put the answer in the div 'pokemon'//
var answerPokemon = {
	name: '',
	id: '',
};

//random number variable and function//

function Number (min, max){
	return Math.floor(Math.random() * (max - min) + min);
}

//ajax call//
$.ajax({
	url: 'https://pokeapi.co/api/v2/pokemon/',
	type: "get",
	dataType: 'json',
	success: function (data){
		dataOutSideOfAjax = data
		
		console.log(data)
		var randNum = Number(0, 20)
		console.log(data.results[randNum].name)
		// the object answerpokemon's property 'name' equals the name of the pokemon
		//. I'm storing this because I need to store the answer
		console.log(typeof answerPokemon)
		answerPokemon.name = data.results[randNum].name
		//I need to store the Id # of the pokemon to show the image of the pokemon
		//. First I need to call the image using the id, which is stored in the 
		// the image location is stored in the answerpokemon.id
		answerPokemon.id = randNum + 1
		$('#pokemon').css('background-image', "url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + answerPokemon.id + ".png)")

	
	},
		fail: function(error){
		console.log(error)

	}
})


// 1. attach an event listener to the go button, check by console.log inside the event listener
// 2. grab the 'value' from the answer input, use jquery its easier
// 3. compare the value from answer input to answerPokemon.name
// if /else if leave a message, by appending something, else, 
// check the score by console.log or just go into the console and type score



$('#go').click(function(){
	console.log("working", $('#answer').val())
	var answerValue = $('#answer').val()
	if (answerValue === answerPokemon.name){ //grab the value and compare it//
		console.log(score + 1);
		score++
		$( "#score" ).html(score)
		var randNum = Number(0, 20)
		answerPokemon.name = dataOutSideOfAjax.results[randNum].name
		answerPokemon.id = randNum + 1
		$('#pokemon').css('background-image', "url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + answerPokemon.id + ".png)")
	}
	else { 
		var randNum = Number(0, 20)
		answerPokemon.name = dataOutSideOfAjax.results[randNum].name
		answerPokemon.id = randNum + 1
		$('#pokemon').css('background-image', "url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + answerPokemon.id + ".png)")
	}
})



// write an even listeneer for the timer
// append the time to clock just like the score

$('#time').on('click', function(event){
	console.log(event);
	console.log("the timer will start");
	var time = 60;
	
	var clock = setInterval(clock, 1000);

	function clock (){
		
		time = time -1 
		$("#clock").html(time)
		if (time === 0){
			console.log("time is up");
			alert("Game over!");
			clearInterval(clock)
			$("#clock").html(60)
		}
		
	}
	

})
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
    //append the score when the button is clicked to show the highest score//
    $('.highScore').append(score);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}