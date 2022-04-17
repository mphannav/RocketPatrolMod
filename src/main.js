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