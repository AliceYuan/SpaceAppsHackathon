function GameEventManager() {
	this.events = [];
	this.currentEvent = null;

	this.getNextEvent = function (choice) {
		this.getAllEvents();
		this.turn +=1;
		if(this.currentEvent == null) {
			nextEvent = this.events[0];
		} else {
			nextEvent = this.getEventWithID(this.currentEvent.next[choice])
		}
		return nextEvent;
	};

	this.getEventWithID = function (ID) {
		for (var i = 0; i < this.events.length; i++) {
			var event = this.events[i];
			if(event.ID == ID) {
				return event;
			} 
		}
		return null;
	}

	this.getAllEvents = function () {
		eventJson = [];
		$.ajax({
		  url: 'data/game.json',
		  async: false,
		  dataType: 'json',
		  success: function (response) {
		  	eventJson = response;
		  }
		});
		this.events = eventJson;
	};
}