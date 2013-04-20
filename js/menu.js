function initMenuActions(){
    hideMenuItems($("#secondary-menu ul li"));
    $(document).click(function(e) {
        var target = e.target;

        if (!$(target).is('#main-menu') && !$(target).parents().is('#main-menu') && !$(target).is('#secondary-menu') && !$(target).parents().is('#secondary-menu')) {
            hideMenuItemsAnimate($("#secondary-menu ul li"));
        }
    });

    $("#main-menu .research").click(function () {
        hideMenuItems($("#secondary-menu ul li"));
        showMenuItemsAnimate($("#secondary-menu .research li"));
    });
    $("#main-menu .construct").click(function () {
        hideMenuItems($("#secondary-menu ul li"));
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


