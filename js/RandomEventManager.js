function RandomEventManager() {
	this.events = [];
	this.currentEvent = null;

	this.getRandomEvent = function (choice) {
		var randomNumber = getRandomInt(0,100);
		var index;
		if(randomNumber <5) {
			index = 0;
		} else if(randomNumber < 10) {
			index = 1;
		} else if(randomNumber < 15) {
			index = 2;
		} else if(randomNumber < 20) {
			index = 3;
		} else if(randomNumber < 40) {
			index = 4;
		} else if(randomNumber < 55) {
			index = 5;
		} else if(randomNumber < 95) {
			index = 6;
		} else {
			index = 7;
		}
		return this.events[index];
	};

	this.getAllRandomEvents = function () {
		eventJson = [];
		$.ajax({
		  url: 'data/randomevents.json',
		  async: false,
		  dataType: 'json',
		  success: function (response) {
		  	eventJson = response;
		  }
		});
		this.events = eventJson;
	};
	// Only do this once.
	this.getAllRandomEvents();
}


function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}