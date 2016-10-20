/**
 * Created by Administrator on 2016/8/22.
 */
export default class Energy  extends Phaser.Sprite{

    constructor ({game, x, y, asset, gameSpeed}) {

        super(game, x, y, asset);

        this.game = game;

        this.gameSpeed = gameSpeed;

        this.game.physics.arcade.enable(this);

        this.body.immovable = true;

        this.body.bounce.set(0);

        //this.body.velocity.x =  -this.gameSpeed;

        this.anchor.setTo(0.5, 0.5);
        
    }


};