function ResearchManager() {
	this.events = [];
	this.currentEvent = null;

	this.getEventWithID  = function (ID) {
		return this.events[ID];
	};

	this.getAllEvents = function () {
		eventJson = [];
		$.ajax({
		  url: 'data/research.json',
		  async: false,
		  dataType: 'json',
		  success: function (response) {
		  	eventJson = response;
		  }
		});
		this.events = eventJson;
	};
	// Only do this once.
	this.getAllEvents();
	console.log(this.events);
}