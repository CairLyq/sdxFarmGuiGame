/**
 * on 2015-01-08
 * by leo
 */

class PickupProgress extends egret.DisplayObjectContainer
{
    private rt:egret.Rectangle;

    private bg:egret.Bitmap;
    private arrow:egret.Bitmap;

    public constructor()
    {
        super();

        this.bg = new BitmapEx("JTXZ-jiantoux");
        this.addChild(this.bg);
        this.arrow = new BitmapEx("JTXZ-jiantou");
        this.addChild(this.arrow);

        this.rt = new egret.Rectangle(0, this.arrow.height, this.arrow.width, this.arrow.height);
        this.arrow.mask = this.rt;

        this.touchEnabled = false;
        this.touchChildren = false;
    }

    public show(building:BuildingIso):void
    {
        this.hide();

        var p:egret.Point = Lyrs.LYRS_ITEM_IN_SCENE.localToGlobal(building.x, building.y);

        this.x = p.x - Math.floor(this.rt.width * .5);
        this.y = p.y - Math.floor(this.rt.height * .5);
        Lyrs.LYRS_UI_2.addChild(this);

        egret.Ticker.getInstance().register(this.update, this);

        this.rt.y = this.arrow.height;
    }

    public hide():void
    {
        egret.Ticker.getInstance().unregister(this.update, this);

        if(this.parent)
        {
            this.parent.removeChild(this);
        }
    }

    public update():void
    {
        if(this.rt.y < 0)
        {
            return;
        }
        else
        {
            this.rt.y -= 4;
        }
    }

    //===============================================================
    private static _instance:PickupProgress;

    public static getInstance():PickupProgress
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new PickupProgress();
        }
        return this._instance;
    }
}