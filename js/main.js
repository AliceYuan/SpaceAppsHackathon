var player;
var manager;
var randomManager;
var randomEventCount;

$(document).ready(function() {
    player = new playerinfo();
    updateProgress();
    manager = new GameEventManager();
    randomManager = new RandomEventManager();

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
        player.resourcevalue.resources += player.infrastructure.resourceextractors * 100;
        // Should reflect the value of commodities.
        player.resourcevalue.money += player.infrastructure.waterextractors * 1000000;
        // Presumably it costs money to run a moonbase.
        player.resourcevalue.money -= 1000000;

        console.log('Now have', player.resourcevalue.resources, 'resources and', player.resourcevalue.money, 'money');
    }
};

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

    if(randomEventCount > 0) {
        var randomEvent = randomManager.getRandomEvent();
        updateDisplayForEvent(randomEvent, true);
        randomEventCount -=1;
    } else {
        randomEventCount = getRandomInt(0,3);
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
        resetProgress();
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

var gameDate = new Date(2017, 11, 1),
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function resetProgress(){
    gameDate = new Date(2017, 11, 1);
    player = new playerinfo();
}

function updateProgress() {
    var waterPercentage = player.resourcespercent();
    $(".progressbar.water div").width(waterPercentage + "%");

    var moneyPercentage = player.moneypercent();
    $(".progressbar.value-resources div").width(moneyPercentage + "%");

    $(".progressbar.manufacturing-resources div").css('width', Math.min(100, player.resourcespercent()) + "%");

    var infrastructureCompletion = player.totalInfrastructure / 100;
    $(".progressbar.energy div").width(Math.min(100, infrastructureCompletion) + "%");

    $('#moneyDisplay').text(player.resourcevalue.money);
    $('#dateDisplay').text(months[gameDate.getMonth()] + ' ' + gameDate.getFullYear());
    gameDate.setMonth(gameDate.getMonth() + 1);
}

