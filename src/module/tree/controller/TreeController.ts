/**
 * on 2014-12-26
 * by leo
 */

class TreeController
{
    private tree:TreeBuilding;

    public constructor()
    {

    }

    public harvest(trees:ItemIso[]):void
    {
        if(0 == trees.length)
        {
            return;
        }
        var arr:number[] = [];
        var i:number;
        var one:TreeBuilding;
        for(i = 0; i < trees.length; i++)
        {
            one = <TreeBuilding>trees[i];
            arr.push(one.data.userBuildingId)
        }
        var data:Object = {"act":"Building.harvestTree", "dt":{"userBuildingIds":arr}};
        SocketManager.instance.send(JSON.stringify(data), false);
    }

    public fell(tree:TreeBuilding):void
    {

        this.tree = tree;
        var data:Object = {"act":"Building.cutTree", "dt":{"userBuildingId":tree.data.userBuildingId}};
        SocketManager.instance.send(JSON.stringify(data), false);
    }

    public fell_cb(data:any):void
    {
        GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.ITEM_CHANGE, false, false, new ItemChange(data.item.itemId, -data.item.itemNum)));

        ToolsPanelLogic.getInstance().updateNum();

        var popupItemPos:egret.Point = this.tree.parent.localToGlobal(this.tree.x, this.tree.y);
        GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.RES_CHANGE, false, false, new ResChange(0, 0, data.exp, popupItemPos)));

        this.tree.parent.removeChild(this.tree);
        DepthManager.getInstance().removeItem(this.tree);

        CollisionCheck.getInstance().change(this.tree, MapConst.OP_REMOVE);

        this.tree.dispose();
        this.tree = null;
    }

    public speed(tree:TreeBuilding):void
    {
        this.tree = tree;

        var tm:TreeModel = TreeModel.getModelByBuildingId(tree.model.buildingId);

        var data:Object = {
            "act":"Building.speedUp",
            "dt":{
                "userBuildingId":tree.data.userBuildingId,
                "userProductId":tm.harvestItemId,
                "moduleType":SpeedupType.SPEEDUP_TREE
            }
        };

        SocketManager.instance.send(JSON.stringify(data), true);
    }


    public speed_cb(data:any):void
    {
        GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.RES_CHANGE, false, false, new ResChange(0, -data.money, 0)));

        this.tree.assistLogic.speed_cb();

        this.tree.data.updateDate = GTimer.getInstance().serverTime * 1000;

        this.tree = null;
    }

    //================================================================================
    private static _instance:TreeController;

    public static getInstance():TreeController
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new TreeController();
        }
        return this._instance;
    }
}