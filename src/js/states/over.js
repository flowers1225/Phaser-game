/**
 * Created by z on 16/8/21.
 */

export default class Over extends Phaser.State {
    
    preload () {}
    
    create () {

        this.txt = new Phaser.Text(this.game, this.game.world.centerX,this.game.world.centerY,'成功通过',{
            font: '24px Arial',
            fill: 'white',
            align: 'center'
        });
    
        this.txt.anchor.setTo('0.5');
    
        this.overGroup = this.add.group();
    
        this.overGroup.add(this.txt);

    }

}
