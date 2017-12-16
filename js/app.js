// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.offsetY = 20;
    this.startY = [41.5,124.5,207.5];
    // this.startX = Math.random() * ((-100) - (-300)) + (-300);
    this.x = Math.random() * ((-100) - (-300)) + (-300);
    this.y = this.startY[Math.floor(Math.random()*this.startY.length)] + this.offsetY;
    this.speed = Math.random() * (400 - 150) + 150;
    this.collisionBuff = 50;
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
    var difY = Math.abs((this.y-this.offsetY) - (player.y-player.offsetY));
    if(difX < this.collisionBuff && difY < this.collisionBuff){
        player.y = player.startY + player.offsetY;
        player.x = player.startX;
    }

    if(this.x > 600){
        this.x = Math.random() * ((-100) - (-300)) + (-300);
        this.y = this.startY[Math.floor(Math.random()*this.startY.length)] + this.offsetY;
        this.speed = Math.random() * (400 - 150) + 150;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(round = 0) {
    this.turn = round;
    this.offsetY = 15;
    this.startX = 200;
    this.startY = 290.5;
    this.x = this.startX;
    this.y = this.startY + this.offsetY;
    this.movementX = 100;
    this.movementY = 83;
    this.sprite = ['images/char-horn-girl.png','images/char-cat-girl.png','images/char-pink-girl.png','images/char-princess-girl.png','images/char-boy.png'];
}

Player.prototype.update = function() {
    if(this.y <= -20) {
        this.x = this.startX;
        this.y = this.startY + this.offsetY;
        this.turn = this.turn++ == 4 ? 0 : this.turn;
        this.render();    
        allEnemies.push(new Enemy());
        bug_counter.text('Bugs: '+allEnemies.length);
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite[this.turn]), this.x, this.y);
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
allEnemies.push(new Enemy());
var bug_counter = $('.bug_count');

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
