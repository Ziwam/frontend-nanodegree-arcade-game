// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 0;
    this.y = 0;
    this.speed = 80;
    this.collisionBuff = 30;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;

    var difX = Math.abs(this.x - player.x);
    var difY = Math.abs(this.x - player.x);
    if(difX < this.collisionBuff && difY < this.collisionBuff){
        // player.y = 300;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.offsetY = 15;
    this.startX = 200;
    this.startY = 290.5;
    this.x = this.startX;
    this.y = this.startY + this.offsetY;
    this.movementX = 100;
    this.movementY = 83;
    this.sprite = 'images/char-horn-girl.png';
}

Player.prototype.update = function() {
    
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    switch(key){
        case 'left':
            this.x -= this.movementX;
            break;
        case 'right':
            this.x += this.movementX;
            break;
        case 'down':
            this.y += this.movementY;
            break;
        case 'up':
            this.y -= this.movementY;
            break;
    }
    console.log(this.x+', '+this.y);
    //limit players X-axis movement;
    this.x = Math.min(400, Math.max(0, this.x));
    //limit players Y-axis movement;
    this.y = Math.min(388.5, Math.max(-26.5, this.y));

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
for (var i = 0; i < 1; i++) {
    allEnemies.push(new Enemy());
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
