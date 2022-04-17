class Rocket2 extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.sfxRocket2 = scene.sound.add('sfx_rocket');
    }

    update(){
        if(!this.isFiring){
            if(keyA.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            }
            else if(keyD.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }
        }
        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket2.play();
        }
        //is fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
            if(keyA.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            }
            else if(keyD.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }
        }
        //reset if miss
        if(this.y <= borderUISize * 3 + borderPadding){
            this.reset();
        }
    }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}