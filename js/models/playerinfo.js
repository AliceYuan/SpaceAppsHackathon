function playerinfo () {
	this.resourcevalue = new resourcevalue();
	this.resourcemax = new resourcemax();
	this.infrastructure = new infrastructureItems();
	this.research = new research();

	this.resourcespercent = function () {
		return this.resourcevalue.resources / this.resourcemax.resources;
	};
	this.moneypercent = function () {
		return this.resourcevalue.money / this.resourcemax.money;
	};
	this.commoditiespercent = function () {
		return this.resourcevalue.commodities / this.resourcemax.commodities;
	};
}

function resourcevalue () {
	this.resources = 0;
	this.money = 100000000;
	this.commodities = 0;
}

function resourcemax () {
	this.resources = 100;
	this.money = 1000000000;
	this.commodities = 1000;
}
function infrastructureItems () {
	this.rovers = 0;
	this.solarpanels = 0;
	this.printers = 0;
	this.resourceextractors = 2;
	this.waterextractors = 0;
}
function research () {
	printerlevel = 1; 				// 1 to 4
	metalrefinerylevel = 1;			// 1 to 3
	commodityrefinerylevel = 1;		// 1 to 3
}