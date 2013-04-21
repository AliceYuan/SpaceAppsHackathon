function initMenuActions(){
    hideMenuItems($("#secondary-menu ul li"));

    $(".info-box").hide();
    $(document).click(function(e) {
        var target = e.target;

        if (!$(target).is('#main-menu') && !$(target).parents().is('#main-menu') && !$(target).is('#secondary-menu') && !$(target).parents().is('#secondary-menu')) {
            hideMenuItemsAnimate($("#secondary-menu ul li"));
        }
    });

    var manager = new ResearchManager();
    var research = manager.researchEvents;
    var construct = manager.constructEvents;


    $("#main-menu .research").bind('click', {research:research},function(event){
        var data = event.data;
        // var research = data.research;
        hideMenuItems($("#secondary-menu ul li"));
        if ($("#secondary-menu .research li").length === 0){
            for (var item in data.research){
                research_item = data.research[item];
                $('#secondary-menu ul.research').append("<li class='"+research_item.ID+"'> <img src='"+ research_item.img+"'/> </li>");

            }

        }
        $("#secondary-menu .research li").hover(
            function () {
                $(".info-box").show();
                var n = $(this).index();
                research_item = data.research[n];
                $(".info-box").children(".title").text(research_item.title);
                $(".info-box").children(".description").text(research_item.description);
                $(".info-box").children(".cost").text("cost: $"+Math.abs(research_item.cost.money));
                $(".info-box").children(".benefits").text(research_item.benefits);
            },
            function () {
                $(".info-box").hide();
            }
            );
        $("#secondary-menu .research li").click( function(){
            if (!$(this).hasClass("disable")){
                console.log(player);
                n = $(this).index();
                research_item = data.research[n];

                money = research_item.cost.money;
                player.resourcevalue.money += money;

                value_resources = research_item.cost.value_resources;
                player.resourcevalue.resources += value_resources;

                // infrastructure = research_item.cost.infrastructure;
                // player.addInfrastructure(infrastructure.type, infrastructure.weight);

                updateProgress();
            }
            $(this).addClass("disable");
        });

        showMenuItemsAnimate($("#secondary-menu .research li"));
    });
$("#main-menu .construct").bind('click', {construct:construct},function(event){
    hideMenuItems($("#secondary-menu ul li"));
    var data = event.data;

    if ($("#secondary-menu .construct li").length === 0){
        for (var item in data.construct){
            construct_item = data.construct[item];
            console.log(construct_item);
            $('#secondary-menu ul.construct').append("<li class='"+construct_item.ID+"'> <img src='"+ construct_item.img+"'/> </li>");

        }

    }
    $("#secondary-menu .construct li").hover(
        function () {
            $(".info-box").show();
            var n = $(this).index();
            construct_item = data.construct[n];
            $(".info-box").children(".title").text(construct_item.title);
            $(".info-box").children(".description").text(construct_item.description);
            $(".info-box").children(".cost").text("cost: $"+Math.abs(construct_item.cost.money));
            $(".info-box").children(".benefits").text(construct_item.benefits);
        },
        function () {
            $(".info-box").hide();
        }
        );
    $("#secondary-menu .construct li").click( function(){
            console.log(player);
            n = $(this).index();
            research_item = data.construct[n];

            money = research_item.cost.money;
            player.resourcevalue.money += money;

            value_resources = research_item.cost.value_resources;
            player.resourcevalue.resources += value_resources;

            // infrastructure = research_item.cost.infrastructure;
            // player.addInfrastructure(infrastructure.type, infrastructure.weight);

            updateProgress();
    });

showMenuItemsAnimate($("#secondary-menu .construct li"));
});
}

function hideMenuItems($item){
    $item.css( {"marginLeft": "-10%" , "opacity":"0"});
}

function hideMenuItemsAnimate($item){
    $item.animate( {"marginLeft": "-10%" , "opacity":"0"});
}

function showMenuItemsAnimate($item){
    $item.animate( {marginLeft:'0px', "opacity":"1"}, 1000);
}


