
import '../less/style.less';
// import 'file-loader!../index.html';

import 'zepto';
import 'pixi';
import 'p2';
import Phaser from 'phaser';

import Boot from './states/boot';
import Preload from './states/preload';
import Play from './states/play';
import Over from './states/over';

class Game extends Phaser.Game { // 子类继承父类Phaser.Game

    constructor () {  //构造函数

        super(750, 1200, Phaser.CANVAS, 'game', null);  //通过super来调用父类(Phaser.Game)构造数

        this.state.add('Boot', Boot, true); //添加场景
        this.state.add('Preload', Preload, true);
        this.state.add('Play', Play, true);
        this.state.add('Over', Over, true);

        this.state.start('Boot'); //启动
    }
}
window.game = new Game();

