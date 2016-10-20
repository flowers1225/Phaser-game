/**
 * Created by Administrator on 2016/8/22.
 */

import Energy from './Energy';

export default class Energies  extends Phaser.Group{

    constructor ({game, num, asset, gameSpeed}) {

        super(game);

        this.game = game;
        this.num = num;
        this.asset = asset; //贴图
        this.gameSpeed = gameSpeed; //移动速度

        this.enableBody = true;

        this.distance = this.game.width + 100;

        this.distanceThan = [1.6, 1.4, 2.0];

        this.createEnergies();

    }

    createEnergies () {

        for(var i = 0; i< this.num; i++){
            //Math.floor(Math.random()*(max-min+1)+min);
            //let EnergyX = Math.floor((i+1) * (this.game.width + 240) + (Math.random()*(50-10+1)+10));
            //let EnergyY = Math.floor(this.game.height-295 -80 -((Math.random()*(60-10+1)+10)));
            let EnergyX = (i * this.distance) + (this.distance * this.distanceThan[i]) + 110;
            let EnergyY = Math.floor(this.game.height-295 -140);
            this.add(new Energy({
                game: this.game,
                x: EnergyX,
                y: EnergyY,
                asset: this.asset,
                //gameSpeed: this.gameSpeed
            }));
        }
        
        this.lastEnergy = this.getAt(this.num-1);

        this.changeTexture(this.num-this.game.score-1, this.asset);
    }
    
    changeTexture (index, asset) {
        this.getAt(index).loadTexture(asset, 1, false);
    }

    setVelocity () {
        this.forEach((energy)=>{
            energy.body.velocity.x = -this.gameSpeed;
        },this);
    }
    
    stop () {
        this.forEachAlive((energy)=>{
            energy.body.velocity.x = 0;
            energy.body.immovable = true;
        },this);
    }

    hide () {
        this.forEachAlive((energy)=>{
            energy.kill();
        },this);
    }

    resetPlace (master, energy) {

        if(energy.alive) {

            energy.kill();

            //console.log(this.lastEnergy.body.right);
            //let EnergyX = Math.floor(this.lastEnergy.body.right +  (this.game.width + 200) + (Math.random()*(50-10+1)+10));
            //let EnergyY = Math.floor(this.game.height-295 -80 -((Math.random()*(60-10+1)+10)));

            let EnergyX = this.lastEnergy.body.right + (this.game.width + 110);
            let EnergyY = Math.floor(this.game.height-295 -150);

            energy.reset(EnergyX, EnergyY); //重置位置
            energy.body.velocity.x = -this.gameSpeed; //设置速度
            energy.body.immovable = true;
            energy.anchor.setTo(0.5,0.5);

            this.lastEnergy = energy;
        }
        

    }
    update() {}

};