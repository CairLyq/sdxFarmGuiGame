/**
 * Created by Gordon on 08/01/15.
 */
class TipText extends egret.DisplayObjectContainer implements game.ITip
{
    private static _instance:TipText;

    private bmp: egret.gui.Button;
    private tf: egret.TextField;

    private minisecond:number;
    constructor()
    {
        super();

        this.createBMP();
        //this.createTF();

    }
    static get instace():TipText
    {
        if( null == TipText._instance )
        {
            this._instance = new TipText();
        }
        return TipText._instance;
    }

    /**
     * @param text
     * @param minisecond 显示至消失总时间
     * @param targetPosition 必需先被addChild()
     */
    play( text:string, targetPosition?:egret.DisplayObject, minisecond:number = 1000, params?:any ):void
    {
        //this.tf.text = text;
        this.bmp.label = text;
        this.minisecond = minisecond || 1000;
        var offsetY: number = (params && null != params['offsetY']) ? Number(params['offsetY']) : 0;

        var position:number;
        if( null != targetPosition )
        {
            var point:egret.Point = targetPosition.parent.localToGlobal( targetPosition.x, targetPosition.y );
            this.x = point.x - this.width / 2;
            this.y = point.y + offsetY;
            position = Direction.NONE;
        }
        else
        {
            position = Direction.TIP_TEXT;
        }
        TipMgr.showTip( this, position, params );
    }

    /**
     * 外部不能调用，只被 TipMgr 调用
     */
    show():void
    {
        //egret.Tween.get( this ).to( { alpha:0.5, y:( this.y - this.height * 4 ) }, this.minisecond ).call( ()=>{
            //this.x = this.y = 0;
            egret.Tween.get( this ).to( { alpha:0.5 }, this.minisecond ).call( ()=>{
            this.x = this.y = 0;
            this.alpha = 1;
            TipMgr.hide();
        });
    }
    /**
     * 外部不能调用，只被 TipMgr 调用
     */
    hide():void
    {
        egret.Tween.removeTweens( this );
    }

    private createTF(): void{
        if(!this.tf){
            this.tf = new egret.TextField();
            this.addChild(this.tf);
            this.tf.size = 22;
            //this.tf.anchorX = this.tf.anchorY = .5;
            //this.tf.x = (this.width - this.tf.width) * .5;
            //this.tf.y = (this.height - this.tf.height) * .5;
            this.tf.width = this.bmp.width;
            this.tf.textAlign = egret.HorizontalAlign.CENTER;

        }
    }

    private createBMP(): void{

        /*if(!this.bmp){
            this.bmp = new egret.Bitmap();
            this.bmp.texture = RES.getRes('tishi');
            this.addChild(this.bmp);
        }*/

        if(!this.bmp){
            this.bmp = new egret.gui.Button();
            this.bmp.skinName = skins.uicompenet.Commons.TipTextSkin;
            this.bmp.width = 480;
            this.addChild(this.bmp);
            console.log(this.bmp.width)
        }


    }


}