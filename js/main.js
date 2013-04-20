$(document).ready(function() {
	draw();
	startIntialStory();
});

function draw() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	ctx.fillStyle = "orange";
	ctx.fillRect(0,0, canvas.width, canvas.height);
	ctx.font="30px Arial";
	ctx.strokeText("Hello World",10,50);
}