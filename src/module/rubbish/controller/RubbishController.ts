/**
 * on 2015-04-14
 * by leo
 */

class RubbishController
{
    public constructor()
    {

    }

    private rubbish:Rubbish;

    public pickup(rubbish:Rubbish):void
    {
        this.rubbish = rubbish;

        var data:Object = {
            "act":"Building.cleanRubbish",
            "dt":{
                "userRubbishId":rubbish.data.userRubbishId
            }
        };

        SocketManager.instance.send(JSON.stringify(data), false);
    }

    public pickup_cb(data:any):void
    {
        GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.ITEM_CHANGE, false, false, new ItemChange(data.item.itemId, -data.item.itemNum)));
        ToolsPanelLogic.getInstance().updateNum();

        var popupItemPos:egret.Point = this.rubbish.parent.localToGlobal(this.rubbish.x, this.rubbish.y);
        GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.RES_CHANGE, false, false, new ResChange(0, 0, data.exp, popupItemPos)));

        Lyrs.LYRS_ITEM_IN_SCENE.removeChild(this.rubbish);

        DepthManager.getInstance().removeItem(this.rubbish);

        CollisionCheck.getInstance().change(this.rubbish, MapConst.OP_REMOVE);

        this.rubbish.dispose();
        this.rubbish = null;

    }
    //================================================================================
    private static _instance:RubbishController;

    public static getInstance():RubbishController
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new RubbishController();
        }
        return this._instance;
    }
}