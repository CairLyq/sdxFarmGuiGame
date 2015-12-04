/**
 * Created by rodey on 14/11/20.
 *
 * UI 接口
 */

class UIFactory extends egret.Sprite{
    //唯一标识
    key: string;
    //唯一名称
    name: string;
    //容器
    sprite: egret.Sprite;
    //位图
    bitmap: egret.Bitmap;
    //背景
    bgmap: egret.Bitmap;
    //状态提示
    tip: egret.Bitmap;

    constructor(){
        super();
        this.touchEnabled = true;
    }

}
