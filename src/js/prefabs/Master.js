/**
 * Created by Administrator on 2016/8/25.
 */
export default class Person extends Phaser.Sprite {

    constructor ({game, x, y, asset, frame, floor}) {

        super(game, x, y, asset, 0);

        this.game = game;
        
        this.game.physics.arcade.enable(this); //开启人的物理系统

        this.initX = x;
        this.initY = y;
        
        this.body.gravity.y = 1600; //人的重力

        this.anchor.setTo(0.5, 0.5);

        this.scale.x = 0.297;

        this.scale.y = 0.297;

        //this.x = 470+280/2;
        //this.y = 386+542/2;

        this.game.camera.follow(this);

        this.deathStage = false;

        this.isDown = false;

        this.body.setSize(130, 522, 75, 0); //改变触碰的大小

        //console.log(this.height, this.width);
        this.animations.add('init',[0], 10, false);
        this.animations.add('run',[1,2,3,4,5,6], 20, true);
        this.animations.add('jump', [7], 10, false);
        //this.animations.add('pass', [0,1,0,1,2,3,2,3,4,5,4], 20, false);
        this.animations.add('pass', [7,8,9,10,11,12,11], 8, false);
        this.animations.add('death',[13], 10, false);
        this.animations.add('resurgence',[0,7], 10, false);
    }

    resurgence () {
        this.body.gravity.y = 0;
        this.reset(this.initX, this.initY);
        this.animations.play('init');
    }
    
    update () {

    }

}
