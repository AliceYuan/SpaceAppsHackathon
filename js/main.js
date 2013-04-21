var player;
var manager;
var randomManager;
var researchManager;
var randomEventCount;
var randomEventChance = 0.05;
var resourceExtractionRate = 100;
var commodityPrice = 100000;
var onGoingCost = 1000000;
var victoryInfrastructureKgs = 10000;

$(document).ready(function() {
    player = new playerinfo();
    updateProgress();
    manager = new GameEventManager();
    randomManager = new RandomEventManager();
    researchManager = new ResearchManager();

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
    buildResourceExtractor: function() {
        buildInfrastructure(resourceExtractor);
    },
    resourcePhase: function () {
        // Should reflect the generation-levels of the extractors.
        var resources = player.infrastructure.resourceextractors * resourceExtractionRate;
        player.resourcevalue.resources += resources;

        // Should reflect the value of commodities.
        var income = player.infrastructure.commodityrefineries * commodityPrice;
        player.resourcevalue.money += income;

        // Presumably it costs money to run a moonbase.
        player.resourcevalue.money -= onGoingCost;

        $("#tool-tip").children(".speech").show().html([
        	'<dl>',
        	'	<dt>Additional <a href=\"http://en.wikipedia.org/wiki/In-situ_resource_utilization\">In-Situ</a> Resources</dt>',
        	'	<dd>', resources, 'kg</dd>',

        	'	<dt>Total In-Situ Resources</dt>',
        	'	<dd>', player.resourcevalue.resources, 'kg</dd>',

        	'	<dt>Commodity Income</dt>',
        	'	<dd>$', showMoney(income), '</dd>',

        	'	<dt>Total Money</dt>',
        	'	<dd>$', showMoney(player.resourcevalue.money), '</dd>',

        	'</dl>'
        ].join(''));        

        console.log('Now have', player.resourcevalue.resources, 'resources and', player.resourcevalue.money, 'money');
    },
    jumpToFutureFailure: function () {
    	gameDate = new Date(2025,8,1);
    	updateProgress();
    },
    restartGame: function () {
	    gameDate = new Date(2017, 11, 1);
	    player = new playerinfo();
    }
};

function showMoney(val) {
	if (val < 1000) {
		return val;
	}
	if (val < 1000000) {
		return Math.round(val / 1000) + "K";
	}
	if (val < 1000000000) {
		return Math.round(val / 1000000) + "M";
	}
	return "lots";
}

function buildInfrastructure (infrastructure) {
    if (player.resourcevalue.money > infrastructure.cost().money && player.resourcevalue.resources > infrastructure.cost().resources) {
        player.resourcevalue.money -= infrastructure.cost().money;
        player.resourcevalue.resources -= infrastructure.cost().resources;
        // Add infrastructure to player.
        // Upgrade all infrastructure types when the printer gets upgraded.
        if (infrastructure.type == 'printers') {
            jQuery.each(allInfrastructure, function(_, inf) {
                inf.upgrade();
            });
        }
        player.addInfrastructure(infrastructure.type, infrastructure.weight);
        console.log("built ", infrastructure.name, player.totalInfrastructure, 'total');
    } else {
        alert("You have insufficient resources.");
    }
}

function runEvent(event) {
    updateProgress();
    manager.currentEvent = event;
    if(event.ID >= 6 && Math.random() < randomEventChance) {
        var randomEvent = randomManager.getRandomEvent();
        updateDisplayForEvent(randomEvent, true);
    } else {
        if(event.ID <= 5) {
            randomEventCount = 0;
        } else {
            randomEventCount = getRandomInt(0,3);
        }
        console.log(randomEventCount + " random events coming up!");
        updateDisplayForEvent(event, false);
    }
}

function updateDisplayForEvent (event, isRandom) {
    if (event.title.toLowerCase().indexOf("phase 1, failure") >= 0) {
        gameDate = new Date(2025,8,1);
        updateProgress();
    }

    if (event.title.toLowerCase().indexOf("failure") >= 0){
        $("#tool-tip img.astronaut").attr("src","img/sad-astronaut.png");
    } else{
        $("#tool-tip img.astronaut").attr("src","img/happy-astronaut.png");
    }

    if (event.tips){
        $("#tool-tip").children(".speech").show().html(event.tips);
    }else{
        $("#tool-tip").children(".speech").hide();
    }

    $("#choice-menu").children(".title").text(event.title);
    $(".choice-description").html(event.description);
    if(isRandom) {
        var index = chooseDescriptionForRandomEvent(event);
        var html = $(".choice-description").html();
        $(".choice-description").html(html + event.variableDescription[index]);
    }
    if (event.callback && eventCallbacks[event.callback]) {
        eventCallbacks[event.callback]();
    }

    if (!isRandom && event.ID == 6) {
        var choices = [],
            next = [],
            res = player.resourcevalue.resources,
            mon = player.resourcevalue.money;

        jQuery.each(allInfrastructure, function(_, inf) {
            if (res > inf.cost().resources && mon > inf.cost().money && inf.prerequisiteCheck()) {
                choices.push([
                    "Build a ",
                    inf.name,
                    " (",
                    inf.cost().resources,
                    " kg resources / $",
                    showMoney(inf.cost().money),
                    ")"
                ].join(''));
                next.push(inf.eventid);
            }
        });

        choices.push("Just Accumulate Resources");
        next.push(6);
        event.choices = choices;
        event.next = next;
    }

    var count = 0;

    $("ol li").each(function() {
        $(this).unbind();
        $(this).show();
        var choice = event.choices[count];
        if(choice) {
            var nextEvent;
            if(isRandom) {
                nextEvent = manager.currentEvent;
            } else {
                nextEvent = manager.getNextEvent(count);
            }
            $(this).children(".text").text(choice);
            $(this).bind('click', {nextEvent:nextEvent, currentEvent:event},function(event){
                var data = event.data;
                if (data.currentEvent.title.toLowerCase().indexOf("failure") >= 0){
                    $('body').fadeOut(1000, function(){
                    runEvent(data.nextEvent);
                    resetProgress();
                    $('body').fadeIn(1000);

                    });
                }
                else{
                runEvent(data.nextEvent);

                }
            });
        } else {
            $(this).hide();
        }
        count ++;
    });
}

var gameDate = new Date(2017, 11, 1),
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function resetProgress(){
    gameDate = new Date(2017, 11, 1);
    player  = new playerinfo();

}

function updateProgress() {
    var sustainableIncome = ((player.infrastructure.commodityrefineries * commodityPrice) / onGoingCost) * 100;
    var infrastructureCompletion = (player.totalInfrastructure / victoryInfrastructureKgs) * 100;

    $(".progressbar.value-resources div").animate({width:(Math.min(100, sustainableIncome) + "%")});
    $(".progressbar.manufacturing-resources div").animate({width:(Math.min(100, player.resourcespercent()) + "%")});
    $(".progressbar.energy div").animate({width:(Math.min(100, infrastructureCompletion) + "%")});

    $('#moneyDisplay').text(showMoney(player.resourcevalue.money));
    $('#dateDisplay').text(months[gameDate.getMonth()] + ' ' + gameDate.getFullYear());
    gameDate.setMonth(gameDate.getMonth() + 1);

    if (sustainableIncome >= 100 && infrastructureCompletion >= 100) {
		alert("The amount of income from commodities, and the amount of infrastructure on the moon means it's now sustainable.  Yay!");	
    }
}

