function playerinfo () {
	this.resourcevalue = new resourcevalue();
	this.resourcemax = new resourcemax();
	this.infrastructure = new infrastructure();

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
	this.money = 0;
	this.commodities = 0;
}

function resourcemax () {
	this.resources = 100;
	this.money = 10000;
	this.commodities = 1000;
}
function infrastructure () {
	this.rovers = 0;
	this.solarpanels = 0;
	this.printers = 0;
	this.resourceextractors = 0;
	this.waterextractors = 0;
}
function research () {
	printerlevel = 1;
	metalrefinerylevel = 1;
	commodityrefinerylevel = 1;
}