/**
 * on 2015-01-13
 * by leo
 */

class BuyUI extends egret.gui.SkinnableComponent
{
    //取消按钮
    public cancel_btn:egret.gui.UIAsset;

    //购买按钮
    public buy_btn:egret.gui.UIAsset;
    public jinbiAsset:egret.gui.UIAsset;
    //旋转按钮
    //public flip_btn:egret.gui.UIAsset;

    //public grayOnBuy:egret.gui.UIAsset;

    public goldNum_lb:egret.gui.Label;

    private gold: number;
    private bType: string;

    public opType_lb:egret.gui.Label;

    constructor()
    {
        super();

        this.skinName = skins.uicompenet.BuildingRelated.BuyUISkin;

        this.gold = 0;
    }

    public childrenCreated():void
    {
        super.childrenCreated();

        this.cancel_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toCancel, this);
        this.buy_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toBuy, this);
        //this.flip_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toFlip, this);

        //如果正处在新手引导中，取消和选择 按钮相应处理...
        if(GuideManager.getInstance().isInGuide())
        {
            this.setGuideBuyUI(.6);
        }else
        {
            this.setGuideBuyUI();
        }

        if(this.jinbiAsset){
            this.setGold(this.gold, this.bType);
        }

        this.opType_lb.text = Language.getString(3, 49);
    }

    public setGold(gold:number, bType: string = 'gold'):void
    {
        this.gold = gold;
        this.bType = bType;
        if(this.goldNum_lb)
        {
            this.goldNum_lb.text = String(this.gold);
        }

        if(this.jinbiAsset){
            if(bType === 'diamond'){
                this.jinbiAsset.source = 'ZJM_15';
            }else{
                this.jinbiAsset.source = 'Dd-jib';
            }
        }

    }

    /**
     * 购买 商品
     * @param evt
     */
    private toBuy(evt:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(evt);
        this.buy_btn.dispatchEventWith(GameEvent.BUY_ITEM, true, this);
    }

    /**
     * 取消购买 商品
     * @param evt
     */
    private toCancel(evt:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(evt);
        //新手引导
        if(GuideManager.getInstance().isInGuide())
        {
            return;
        }
        this.cancel_btn.dispatchEventWith(GameEvent.CANCEL_BUY_ITEM, true, this);
    }

    /**
     * 旋转
     * @param evt
     */
    private toFlip(evt:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(evt);
        //新手引导
        if(GuideManager.getInstance().isInGuide())
        {
            return;
        }
        //this.flip_btn.dispatchEventWith(GameEvent.FLIP_ITEM, true, this);
    }

    //public updateUI(v:boolean):void
    //{
    //    this.grayOnBuy.visible = !v;
    //}

    public setBuyBtnVisible(isCanBePlaced:boolean):void
    {
        if(isCanBePlaced)
        {
            this.buy_btn.alpha = 1;
        }
        else
        {
            this.buy_btn.alpha = .6;
        }
    }
    public dispose():void
    {
        //this.cancel_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toCancel, this);
        //this.buy_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toBuy, this);
        ////this.flip_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toFlip, this);

        this.bType = 'gold';

    }

    public setGuideBuyUI(alpha:number = 1):void
    {
        this.cancel_btn.alpha = alpha;
        //this.flip_btn.alpha = alpha;
    }

    public setTwoBtnAlpha(cancelAlpha:number, buyAlpha:number):void
    {
        this.buy_btn.alpha = cancelAlpha;
        this.buy_btn.alpha = buyAlpha;
    }
}