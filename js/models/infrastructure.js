function infrastructure(name, weight) {
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
		name = name;


	function cost() {
		var multiplier = generationModifiers[currentGeneration];
			money = transportCost * weight * (gearRatio + 1) * ( (100 - multiplier) / 100);
			resources = weight * (multiplier / 100);

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
		name: name
	};
}

var metalRefinery = infrastructure("Metal Refinery", 1019),
	commodityRefinery = infrastructure("Commodity Refinery", 733),
	printer = infrastructure("3D Printer", 169);

/* Modifying the state of infrastructure 
console.log('Current generation', metalRefinery.current());
console.log('Get Current Cost', metalRefinery.cost());
console.log('Upgrade!', metalRefinery.upgrade());
console.log('Upgraded Cost', metalRefinery.cost());
*/