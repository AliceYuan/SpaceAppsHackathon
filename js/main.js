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

    initMenuActions();
});

var eventCallbacks = {
	build3dPrinter: function () {
		buildInfrastructure(printer);
	},
	buildMetalRefinery: function () {
		buildInfrastructure(metalRefinery);
	},
	buildCommodityRefinery: function () {
		buildInfrastructure(commodityRefinery);
	},
	resourcePhase: function () {
		// Should reflect the generation-levels of the extractors.
		player.resourcevalue.resources += player.infrastructure.resourceextractors * 100;
		// Should reflect the value of commodities.
		player.resourcevalue.money += player.infrastructure.waterextractors * 1000000;

		console.log('Now have', player.resourcevalue.resources, 'resources and', player.resourcevalue.money, 'money');
	}
}

function buildInfrastructure (infrastructure) {
	if (player.resourcevalue.money > infrastructure.cost().money
		&& player.resourcevalue.resources > infrastructure.cost().resources) {
		player.resourcevalue.money -= infrastructure.cost().money;
		player.resourcevalue.resources -= infrastructure.cost().resources;
		// Add infrastructure to player.
		infrastructure.upgrade();
		console.log("built ", infrastructure.name)
	} else {
		alert("You have insufficient resources.")
	}
}

function runEvent(event) {
	manager.currentEvent = event;
	$("#choice-menu").children(".title").text(event.title);
	$(".choice-description").html(event.description);
	var count = 0;

	if (event.callback && eventCallbacks[event.callback]) {
		eventCallbacks[event.callback]()
	}

	$("ol li").each(function() {
		$(this).unbind();
		$(this).show();
		var choice = event.choices[count];	
		if(choice) {
			var nextEvent = manager.getNextEvent(count);
			$(this).children(".text").text(choice);
			$(this).bind('click', {nextEvent:nextEvent},function(event){
			    var data = event.data;
				runEvent(data.nextEvent);
			});
		} else {
			$(this).hide();
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