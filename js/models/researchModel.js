function researchModel () {
	this.researchArray = []
	this.constructArray = []
	for(var i in researchManager.researchEvents.size()) {
		this.researchArray.push(new researchObject());
	}
	for(var i in researchManager.constructEvents.size()) {
		this.constructArray.push(new researchObject());
	}
	console.log(this.researchArray);
	console.log(this.constructArray);
}

function researchObject () {
	this.isBuilt = false;
}