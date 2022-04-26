//Michael Phannavong
//Rocket Patrol MOD
//Took about 25+ hours
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);
let keyW, keyR, keyLEFT, keyRIGHT, keyA, keyD, keyUP;

let borderUISize = config.height / 15;
let borderPadding = borderUISize / 3;

// (30) simultaneous two-player mode 
// (20) created new artwork for all in game assets 
// (20) created a new spaceship worth more points and is faster 
// (10) created a new title screen 
// (5-10) replace the UI borders with new artwork
// (5) added own copyright-free bg music 
// (5) created new scrolling tile sprite for background
// (5) playing can control rocket after Firing 
// (5 self assessment) created a separate p2 score
