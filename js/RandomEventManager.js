function RandomEventManager() {
	this.events = [];
	this.currentEvent = null;

	this.getRandomEvent = function (choice) {
		var randomIndex = getRandomInt(0,this.events.length-1);
		return this.events[randomIndex];
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