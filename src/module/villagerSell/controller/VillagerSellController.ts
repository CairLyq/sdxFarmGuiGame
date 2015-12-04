/**
 * on 2015-03-12
 * by leo
 */

class VillagerSellController
{
    public constructor()
    {

    }

    private villager:Villager;

    public sell(villager:Villager):void
    {
        this.villager = villager;

        var data:Object = {
            "act":"User.buyVillager",
            "dt":{"villagerId":villager.data.villagerId}
        };
        SocketManager.instance.send(JSON.stringify(data));
    }

    public sell_cb(data:any):void
    {
        GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_CHANGE, true, new ItemChange(data.item.itemId, -data.item.itemNum, null));

        GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE, true, new ResChange(data.gold, 0, data.exp, new egret.Point(Lyrs.SW * .5, Lyrs.SH * .5)));

        UIMgr.instance.closeCurrentPanel();

        this.villager.sell_cb();

        //this.villager.showEmotionAndFadeOut();

        //this.villager.fadeOut();

        this.villager = null;

        VillagerGuideController.getInstance().nextStep();
    }

    public refuse(villager:Villager):void
    {
        this.villager = villager;

        var data:Object = {
            "act":"User.refuseVillager",
            "dt":{"villagerId":villager.data.villagerId}
        };
        SocketManager.instance.send(JSON.stringify(data));
    }

    public refuse_cb():void
    {
        UIMgr.instance.closeCurrentPanel();

        this.villager.refuse_cb();

        //this.villager.showEmotionAndFadeOut();

        //this.villager.fadeOut();

        this.villager = null;
    }

    public addVillager(data:any):void
    {
        VillagerManager.getInstance().addVillager(<UserVillager>(data.userVillager));
    }
    //================================================================================
    private static _instance:VillagerSellController;

    public static getInstance():VillagerSellController
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new VillagerSellController();
        }
        return this._instance;
    }
}