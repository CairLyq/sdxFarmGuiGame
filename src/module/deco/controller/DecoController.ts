/**
 * on 2015-05-05
 * by leo
 */

class DecoController
{
    public constructor()
    {
        this.bg = new egret.Shape();
        this.bg.width = Lyrs.SW;
        this.bg.height = Lyrs.SH;
        this.bg.touchEnabled = true;

        this.sellUI = new SellUI();

        this.sellUI.addEventListener(GameEvent.SELL_DECO, this.onSellDeco, this)
        this.sellUI.addEventListener(GameEvent.CANCEL_SELL_DECO, this.onCancelSellDeco, this)
    }

    private deco:DecoBuilding;

    public sell():void
    {
        var data:Object = {
            "act":"Building.sell",
            "dt":{
                "userBuildingId":this.deco.data.userBuildingId
            }
        };

        SocketManager.instance.send(JSON.stringify(data));
    }

    public sell_cb(data:any):void
    {
        if(!data || !data.gold)
        {
            return;
        }
        var popupItemPos:egret.Point = this.deco.parent.localToGlobal(this.deco.x, this.deco.y);
        GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.RES_CHANGE, false, false, new ResChange(data.gold, 0, 0, popupItemPos)));

        this.deco.parent.removeChild(this.deco);
        DepthManager.getInstance().removeItem(this.deco);
        CollisionCheck.getInstance().change(this.deco, MapConst.OP_REMOVE);

        this.deco.dispose();
        this.deco = null;

        this.removeSellUI();
    }

    //===================================================
    private sellUI:SellUI;
    private bg:egret.Shape;

    public showSellUI(deco:DecoBuilding):void
    {
        this.deco = deco;

        this.sellUI.setGold(deco.getModel.goldRecycle)

        Lyrs.LYRS_UI_2.addChild(this.bg);
        Lyrs.LYRS_UI_2.addChild(this.sellUI);

        this.sellUI.alpha = 0;
        this.sellUI.x = (Lyrs.SW - 327 ) * .5;
        this.sellUI.y = Lyrs.SH;

        var desY:number = Lyrs.SH - 107;
        var desAlpha:number = 1;

        egret.Tween.get(this.sellUI).to({y:desY, alpha:desAlpha}, Global.PANLE_TWEEN_TIME, egret.Ease.cubicOut);
    }

    public removeSellUI():void
    {
        this.sellUI.alpha = 1;

        var desY:number = Lyrs.SH;
        var desAlpha:number = 0;

        egret.Tween.get(this.sellUI).to({y:desY, alpha:desAlpha}, Global.PANLE_TWEEN_TIME, egret.Ease.cubicOut).call(()=>
        {
            Lyrs.LYRS_UI_2.removeChildren();
        });
    }

    public onSellDeco(e:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(e);

        this.sell();
    }

    public onCancelSellDeco(e:egret.TouchEvent):void
    {
        GameEvent.BubbEvent(e);

        this.removeSellUI();

        egret.Tween.removeTweens(this.deco);
        this.deco.alpha = 1;
        this.deco = null;
    }

    //================================================================================
    private static _instance:DecoController;

    public static getInstance():DecoController
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new DecoController();
        }
        return this._instance;
    }
}