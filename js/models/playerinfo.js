function playerinfo () {
	this.resourcevalue = new resourcevalue();
	this.resourcemax = new resourcemax();
	this.infrastructure = new infrastructureItems();
	this.research = new research();
	this.totalInfrastructure = 0;

	this.resourcespercent = function () {
		return this.resourcevalue.resources / this.resourcemax.resources;
	};
	this.moneypercent = function () {
		return this.resourcevalue.money / this.resourcemax.money;
	};
	this.commoditiespercent = function () {
		return this.resourcevalue.commodities / this.resourcemax.commodities;
	};

	this.addInfrastructure = function (infrastructureType, weight) {
		this.infrastructure[infrastructureType] += 1;
		this.totalInfrastructure += weight;
	}
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
	this.metalrefineries = 0;
	this.commodityrefineries = 0;
}
function research () {
	// Maaaaybe, don't need this?
	this.printerlevel = function() {return printer.current()}; 				// 1 to 4
	this.metalrefinerylevel = function() {return metalRefinery.current()}; ;			// 1 to 3
	this.commodityrefinerylevel = function() {return commodityRefinery.current()}; ;		// 1 to 3
}