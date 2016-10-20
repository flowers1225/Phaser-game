/**
 * Created by Administrator on 2016/9/1.
 */

export default class Death extends Phaser.Group {

    constructor ({game, stage}) {

        super(game);

        this.game = game;
        this.stage = stage;

        this.time = 500;

        //this.anchor.setTo(0.5);

        //this.scale.x = 0;
        //this.scale.y = 0;

        //this.x = this.game.world.centerX;
        //this.y = this.game.world.centerY;

        this.x = 0;
        this.y = 0;

        this.bg = new Phaser.Graphics(this.game, 0, 0);
        this.bg.beginFill(0x000000,0.8);
        this.bg.drawRect(0,0,this.game.width, this.game.height);
        this.bg.endFill();

        this.txt = new Phaser.Text(this.game, this.game.world.centerX,this.game.world.centerY,'彩蛋',{
            font: '24px Arial',
            fill: 'white',
            align: 'center'
        });

        this.person = new Phaser.Sprite(this.game, 66, 202, 'death', 0);
        this.person.x = 66 + this.person.width/2;
        this.person.y = 202 + this.person.height/2;
        this.person.animations.add('play',[0,1,2,1], 5, true);
        this.person.animations.add('stop',[1], 5, false);

        this.info = new Phaser.Sprite(this.game, 192, 738, 'info', 0);
        this.info.x = 192 + this.info.width/2;
        this.info.y = 738 + this.info.height/2;

        this.add(this.bg);
        this.add(this.info);
        this.add(this.person);

        this.visible = false;

        this.setAll('anchor.x', 0.5);
        this.setAll('anchor.y', 0.5);


    }


    show () {

        this.visible = true;
        // let twScaleShow = this.stage.add.tween(this.scale);
        // twScaleShow.to({x:1, y:1}, this.time, Phaser.Easing.Circular.Out);
        //
        // let twShow = this.stage.add.tween(this);
        // twShow.to({x:0, y:0}, this.time, Phaser.Easing.Circular.Out);
        //
        // twShow.onComplete.add(()=>{},this);
        //
        // twScaleShow.start();
        // twShow.start();

        this.person.play('play');
    }

    hide () {

        this.visible = false;
        // let twScaleHide = this.stage.add.tween(this.scale);
        // twScaleHide.to({x:0, y:0}, this.time, Phaser.Easing.Circular.Out);
        //
        // let twHide = this.stage.add.tween(this);
        // twHide.to({x:this.game.world.centerX, y:this.game.world.centerY}, this.time, Phaser.Easing.Circular.Out);
        //
        // twHide.onComplete.add(()=>{},this);
        //
        // twScaleHide.start();
        // twHide.start();

        this.person.play('stop');

    }
}
