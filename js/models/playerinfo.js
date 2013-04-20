function playerinfo () {
	this.resourcevalue = new resourcevalue();
	this.resourcemax = new resourcemax();
	this.commodity = new commodity();
	this.infrastructure = new infrastructure();

	this.healthpercent = function () { return playerinfo.resourcevalue / playerinfo.resourcemax; };
	this.resourcepercent = 0;
	this.moneypercent = 0;
}

function resourcevalue () {
	this.health = 50;
	this.resources = 0;
	this.money = 0;
}

function resourcemax () {
	this.health = 100;
	this.resources = 100;
	this.money = 1000;
}

function commodity () {
	this.helium = 0;
	this.water = 0;
	this.oxygen = 0;
	this.hydrogen = 0;
	this.preciousmetals = 0;
}
function infrastructure () {
	this.rovers = 0;
	this.solarpanels = 0;
	this.printers = 0;
	this.resourceextractors = 0;
	this.waterextractors = 0;
}