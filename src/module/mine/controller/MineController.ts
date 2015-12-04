/**
 * Created by Gordon on 04/March/15.
 * @class MineController
 * @constructor
 **/
class MineController
{
    public constructor()
    {

    }

    public digMine( buildingId:number, itemId:number ):void
    {
        var data:Object = { "act":"Building.digMine", "dt":{ "userBuildingId":buildingId, itemId:itemId } };
        SocketManager.instance.send(JSON.stringify(data), false);
    }

    //================================================================================
    private static _instance:MineController;

    public static get instance():MineController
    {
        if( null == MineController._instance )
        {
            this._instance = new MineController();
        }
        return MineController._instance;
    }
}