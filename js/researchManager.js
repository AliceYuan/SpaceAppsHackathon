function ResearchManager() {
	this.researchEvents = [];
	this.constructEvents = [];

	this.getEventWithID  = function (ID) {
		return this.events[ID];
	};

	this.getAllEvents = function () {
		researchJson = [];
		constructJson = [];
		$.ajax({
		  url: 'data/research.json',
		  async: false,
		  dataType: 'json',
		  success: function (response) {
		  	researchJson = response.research;
		  	constructJson = response.construct;
		  }
		});
		this.researchEvents = researchJson;
		this.constructEvents = constructJson;
	};
	// Only do this once.
	this.getAllEvents();
}