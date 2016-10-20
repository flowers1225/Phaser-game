/**
 * Created by z on 16/8/21.
 */

import TopBar from '../prefabs/TopBar';
import Person from '../prefabs/Master';
import Enemys from  '../prefabs/Enemys';
import Obstacles from  '../prefabs/Obstacles';
import Bullet from '../prefabs/Bullet';
import Energies from  '../prefabs/Energies';
import Death from  '../prefabs/Death';

export default class Play extends Phaser.State {

    preload () {}

    create () {

        this.gameSpeed = 300; //游戏速度
        this.game.isPlay = false; //是否开始游戏
        this.isMasterJump = false; //主人物跳

        //背景
        this.bg = this.add.tileSprite(0, 0, this.game.width, 1200, 'bg');
        this.bg.fixedToCamera = true;

        //云
        this.cloud = new Phaser.TileSprite(this.game, 0, 132, this.game.width, 408, 'cloud');
        this.cloud.fixedToCamera = true;

        //建筑物2
        this.build2 = new Phaser.TileSprite(this.game, this.game.width, 655, 1207, 242, 'build2');

        //建筑物1
        this.build1 = new Phaser.TileSprite(this.game, this.game.width, 556, 815, 342, 'build1');

        //slogan
        this.slogan = new Phaser.Sprite(this.game, this.game.world.centerX,this.game.world.centerY-(356-(174/2)),'slogan');
        this.slogan.anchor.setTo(0.5);
        this.slogan.scale.x = 0;
        this.slogan.scale.y = 0;
        this.sloganTw1 = this.add.tween(this.slogan.scale);
        this.sloganTw1.to({x:1,y:1},300,Phaser.Easing.Circular.Out);
        this.sloganTw2 = this.add.tween(this.slogan);
        this.sloganTw2.to({y:-this.game.world.centerY-(356-(174/2))},600,Phaser.Easing.Linear.None);
        this.sloganTw2.onComplete.add(()=>{
            this.playGame();
        });

        //地板
        this.floor = new Phaser.TileSprite(this.game, 0, this.game.height-265-39, this.game.width, 306,'floor');
        this.game.physics.enable(this.floor, Phaser.Physics.ARCADE, false); //开启地面物理系统
        this.floor.body.immovable = true; //固定不动
        this.floor.body.setSize(this.game.width, 17, 0, 23); //改变触碰的大小

        this.topGroup = new Phaser.Group(this, this.world, 'top');
        this.topGroup.x = 0;
        this.topGroup.y = 0;
        this.topGroupMove = this.add.tween(this.topGroup);
        this.topGroupMove.to({y:-(132+408)}, 300, Phaser.Easing.Linear.None);

        this.otherGroup = new Phaser.Group(this, this.world, 'other');
        this.otherGroup.x = 0;
        this.otherGroup.y = 0;
        this.otherGroupMove = this.add.tween(this.otherGroup);
        this.otherGroupMove.to({y:this.game.height-556}, 500, Phaser.Easing.Linear.None);

        this.topGroup.addChild(this.cloud);

        this.otherGroup.addChild(this.build2);
        this.otherGroup.addChild(this.build1);
        this.otherGroup.addChild(this.slogan);
        this.otherGroup.addChild(this.floor);

        //顶部元素
        this.topBar = new TopBar({
            game: this.game,
            life: this.game.life,
            score: this.game.score,
            stage: this
        });

        //主人物
        this.master = new Person({
            game: this.game,
            x: this.game.world.centerX-2,
            //y: this.game.height-265-(161/2)-17,
            y: this.game.height-284-71,
            asset: 'master',
        });

        //障碍组
        this.obstacles = new Obstacles({
            game: this.game,
            num: 5,
            asset: 'obstacle',
            gameSpeed: this.gameSpeed
        });

        //敌人组
        this.enemys = new Enemys({
            game: this.game
        });

        //能量
        this.energies = new Energies({
            game: this.game,
            num: 3,
            asset: 'energy',
            gameSpeed: this.gameSpeed
        });

        this.text = this.add.sprite(250, 332, 'num');
        this.text.animations.add('run',[3,4],20,true);
        this.text.visible = false;

        //jump按钮
        this.jumpBtn = new Phaser.Button(this.game, this.game.world.centerX, this.game.height - (125+89/2), 'btn', null, null, 1, 1);
        this.jumpBtn.anchor.setTo(0.5);

        this.jumpBtn.inputEnabled = true;
        this.jumpBtn.input.pixelPerfectClick = true; //精确点击

        this.jumpBtn.events.onInputDown.add(this.jumpEvent, this);

        this.otherGroup.addChild(this.jumpBtn);

        if(!this.game.isStart) {
            //start按钮
            this.startBtn = new Phaser.Button(this.game, this.game.world.centerX, this.game.height - (125+89/2), 'btn', null, null, 0, 0);
            this.startBtn.anchor.setTo(0.5);
            this.startBtn.alpha = 1;

            this.startBtn.inputEnabled = true;
            this.startBtn.input.pixelPerfectClick = true; //精确点击

            this.startBtnTween = this.add.tween(this.startBtn.scale);

            this.startBtnTween.to({x:1.1,y:1.1}, 200, Phaser.Easing.Linear.None, true, 0, -1).onComplete.add(()=>{},this);

            this.startBtn.events.onInputDown.addOnce(this.startEvent, this);

            this.otherGroup.addChild(this.startBtn);

        }else {
            this.startEvent();
        }


        this.world.addChild(this.master);

        this.setBuildMove();

        this.goInto();

    }

    setBuildMove () {
        //设置建筑物开始动画
        let time1 = (this.game.width / (this.gameSpeed / 3))*1000;

        this.build1Move = this.add.tween(this.build1);
        this.build1Move.to({x:0},time1 ,Phaser.Easing.Linear.None).delay(1000);
        this.build1Move.onComplete.add(()=>{
            //console.log('end');
            this.build1.fixedToCamera = true;
            this.build1.autoScroll(-this.gameSpeed / 3 , 0);
        },this);

        let time2 = (this.game.width / (this.gameSpeed / 4))*1000;

        this.build2Move = this.add.tween(this.build2);
        this.build2Move.to({x:0},time2 ,Phaser.Easing.Linear.None);
        this.build2Move.onComplete.add(()=>{
            //console.log('end2');
            this.build2.fixedToCamera = true;
            this.build2.autoScroll(-this.gameSpeed / 4 , 0);
        },this);
    }

    goInto () {

        if(!this.game.isStart) {
            //this.game.paused = true;
            this.sloganTw1.start();
            this.startBtnTween.yoyo(true, 0);
        }
        this.master.play('run');
        this.enemys.enemy1.play('run');
        this.enemys.enemy2.play('run');
        this.bg.autoScroll(-this.gameSpeed / 15 , 0);
        this.cloud.autoScroll(-this.gameSpeed / 8 , 0);
        this.floor.autoScroll(-this.gameSpeed, 0);
        //this.base.autoScroll(-this.gameSpeed, 0);
    }

    playGame () {

        this.text.visible = true;

        let index = 0;
        var timer = setInterval(()=>{
            index += 1;
            //console.log(index);
            if(index > 3) {
                clearInterval(timer);
                this.game.isPlay = true;
                this.text.visible = false;
                this.build1Move.start();
                this.build2Move.start();
                //this.sloganTw2.start();
                this.obstacles.setVelocity();
                this.energies.setVelocity();

                return false;
            }
            if(index == 3) {
                this.text.animations.play('run');
            }else {
                this.text.loadTexture('num', index, false);

            }

        },1000);
    }

    startEvent () {

        if(!this.game.isStart) {
            this.startBtnTween.stop();
            this.startBtn.destroy();
            this.sloganTw2.start();
        }else {
            this.slogan.visible = false;
            this.playGame();
        }

        this.game.isStart = true;
        //this.slogan.destroy();
        this.topBar.show();

    }

    jumpEvent () {

        if(this.isMasterJump) return;

        this.isMasterJump = true;

        this.isDown = false;

        //this.master.body.setSize(30, 125, 21, 0); //改变触碰的大小

        this.master.animations.play('jump');

        this.master.body.velocity.y = -700;

        this.game.music.play('jump');
    }

    checkObstacle (obstacle) {

        this.enemys.enemy1.checkJump(obstacle);

        this.enemys.enemy2.checkJump(obstacle);

        this.enemys.enemy1.checkDown();
        
        this.enemys.enemy2.checkDown();

        if(this.master.alive &&  !obstacle.hasScored && (obstacle.x + 60) < this.master.x) {
            obstacle.hasScored  = true;
        };
    }

    checkEnergy (master, energy) {
        energy.kill();

        if(!master.deathStage){
            this.enemys.speedCut();
            //console.log('得分');
            this.topBar.updateScore();
            this.topBar.updateEnergy();

            if(this.game.score == 3 && this.game.life > 0){
                this.game.isPlay = false;
                master.body.gravity.y = 0; //人的重力
                let Y = master.y;
                let X = master.x;
                master.reset(X, Y);
                this.stopGame();
                this.over();

                return false;
            }
        }
    }

    stopGame () {
        this.isMasterJump = true;

        this.energies.stop();
        this.obstacles.stop();
        this.enemys.stop();

        this.bg.stopScroll();
        this.cloud.stopScroll();
        this.build1.stopScroll();
        this.build2.stopScroll();
        this.floor.stopScroll();
        //this.base.stopScroll();

        this.build1Move.stop();
        this.build2Move.stop();
    }

    replay ()  {

        if(!this.game.isPlay) return;
        //console.log('replay');
        this.game.isPlay = false;
        this.master.deathStage = true;
        this.game.music.play('death');
        this.stopGame();
        this.master.animations.play('death');
        this.topBar.updateLife();
        this.master.body.velocity.y = -650;
        setTimeout(()=>{
            this.obstacles.hide();
            this.energies.hide();
            if(this.game.life == 0) {
                if(!this.cover) {
                    this.cover = new Death({
                        game: this.game,
                        stage: this
                    });
                    this.cover.show();
                    this.game.music.play('caidan');
                }else {
                    this.cover.show();
                }

                setTimeout(()=>{
                    
                    this.cover.hide();
                    this.master.resurgence();
                    
                    setTimeout(()=>{
                        this.over();
                    },1000);

                },5000);

            }else {
                //this.game.bgMusic.stop();
                this.state.start('Play');
            };
        },1500)
    }

    over () {

        this.master.animations.play('pass');

        let masterScaleTw = this.add.tween(this.master.scale);
        masterScaleTw.to({x:1,y:1},800,Phaser.Easing.Linear.None);
        masterScaleTw.start();

        let masterMoveTw = this.add.tween(this.master);
        masterMoveTw.to({x:470+280/2,y:293+542/2},800,Phaser.Easing.Linear.None);

        masterMoveTw.start();
        masterMoveTw.onComplete.add(()=>{
            this.game.bgMusic.stop();

            this.state.start('Over');
        });

        this.game.music.play('over');
        this.topBar.hide();
        this.enemys.hide();
        this.obstacles.hide();
        this.topGroupMove.start();
        this.otherGroupMove.start();
    }

    update () {

        //人物与地面检测
        if(!this.master.deathStage){
            this.game.physics.arcade.collide(this.master, this.floor, ()=>{
                //人物跳起落地
                if(!this.isDown && this.master.body.touching.down) {
                    this.isMasterJump = false;
                    this.isDown = true;
                    this.master.animations.play('run');
                }

            }, null, this);
        }

        this.game.physics.arcade.collide(this.enemys, this.floor, null, null, this);

        //this.game.physics.arcade.overlap(this.enemys, this.obstacles, null, null, this);

        //游戏开始
        if(this.game.isPlay) {

            this.game.physics.arcade.overlap(this.master, this.obstacles, this.replay, null, this);

            this.game.physics.arcade.overlap(this.master, this.energies, (master, energy)=>{

                this.checkEnergy(master, energy);

            }, null, this);

            this.obstacles.forEachExists(this.checkObstacle,this); // 检测柱子位置

        }

    }

    render () {
         //game.debug.body( this.obstacles.getAt(0));
         //game.debug.body( this.obstacles.getAt(1));
         //game.debug.body( this.obstacles.getAt(2));
         //game.debug.body( this.master);
         //game.debug.body( this.enemy1);
         //game.debug.body( this.enemy2);
         //game.debug.bodyInfo(this.master,0,100)
         //game.debug.body(this.floor);
    }
}

