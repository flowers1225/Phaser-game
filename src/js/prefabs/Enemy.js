/**
 * Created by Administrator on 2016/8/25.
 */

export default class Enemy extends Phaser.Sprite{

    constructor ({game, x, y, asset}) {

        super(game, x, y, asset);

        this.game = game;
        
        this.game.physics.arcade.enable(this);

        this.body.bounce.set(0);

        this.body.gravity.y = 1600;

        this.anchor.setTo(0.5, 0.5);

        this.jump = false;

        this.isDown = false;

        this.game.camera.follow(this);

        this.animations.add('run', [1,2], 10, true);
        //
        this.animations.add('jump', [3], 10, false);

        this.animations.add('death', [0], 10, false);
        
    }

    checkJump (obstacle) {
        
        if(!this.jump && obstacle.x - this.x < 57 && obstacle.x - this.x > 0){
            this.jump = true;
            this.isDown = false;
            this.animations.play('jump');
            this.body.velocity.y = -650;
        };
        
    }

    checkDown () {

        if(!this.isDown && this.body.touching.down && this.jump) {
            this.isDown = true;
            this.jump = false;
            this.animations.play('run');
        };

    }
    update () {


    }

}