function playerinfo () {
	this.resources = new resource();
	this.commodity = new commodity();
}

function resources () {
	this.power = 0;
	this.health = 100;
	this.resources = 0;
	this.money = 0;
}

function commodity () {
	this.helium = 0;
	this.water = 0;
	this.oxygen = 0;
	this.hydrogen = 0;
	this.preciousmetals = 0;
}