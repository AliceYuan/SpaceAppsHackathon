$(document).ready(function() {
	// startIntialStory();
	manager = new GameEventManager()
	event = manager.executeNextEvent();
	while(event != null) {
		draw(event.description);
		window.alert(event.title);
		var y=window.prompt("please choose next")
		event = manager.executeNextEvent(y);
	}
});

function draw(text) {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctx.fillStyle = "orange";
	ctx.fillRect(0,0, canvas.width, canvas.height);
	ctx.font="30px Arial";
	ctx.strokeText(text,10,50);
}