/**
 * on 2015-05-05
 * by leo
 */

/**
 * sell for decoration
 */
class SellUI extends egret.gui.SkinnableComponent
{
    //取消按钮
    public cancel_btn:egret.gui.UIAsset;

    //出售按钮
    public buy_btn:egret.gui.UIAsset;

    //出售价格
    public goldNum_lb:egret.gui.Label;
    public gold:number;

    //出售提示
    public opType_lb:egret.gui.Label;

    public constructor()
    {
        super();

        this.skinName = skins.uicompenet.BuildingRelated.BuyUISkin;

        this.gold = 0;
    }

    public childrenCreated():void
    {
        super.childrenCreated();

        for(var i:number = 0; i < this._children.length; i++)
        {
            this._children[i].touchEnabled = false;
        }
        this.cancel_btn.touchEnabled = this.buy_btn.touchEnabled = true;


        this.cancel_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancel, this);
        this.buy_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSell, this);

        this.opType_lb.text = Language.getString(3, 48);

        this.setGold(this.gold);
    }

    public setGold(gold:number):void
    {
        this.gold = gold;
        if(this.goldNum_lb)
        {
            this.goldNum_lb.text = String(gold);
        }
    }

    public onCancel(e:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(e);
        this.dispatchEventWith(GameEvent.CANCEL_SELL_DECO, true, this);
    }

    public onSell(e:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(e);
        this.dispatchEventWith(GameEvent.SELL_DECO, true, this);
    }
}