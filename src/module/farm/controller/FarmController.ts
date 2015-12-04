/**
 * on 2014-12-24
 * by leo
 */

class FarmController
{
    public constructor()
    {

    }

    public farms:FarmBuilding[];

    public plant(farms:FarmBuilding[], itemId:number):void
    {

        if(0 == farms.length)
        {
            return;
        }
        this.farms = farms;

        var arr:number[] = [];
        var i:number;
        var one:FarmBuilding;
        for(i = 0; i < farms.length; i++)
        {
            one = farms[i];
            arr.push(one.data.userBuildingId);
        }
        var data:Object = {"act":"Building.grow", "dt":{"userBuildingIds":arr, "itemId":itemId}};
        SocketManager.instance.send(JSON.stringify(data), false);
    }

    public plant_cb(data:any):void
    {
        if(!data.userProducts)
        {
            return;
        }
        var productDataList:any[] = data.userProducts;

        var i:number;

        var productData:Object;

        var farm:FarmBuilding;

        for(i = 0; i < productDataList.length; i++)
        {
            farm = this.farms[i];

            productData = productDataList[i];

            farm.data.product = new UserProduct( productData );

            farm.assistLogic.plant_cb();
        }

        this.farms.length = 0;
    }

    public harvest(farms:ItemIso[]):void
    {
        if(0 == farms.length)
        {
            return;
        }
        var arr:number[] = [];
        var i:number;
        var one:FarmBuilding;
        for(i = 0; i < farms.length; i++)
        {
            one = <FarmBuilding>farms[i];
            arr.push(one.data.userBuildingId)
        }
        var data:Object = {"act":"Building.harvestCrop", "dt":{"userBuildingIds":arr}};
        SocketManager.instance.send(JSON.stringify(data), false);
    }

    private speedBuilding:FarmBuilding;

    public speed(building:FarmBuilding):void
    {
        this.speedBuilding = building;

        var data:Object = {
            "act":"Building.speedUp",
            "dt":{
                "userBuildingId":building.data.userBuildingId,
                "userProductId":building.data.product.userProductId,
                "moduleType":SpeedupType.SPEEDUP_FARM
            }
        };

        SocketManager.instance.send(JSON.stringify(data), false);
    }

    public speed_cb(data:any):void
    {

        GameEvent.watcher.dispatchEvent(new GameEvent(GameEvent.RES_CHANGE, false, false, new ResChange(0, -data.money, 0)));

        this.speedBuilding.assistLogic.speed_cb();

        this.speedBuilding.data.product.endDate = GTimer.getInstance().serverTime * 1000;
        this.speedBuilding.data.product.status = MapConst.FARM_RIPE;

        this.speedBuilding = null;
    }

    //================================================================================
    private static _instance:FarmController;

    public static getInstance():FarmController
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new FarmController();
        }
        return this._instance;
    }
}