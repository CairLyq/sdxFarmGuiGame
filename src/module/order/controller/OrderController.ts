/**
 * on 2014-01-04
 * by Gordon
 */
class OrderController
{
    public constructor()
    {

    }

    private hasCarOrder:boolean = false;
    public getCarOrder():void
    {
        if( this.hasCarOrder )
        {
            return;
        }
        var data:Object = { "act":"Building.getCarOrder" };
        SocketManager.instance.send(JSON.stringify(data), false);
        this.hasCarOrder = true;
    }
    public completeCarOrder( id:number ):void
    {
        var data:Object = { "act":"Building.completeCarOrder", "dt":{"orderId":id} };
        SocketManager.instance.send(JSON.stringify(data), false);
    }
    public refreshCarOrder( id:number ):void
    {
        var data:Object = { "act":"Building.refreshCarOrder", "dt":{"orderId":id} };
        SocketManager.instance.send(JSON.stringify(data), false);
    }
    public abandonCarOrder( id:number ):void
    {
        var data:Object = { "act":"Building.abandonCarOrder", "dt":{"orderId":id} };
        SocketManager.instance.send(JSON.stringify(data), false);
    }

    /**
     * 收取已完成订单收获
     * @param id
     */
    public recieveCarOrderReward( id:number ):void
    {
        var data:Object = { "act":"Building.recieveCarOrderReward", "dt":{"orderId":id} };
        SocketManager.instance.send(JSON.stringify(data), false);
    }
    public updateOrderBuilding():void
    {
        var building:OrderBuilding = GetBuildingUtils.getInstance().getBuilding( OrderBuilding.OrderCarBuildingID );
        if( null == building )
        {
            return;
        }
        building.update();
    }
    public moveRecieveRewardIcon( exp:number, gold:number ):void
    {
        var building:OrderBuilding = GetBuildingUtils.getInstance().getBuilding( OrderBuilding.OrderCarBuildingID );
        if( null == building )
        {
            return;
        }
        building.recieveReward( exp, gold );

    }
    //================================================================================
    private static _instance:OrderController;

    public static get instance():OrderController
    {
        if( null == OrderController._instance )
        {
            this._instance = new OrderController();
        }
        return OrderController._instance;
    }
}