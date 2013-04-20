function GameEventManager() {
	this.events = [];
	this.currentEvent;

	this.getNextEvent = function (choice) {
		this.getAllEvents();
		this.turn +=1;
		if(this.currentEvent == null) {
			this.currentEvent = this.events[0];
		} else {
			this.currentEvent = this.getEventWithID(this.currentEvent.next[choice])
		}
		return this.currentEvent;
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
		console.log(this.events);
	};

	this.executeNextEvent = function (choice) {
		event = this.getNextEvent(choice);
		console.log(event);
		return event;
	};
}