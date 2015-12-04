/**
 * on 2014-12-16
 * by leo
 */
class MaskFactory
{
    private showing:boolean = false;
    public constructor()
    {
        this.mask = new egret.Shape();
        this.mask.touchEnabled = true;
        var g:egret.Graphics = this.mask.graphics;
        g.beginFill(0, 0.5);
        g.drawRect(0, 0, Lyrs.SW, Lyrs.SH);
        g.endFill();
        this.mask.width = Lyrs.SW;
        this.mask.height = Lyrs.SH;


        RES.getResAsync( 'Socket_jiazai', this.onloaded, this )
    }

    private onloaded( e:egret.Event ):void
    {
        this.wait = new egret.Bitmap();
        this.wait.texture = RES.getRes('Socket_jiazai');
        this.wait.anchorX = this.wait.anchorY = .5;
        this.wait.x = Lyrs.SW * .5; //(Lyrs.SW - this.wait.width ) * .5;
        this.wait.y = Lyrs.SH * .5; //(Lyrs.SH - this.wait.height ) * .5;

        Lyrs.LYRS_MASK.addChild(this.wait);
    }
    private mask:egret.Shape;
    private wait:egret.Bitmap;
    private stiv:any;

    public addMask(type:string = Global.MASK_TYPE_RECT, pos:egret.Point = new egret.Point(0, 0)):void
    {
        if( this.showing )
        {
            return;
        }
        if(Global.MASK_TYPE_RECT == type)
        {
            Lyrs.LYRS_MASK.addChild(this.mask);
        }


        if(this.stiv){
            window.clearInterval(this.stiv);
        }
        if( null != this.wait )
        {
            Lyrs.LYRS_MASK.addChild(this.wait);
            this.stiv = window.setInterval( ()=>{
                this.wait.rotation += 5;
            }, 10);
        }
        this.showing = true;
    }

    public removeMask():void
    {
        if( !this.showing )
        {
            return;
        }
        if(this.stiv){
            window.clearInterval(this.stiv);
        }
        Lyrs.LYRS_MASK.removeChildren();

        this.showing = false;
    }

    //===========================================================
    private static _instance:MaskFactory;

    public static getInstance():MaskFactory
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new MaskFactory();
        }
        return this._instance;
    }
}