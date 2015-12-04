/**
 * on 2015-01-23
 * by leo
 */

class TimeBarV2 extends egret.gui.SkinnableComponent
{
    public product_img:egret.gui.UIAsset;
    public speed_btn:egret.gui.UIAsset;

    public time_lb:egret.gui.Label;
    public dNum_lb:egret.gui.Label;

    public product_img_value:string;

    public constructor()
    {
        super();
        this.skinName = skins.uicompenet.BreedingV2.TimeBarV2Skin;
    }

    public childrenCreated():void
    {
        super.childrenCreated();

        var child:egret.DisplayObject;
        var i:number;
        for(i = 0; i < this._children.length; i++)
        {
            child = this._children[i];
            child.touchEnabled = false;
        }
        this.speed_btn.touchEnabled = true;
        this.speed_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onSpeed, this);

        if(this.product_img_value)
        {
            this.product_img.source = this.product_img_value;
        }
    }

    public onSpeed(e:egret.TouchEvent):void
    {
        this.dispatchEvent(new GameEvent(GameEvent.SPEED));
    }

    public setProduct(productId:number):void
    {
        var model:DepotModel = DepotModel.getModelById(productId);
        if(this.product_img)
        {
            this.product_img.source = model.imgId;

        }
        else
        {
            this.product_img_value = model.imgId;

        }
    }
    public updateTime(leftTime:number):void
    {
        this.time_lb.text = TimeUtils.getFormatTime(leftTime);
        this.dNum_lb.text = String(SpeedModel.getSpeed(leftTime));
    }
}