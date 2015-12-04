/**
 * on 2015-02-13
 * by leo
 */

class EditUI extends egret.gui.SkinnableComponent
{
    //确认位置按钮
    public confirm_btn:egret.gui.UIAsset;
    //旋转按钮
    //public flip_btn:egret.gui.UIAsset;
    public grayOnConfirm:egret.gui.UIAsset;

    public constructor()
    {
        super();

        this.skinName = skins.uicompenet.BuildingRelated.EditUISkin;

    }

    public childrenCreated():void
    {
        super.childrenCreated();


        this.confirm_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toConfirmPos, this);
        //this.flip_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toFlip, this);
    }

    /**
     * 确定放置
     * @param evt
     */
    private toConfirmPos(evt:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(evt);
        this.confirm_btn.dispatchEventWith(GameEvent.CONFIRM_ITEM_POS, true, this);
    }

    /**
     * 旋转
     * @param evt
     */
    //private toFlip(evt:egret.TouchEvent):void
    //{
    //    GameEvent.BubbEvent(evt);
    //    //this.flip_btn.dispatchEventWith(GameEvent.FLIP_ITEM, true, this);
    //}

    public updateUI(v:boolean):void
    {
        this.grayOnConfirm.visible = !v;
    }
}