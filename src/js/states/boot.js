/**
 * Created by z on 16/8/21.
 */

export default class Boot extends Phaser.State {

    //先预紧力。通常情况下，你会使用这个来装载你的游戏资产（或当前状态所需的）
    preload () {
        this.game.stage.backgroundColor = '#000';
    }

    //创建被称为一次预载完成，这包括从装载的任何资产的装载。
    create () {
        //show_all规模的模式，展示了整个游戏的同时保持比例看
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true; //当启用显示画布将水平排列的
        this.scale.pageAlignVertically = true; //当启用显示画布将垂直对齐的

        //物理系统启动：phaser.physics.arcade，phaser.physics.p2js，phaser.physics.ninja或相位。物理。Box2D。
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        setTimeout(() => {
            this.state.start('Preload');
        },100);

    }
}