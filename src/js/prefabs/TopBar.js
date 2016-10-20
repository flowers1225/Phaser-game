/**
 * Created by Administrator on 2016/8/22.
 */
export default class TopBar {

    constructor ({ game, life, score, stage}) {
        //super(game);

        this.game = game;
        this.life = life;
        this.score = score;
        this.stage = stage;
        
        //创建生命组
        this.heartGroup = this.stage.add.group();
        this.heartGroup.x = 36;
        this.heartGroup.y = 33;

        this.heartTitle = new Phaser.Sprite(this.game, 0, 0, 'topTitle', 0);

        this.createHeart ();

        this.heartGroup.addChildAt(this.heartTitle,3);

  
        //创建能量组
        this.energyGroup = this.stage.add.group();
        this.energyGroup.x = this.game.width - 33-245;
        this.energyGroup.y = 33;

        this.energyTitle = new Phaser.Sprite(this.game, 140, 0, 'topTitle', 1);
        this.energyBg = new Phaser.Sprite(this.game, 0, 33, 'energyBar', 0);
        this.energyCover = new Phaser.Sprite(this.game, 0, 33, 'energyBar', 1);

        this.energyGroup.add(this.energyTitle);
        this.energyGroup.add(this.energyBg);
        this.energyGroup.add(this.energyCover);

        this.heartGroup.visible = false;
        this.energyGroup.visible = false;
        
        this.updateEnergy();
        this.show();

    }

    createHeart () {
        for (var i = 0; i< 3; i++) {
            var x = (i * 43)+3;
            var key = 0;
            if(i >= this.life) {key = 1;}
            let sprite = new Phaser.Sprite(this.game, x, 33, 'heart',key);
            sprite.animations.add('death',[1], 10, false);
            this.heartGroup.add(sprite);
        }
    }

    updateEnergy () {
        //更新能量条
        let distance = this.energyBg.width * (3-this.score) / 3;

        this.energyCover.x = distance;

        this.energyCover.crop(new Phaser.Rectangle(distance, 0, this.energyBg.width * (this.score / 3), 35)); //裁切一个矩形区域

        this.energyCover.updateCrop(); //更新
    }

    updateScore () {
        //更新计数
        this.score += 1;
        this.game.score = this.score;
    }

    updateLife () {
        //更新生命数
        this.life -= 1;
        this.game.life = this.life;
        this.heartGroup.getAt(this.life).play('death');
    }

    show () {
        this.heartGroup.visible = true;
        this.energyGroup.visible = true;
    }

    hide () {

        var time = 1000;

        let heartGroupMove = this.stage.add.tween(this.heartGroup);
        heartGroupMove.to({y:-this.heartGroup.height-37}, time, Phaser.Easing.Linear.None);

        let energyGroupMove = this.stage.add.tween(this.energyGroup);
        energyGroupMove.to({y:-this.energyGroup.height-37}, time, Phaser.Easing.Linear.None);

        heartGroupMove.start();
        energyGroupMove.start();
    }
};