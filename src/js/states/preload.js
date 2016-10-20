/**
 * Created by z on 16/8/21.
 */
export default class Preload extends Phaser.State {

    preload () {
        this.txt = new Phaser.Text(this.game, this.game.world.centerX,this.game.world.centerY,'loading...',{
            font: '24px Arial',
            fill: 'white',
            align: 'center'
        });
        
        this.txt.anchor.setTo('0.5');

        this.overGroup = this.add.group();
    
        this.overGroup.add(this.txt);
        
        const audioJSON = {
            spritemap: {
                "jump": {
                    "start": 0,
                    "end": 1.2026984126984126,
                    "loop": false
                },
                "death": {
                    "start": 3,
                    "end": 4.202698412698412,
                    "loop": false
                },
                "caidan": {
                    "start": 6,
                    "end": 11.460657596371881,
                    "loop": false
                },
                "over": {
                    "start": 13,
                    "end": 14.72514739229025,
                    "loop": false
                }
            }
        };

        const imgPath = './dist/img/';
        const mediaPath = './dist/media/';

        this.load.crossOrigin = true;
        this.load.image('bg', imgPath + 'bg.jpg');
        this.load.image('cloud', imgPath + 'bg_cloud.png');
        this.load.image('build1', imgPath + 'bg_build1.png');
        this.load.image('build2', imgPath + 'bg_build2.png');
        this.load.image('floor', imgPath + 'bg_floor.png');
        this.load.image('slogan', imgPath + 'slogan.png');
        this.load.image('info', imgPath + 'info.png');

        this.load.spritesheet('num',  imgPath + 'num.png', 248, 125, 5);
        this.load.spritesheet('btn',  imgPath + 'btn.png', 225, 89, 2);
        this.load.spritesheet('energy',  imgPath + 'energy.png', 35, 72, 2);
        this.load.spritesheet('energyBar',  imgPath + 'energy_bar.png', 245, 35, 2);
        this.load.spritesheet('topTitle',  imgPath + 'top_title.png', 106, 26, 2);
        this.load.spritesheet('heart',  imgPath + 'heart.png', 39, 36, 2);
        this.load.spritesheet('master',  imgPath + 'master.png', 280, 542, 14);
        this.load.spritesheet('enemy1',  imgPath + 'enemy1.png', 114, 153, 4);
        this.load.spritesheet('enemy2',  imgPath + 'enemy2.png', 114, 155, 4);
        this.load.spritesheet('obstacle',  imgPath + 'obstacle.png', 60, 136, 3);
        this.load.spritesheet('death',  imgPath + 'death.png', 616, 513, 3);

        this.load.audio('bgMusic',[mediaPath + 'bg.mp3']);
        this.load.audiosprite('music', mediaPath + 'audio.mp3', null, audioJSON);

        this.game.score = 0; //定义初始分数
        this.game.life = 3; //定义初始生命
        this.game.isStart = false;

    }

    create () {

        this.game.bgMusic = this.game.add.sound('bgMusic');
        this.game.bgMusic.loop = true;

        this.game.bgMusic.play();
        
        this.game.music = this.game.add.audioSprite('music');
        this.game.music.allowMultiple = true;

        setTimeout(()=>{
            this.state.start('Play');
                
            //this.state.start('Over');
        },100);
        
    }
    
}