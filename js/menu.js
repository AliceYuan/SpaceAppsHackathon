// Simple menu class

Menu = function(title, items, footer, y, size, width, callback, backgroundCallback) {
    this.title = title;
    this.items = items;
    this.footer = footer;
    this.selectedItem = 0;
    this.callback = callback;
    this.y = y;
    this.size = size;
    this.width = width;
    this.backgroundCallback = backgroundCallback;
};

Menu.prototype.constructor = Menu;

Menu.prototype.Render = function(elapsed) {
    if (this.backgroundCallback)
        this.backgroundCallback(elapsed);
    else {
        var lingrad = ctx.createLinearGradient(0,0,0,canvas.height);
        lingrad.addColorStop(0, '#000');
        lingrad.addColorStop(1, '#023');
        ctx.fillStyle = lingrad;
        ctx.fillRect(0,0,canvas.width, canvas.height);
    }
    
    ctx.textAlign = "center";
    ctx.fillStyle = "White";

    var y = this.y;
    if (this.title)
    {
        ctx.font = Math.floor(this.size*1.3).toString() + "px Times New Roman";
        ctx.fillText(this.title, canvas.width/2, y);
        y += this.size;
    }

    for (var i = 0; i < this.items.length; ++i)
    {
        var size = Math.floor(this.size*0.8);
        if (i == this.selectedItem)
        {
            var v = Math.floor(127*Math.sin(GameLoopManager.lastTime*0.04) + 127);
            ctx.fillStyle = "rgba(255,255,"+v.toString()+",255)";
            size = this.size;
        }
        ctx.font = size.toString() + "px Times New Roman";
        y += this.size;
        ctx.fillText(this.items[i], canvas.width/2, y);
        ctx.fillStyle = "White";
    }
    if (this.footer)
    {
        ctx.textAlign = "right";
        ctx.font = "14px Times New Roman";
        ctx.fillText(this.footer, canvas.width-1, canvas.height-3);
    }
};

Menu.prototype.Input = function(elapsed)
{
    InputManager.padUpdate();
    if (InputManager.padPressed & InputManager.PAD.OK)
    {
        AudioManager.play("select");
        this.callback(this.selectedItem);
        return;
    }
    if (InputManager.padPressed & InputManager.PAD.CANCEL)
    {
        this.callback(-1);
        return;
    }
    var prevSelected = this.selectedItem;
    if (InputManager.padPressed & InputManager.PAD.UP)
        this.selectedItem = (this.selectedItem + this.items.length - 1) % this.items.length;
    if (InputManager.padPressed & InputManager.PAD.DOWN)
        this.selectedItem = (this.selectedItem + 1) % this.items.length;

    var leftx = (canvas.width - this.width)/2;
    if (InputManager.lastMouseX >= leftx && InputManager.lastMouseX < leftx+this.width)
    {
        var y = this.y + this.size*0.2; // Adjust for baseline
        if (this.title)
            y += this.size;
        if (InputManager.lastMouseY >= y && InputManager.lastMouseY < (y + this.size*this.items.length))
            this.selectedItem = Math.floor((InputManager.lastMouseY - y)/this.size);
    }
    if (prevSelected != this.selectedItem)
    {
        AudioManager.play("blip");
    }
};

Menu.prototype.Tick = function(elapsed) {
    fps.update(elapsed);
    this.Input(elapsed);
    this.Render(elapsed);
};