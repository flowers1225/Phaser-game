/**
 * Created by Administrator on 2016/8/26.
 */


export default class Bullet {

    constructor ({x, y, stage}) {

        this.bullet = stage.add.sprite(x, y, 'bullet');
        stage.game.physics.enable(this.bullet,Phaser.Physics.ARCADE,true);
        this.status = true;
        this.bullet.visible = false;

    }

    move () {

        this.bullet.body.velocity.x = -500;

    }

    kill () {
    
        this.bullet.kill();
    
        this.bullet = null;
    
    }

    setVisible () {
        this.bullet.visible = true;
    }



}