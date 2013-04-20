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
	this.infrastructure = 0;
	this.health = 100;
	this.resources = 0;
	this.money = 0;
}