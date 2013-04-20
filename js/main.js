var player;

$(document).ready(function() {
	// startIntialStory();
	player = new playerinfo();
	updateProgress();
	manager = new GameEventManager();
	event = manager.executeNextEvent();
	while(event != null) {
		draw(event.description);
		window.alert(event.title);
		var y=window.prompt("please choose next")
		event = manager.executeNextEvent(y);
	}
});

function updateProgress() {
	// var waterPercentage = player.resourcepercent.water;
	// var moneyPercentage = player.resourcepercent.money;
	// var heliumPercentage = player.resourcepercent.helium;
	// var energyPercentage = player.resourcepercent.energy;
	var waterPercentage = 50;
	$("#progressbar.water div").width(waterPercentage + "%");

	var moneyPercentage = 60;
	$("#progressbar.money div").width(moneyPercentage + "%");

	var heliumPercentage = 30;
	$("#progressbar.helium div").width(heliumPercentage + "%");

	var energyPercentage = 80;
	$("#progressbar.energy div").width(energyPercentage + "%");
}

function draw(text) {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctx.fillStyle = "orange";
	ctx.fillRect(0,0, canvas.width, canvas.height);
	ctx.font="30px Arial";
	ctx.strokeText(text,10,50);
}