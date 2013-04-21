function chooseDescriptionForRandomEvent (event) {
	switch(event.ID) {
		case 1:
			if (printer.current() < 3)
			{
				playerinfo.resources = Math.max(playerinfo.resources - 10, 0);
				return 0;
			}
			else
			{
				return 1;
			}
		case 2:
			return 0;
		case 3:
			return 0;
		case 4:
			return 0;
		case 5:
			return 0;
		case 6:
			if (Math.min(printer.current, commodityRefinery.current, metalRefinery.current, resourceExtractor.current) > 1){
				playerinfo.money = Math.max(playerinfo.money - 8, 0);
				return 1;
			}
			else if (printer.current > 3){
				playerinfo.resources = Math.max(playerinfo.resources - 10, 0);
				return 0;
			}
			else{
				playerinfo.resources = Math.max(playerinfo.resources - 10, 0);
				playerinfo.money = Math.max(playerinfo.money - 10, 0);
				pauseProduction = true;;
			}
		case 7:
			return 0;
		case 8:
			return 0;
		default:
			return 0;
	}
}