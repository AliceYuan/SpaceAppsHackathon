function infrastructure(name, type, weight, eventid, prerequisiteCheck) {
	var generationModifiers = {
		1: 90,
		2: 95,
		3: 99,
		4: 100
	},
		maxGeneration = 4,
		transportCost = 10000,
		gearRatio = 4,
		currentGeneration = 1,
		weight = weight,	
		name = name,
		type = type,
		prerequisiteCheck = prerequisiteCheck || function () {return true};


	function cost() {
		var multiplier = generationModifiers[currentGeneration];
			money = Math.round(transportCost * weight * (gearRatio + 1) * ( (100 - multiplier) / 100));
			resources = Math.round(weight * (multiplier / 100));

		return {money: money, resources: resources};
	}

	function increaseGeneration() {
		if (currentGeneration < maxGeneration) {
			currentGeneration += 1;
		}
	}

	function current() {
		return currentGeneration;
	}

	function finished() {
		return currentGeneration == maxGeneration;
	}

	return {
		cost: cost,
		upgrade: increaseGeneration,
		current: current,
		name: name, 
		type: type, // For convenient referencing.
		weight: weight,
		eventid: eventid,
		prerequisiteCheck: prerequisiteCheck
	};
}
var printerPrereqCallback = function () {return player.infrastructure.printers > 0},
	printerRefineryPrereq = function () {return player.infrastructure.metalrefineries > 0};

var metalRefinery = infrastructure("Metal Refinery", "metalrefineries", 1019, 8, printerPrereqCallback),
	commodityRefinery = infrastructure("Commodity Refinery", "commodityrefineries", 733, 9, printerRefineryPrereq),
	printer = infrastructure("3D Printer", "printers", 169, 7),
	resourceExtractor = infrastructure("Resource Extractor", "resourceextractors", 70, 10, printerPrereqCallback);

var allInfrastructure = [printer, resourceExtractor, metalRefinery, commodityRefinery];

/* Modifying the state of infrastructure 
console.log('Current generation', metalRefinery.current());
console.log('Get Current Cost', metalRefinery.cost());
console.log('Upgrade!', metalRefinery.upgrade());
console.log('Upgraded Cost', metalRefinery.cost());
*/