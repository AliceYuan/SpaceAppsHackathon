function initMenuActions(){
    hideMenuItems($("#secondary-menu ul li"));
    $(document).click(function(e) {
        var target = e.target;

        if (!$(target).is('#main-menu') && !$(target).parents().is('#main-menu') && !$(target).is('#secondary-menu') && !$(target).parents().is('#secondary-menu')) {
            hideMenuItemsAnimate($("#secondary-menu ul li"));
        }
    });

    $("#main-menu .research").click(function () {
        $("#secondary-menu .research li").animate({opacity:1, marginLeft:'0'}, 1000);
    });
}

function hideMenuItems($item){
    $item.css( {"marginLeft": "-10%" , "opacity":"0"});
}

function hideMenuItemsAnimate($item){
    $item.animate( {"marginLeft": "-10%" , "opacity":"0"});
}


