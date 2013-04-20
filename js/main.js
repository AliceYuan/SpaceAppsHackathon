var player;
var manager;

$(document).ready(function() {
	// startIntialStory();
	player = new playerinfo();
	updateProgress();
	manager = new GameEventManager();
	// console.log(p.healthpercent());

	// event = manager.executeNextEvent();
	// while(event != null) {
	// 	draw(event.description);
	// 	window.alert(event.title);
	// 	var y=window.prompt("please choose next")
	// 	event = manager.executeNextEvent(y);
	// }
	event = manager.getNextEvent();
	runEvent(event);
});

function runEvent(event) {
	manager.currentEvent = event;
	$("#choice-menu").children(".title").text(event.title);
	$(".choice-description").html(event.description);
	var count = 0;
	$("ol li").each(function() {
		$(this).unbind();
		var choice = event.choices[count];	
		if(choice) {
			var nextEvent = manager.getNextEvent(count);
			$(this).children(".text").text(choice);
			$(this).bind('click', {nextEvent:nextEvent},function(event){
			    var data = event.data;
				runEvent(data.nextEvent);
			});
		} else {
			$(this).children(".text").text("");
		}
		count ++; 
	});
}

function updateProgress() {
	var waterPercentage = player.resourcespercent();
	$(".progressbar.water div").width(waterPercentage + "%");

	var moneyPercentage = player.moneypercent();
	$(".progressbar.value-resources div").width(moneyPercentage + "%");

	var heliumPercentage = 30;
	$(".progressbar.manufacturing-resources div").width(heliumPercentage + "%");

    var energyPercentage = 80;
    $(".progressbar.energy div").width(energyPercentage + "%");
}

function draw(text) {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "orange";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.font="30px Arial";
    ctx.strokeText(text,10,50);
}