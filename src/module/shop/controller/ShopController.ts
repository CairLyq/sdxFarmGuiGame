///**
// * on 2014-12-11
// * by leo
// */
//
//class ShopController
//{
//    public constructor()
//    {
//
//    }
//
//    public buy(item:BuildingIso):void
//    {
//        var position:string = PosUtils.getPosStr(item);
//        var data:Object = {"act":"Building.buy", "dt":{"buildingId":item.model.buildingId, "position":position, "buyType":0}};
//        SocketManager.instance.send(JSON.stringify(data));
//    }
//
//    //================================================================================
//    private static _instance:ShopController;
//
//    public static getInstance():ShopController
//    {
//        if(this._instance)
//        {
//            return this._instance;
//        }
//        else
//        {
//            this._instance = new ShopController();
//        }
//        return this._instance;
//    }
//}