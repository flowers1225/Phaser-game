/**
 * Created by Administrator on 2016/8/25.
 */

import Enemy from './Enemy';

export default class Enemys extends Phaser.Group {

    constructor ({game}) {

        super(game);

        this.game = game;

        this.enableBody = true;

        this.x = 0;

        //第一个敌人
        this.enemy1 = new Enemy ({
            game: this.game,
            x: 100+45,
            y: this.game.height-265-(153/2)-12,
            asset: 'enemy1'
        });

        //第二个敌人
        this.enemy2 = new Enemy ({
            game: this.game,
            x: 11+45,
            y: this.game.height-265-(155/2)-12,
            asset: 'enemy2'
        });

        this.add(this.enemy2);

        this.add(this.enemy1);
        
    }

    speedCut () {

        this.forEach((enemy) => {
            //enemy.kill();
            enemy.body.velocity.x = -100;
        });
        
       setTimeout(()=>{
           this.forEach((enemy) => {
               enemy.body.velocity.x = 0;
           });
            //this.enemys.enemy1.animations.play('run');
        },300);
    }
    
    stop () {
        this.forEach((enemy) => {
            //enemy.kill();
            enemy.animations.play('death');
        });
    }
    
    hide () {

        this.forEach((enemy) => {
            enemy.kill();
        });
    }

    update () {
        
    }

}