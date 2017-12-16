// Enemies our player must avoid
var Enemy = function() {
    // Offset for displaying sprite
    this.offsetY = 20;
    // List of enemy starting y-axis positions
    this.startY = [41.5,124.5,207.5];
    // Gives enemy random x-axis starting point
    this.x = Math.random() * ((-100) - (-300)) + (-300);
    // randomly gives enemy y-axis starting point from list
    this.y = this.startY[Math.floor(Math.random()*this.startY.length)] + this.offsetY;
    // Sets speed of enemy from range
    this.speed = Math.random() * (400 - 150) + 150;
    // Buffer zone for detecting player collision
    this.collisionBuff = 50;
    this.sprite = 'images/enemy-bug.png';
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Creates movement based on enemies speed * delta time
    this.x += this.speed*dt;
    // Gets the difference between the enemy's and player's x-axis
    var difX = Math.abs(this.x - player.x);
    // Gets the difference between the enemy's and player's y-axis
    var difY = Math.abs((this.y-this.offsetY) - (player.y-player.offsetY));
    // If difference in x-axis & y-axis are less than the enemies collision buffer zone, then reset player's position to start 
    if(difX < this.collisionBuff && difY < this.collisionBuff){
        player.y = player.startY + player.offsetY;
        player.x = player.startX;
    }

    // Checks to see if enemy is past position 600 on x-axis and brings it back to random starting point
    if(this.x > 600){
        this.x = Math.random() * ((-100) - (-300)) + (-300);
        this.y = this.startY[Math.floor(Math.random()*this.startY.length)] + this.offsetY;
        this.speed = Math.random() * (400 - 150) + 150;
    }

};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(index = 0) {
    // Sets player's sprite index
    this.spriteIndex = index;
    // Offset for displaying sprite
    this.offsetY = 15;
    // Starting position for player
    this.startX = 200;
    this.startY = 290.5;
    // Current position of player
    this.x = this.startX;
    this.y = this.startY + this.offsetY;
    // Movement speed for player for both axes
    this.movementX = 100;
    this.movementY = 83;
    // List of sprites for player
    this.sprite = ['images/char-horn-girl.png','images/char-cat-girl.png','images/char-pink-girl.png','images/char-princess-girl.png','images/char-boy.png'];
}

Player.prototype.update = function() {
    // Checks if player successfully past enemy zone
    if(this.y <= -20) {
        this.x = this.startX;
        this.y = this.startY + this.offsetY;
        this.spriteIndex = this.spriteIndex++ == 4 ? 0 : this.spriteIndex;
        // Re-renders player with new sprite
        this.render();
        // Adds new enemy to enemy list
        allEnemies.push(new Enemy());
        // Changes counter text to represent number of enemies in enemy list
        bug_counter.text('Bugs: '+allEnemies.length);
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite[this.spriteIndex]), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    // Checks the string passed and adds movment to current position
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
    //limit players x-axis movement;
    this.x = Math.min(400, Math.max(0, this.x));
    //limit players y-axis movement;
    this.y = Math.min(388.5, Math.max(-26.5, this.y));

}
// Creates a new player object
var player = new Player();
// Creates enemies list and pushes new enem object
var allEnemies = [];
allEnemies.push(new Enemy());
// Passes bug counter html
var bug_counter = $('.bug_count');

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
