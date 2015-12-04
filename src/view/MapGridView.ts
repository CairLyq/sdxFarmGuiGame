/**
 * Created by rodey on 14/11/24.
 *
 * 地图格子基类
 *
 */

class MapGridView extends egret.Sprite{

    private shape: egret.Shape;
    private bitmap: BitmapEx;

    //状态 none tap dowm move
    private status: string = 'none';

    constructor(){
        super();

        //这里到时可能是贴图
        //this.createBitmap();

        //先绘制菱形
        this.createShape();

        //设置当前对象属性
        //this.anchorX = this.anchorY = 0.5;
        this.width = 80;
        this.height = 80;
        this.touchEnabled = true;

    }

    /**
     * 绘制地图格子
     */
    private createShape(): void{

        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xFF8490, .8);
        this.shape.graphics.moveTo(0, 40);
        this.shape.graphics.lineTo(40, 0);
        this.shape.graphics.lineTo(80, 40);
        this.shape.graphics.lineTo(40, 80);
        this.shape.graphics.lineTo(0, 40);
        this.shape.graphics.endFill();
        this.addChild(this.shape);
    }

    /**
     * 创建贴图
     */
    private createBitmap(): void{
        this.bitmap = new BitmapEx('caodi');
        this.addChild(this.bitmap);
        //this.bitmap.cacheAsBitmap = true;
    }

}
