/**
 * Created by Administrator on 2016/8/25.
 */
export default class Obstacles extends Phaser.Group {

    constructor ({game, num, asset, gameSpeed}) {

        super(game);

        this.game = game;

        this.num = num; //创建多少个
        this.asset = asset; //贴图
        this.gameSpeed = gameSpeed; //移动速度

        this.enableBody = true;

        this.createMultiple(this.num, this.asset, 0, false);
        this.setAll('body.velocity.x', -this.gameSpeed);
        
        this.isKill = false;

        this.distance = this.game.width + 100;

        this.distanceThan = [1, 0.6, 0.3, 0.3, 0];

        this.createObstacle();
        
        this.bullets = [];
        
    }

    createObstacle () {
        let obstacle;

        for(var i = 0; i < this.num; i++){
            //let obstacleX = (i+1) * (this.game.width) + Math.floor(Math.random()*20);
            let obstacleX = (i * this.distance) + (this.distance * this.distanceThan[i]);
            //console.log(obstacleX);
            //let obstacleX = this.game.width + 200 * i;
            obstacle = this.getFirstExists(false);
            obstacle.reset(obstacleX, this.game.height-285); //设置障碍位置
            this.game.physics.arcade.enable(obstacle);
            obstacle.body.immovable = true;
            obstacle.body.bounce.set(0);
            obstacle.body.setSize(40,63,0,73);
            //obstacle.body.velocity.x =  -this.gameSpeed;
            obstacle.hasScored = false;
            obstacle.anchor.setTo(0,1);
            obstacle.animations.add('static',[0], 10, false);
            obstacle.animations.add('shoot', [1,2], 100, false);
        }

        this.lastObstacle = obstacle; //保存最后一个障碍信息
    }

    setVelocity () {
        this.forEach((obstacle)=>{
            obstacle.body.velocity.x = -this.gameSpeed;
        },this);
    }
    
    stop () {
        this.forEachAlive((obstacle)=>{
            obstacle.body.velocity.x = 0;
            obstacle.body.immovable = true;
        },this);
    }

    rotate (index) {

        this.getAt(index).rotation = Math.PI / 2;
    }

    hide () {
        
        this.forEachAlive((enemy) => {
            enemy.kill();
        });
    }
    
    update () {
        if(this.game.isPlay) {
            //判断是否移出左边屏幕 true：kill()
            this.forEach((obstacle)=>{
                if (obstacle.body.right <= 0) {
                    //console.log('kill');
                    this.isKill = true;
                    obstacle.kill();
                    let index = this.getChildIndex(obstacle);
                    //console.log(index);
                    this.bullets[index] = null;
                }
            },this);

            //障碍被kill 重置位置b
            // if(this.isKill) {
            //     this.forEachDead((obstacle)=>{
            //         this.isKill = false;
            //         obstacle.reset(this.lastObstacle.body.right + this.game.width + 100, this.game.height-285); //重置到初始位置
            //         obstacle.body.velocity.x = -this.gameSpeed; //设置障碍速度
            //         obstacle.body.immovable = true;
            //         obstacle.hasScored = false;
            //         obstacle.angle = 0;
            //         obstacle.anchor.setTo(0,1);
            //         obstacle.animations.play('static');
            //         this.lastObstacle = obstacle;
            //     },this);
            //
            // };
        };

    }

}