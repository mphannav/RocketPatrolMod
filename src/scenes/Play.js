class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('rocket2', './assets/rocket2.png');
        this.load.image('spaceship', './assets/newship.png');
        this.load.image('spaceship2', './assets/spaceship.png');
        this.load.image('starfield', './assets/starsy.png');
        //this.load.image('starfield', './assets/moon.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 20, frameHeight: 16, startFrame: 0, endFrame: 9});
    }

    create(){
        //green rectangle
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.green = this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        //create player objs
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        this.p2Rocket = new Rocket2(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket2').setOrigin(0.5, 0);
        //key inputs
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        //spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship2(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship2', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ff0000',
            color: '#000000',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        this.p2Score = 0;
        let scoreConfig2 = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#0000ff',
            color: '#000000',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }
        this.scoreRight = this.add.text(borderUISize * 15.2 + borderPadding, borderUISize + borderPadding*2, this.p2Score, scoreConfig2);
        
        // let timer = {
        //     fontFamily: 'Courier',
        //     fontSize: '28px',
        //     backgroundColor: '#F3B141',
        //     color: '#843605',
        //     align: 'middle',
        //     padding: {
        //       top: 5,
        //       bottom: 5,
        //     },
        //     fixedWidth: 100
        //   }
        //   this.middle = this.add.text(borderUISize * 8 + borderPadding, borderUISize + borderPadding*2, this.time, timer).setOrigin(0,0);

        this.gameOver = false;
        scoreConfig.fixedWidth = 0;
        scoreConfig2.fixedWidth = 0;
        this.gameTimer = this.time.delayedCall(60000, () => {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        this.gameOver = true;
}, null, this);
    }
    update(){
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            this.game.sound.stopAll();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        this.starfield.tilePositionX -= 4;
        if(!this.gameOver){
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.ship01.update();               
            this.ship02.update();
            this.ship03.update();
        }
        //player 1 collision check
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);  
          }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Score += 20;
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);  
          }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);  
          }
        //player 2 collision check
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship03);  
          }
        if(this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Score += 20; 
            this.p2Rocket.reset();
            this.shipExplode2(this.ship02); 
          }
        if(this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode2(this.ship01);  
          }
    }
    checkCollision(rocket, ship){
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } 
        else {
            return false;
        }
    }
    shipExplode(ship){
        ship.alpha = 0; //hides ship

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            //ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;  
        
        this.sound.play('sfx_explosion');
    }
    shipExplode2(ship){
        ship.alpha = 0; //hides ship

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            //ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        
        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score;  
        
        this.sound.play('sfx_explosion');
    }
}