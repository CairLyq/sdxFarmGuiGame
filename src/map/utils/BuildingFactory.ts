/**
 * on 2014-12-23
 * by leo
 */
class BuildingFactory
{
    public static generate(pos:Point3D, data:any):BuildingIso
    {
        var re:BuildingIso;
        if(BuildingID.TYPE_FARM == data.type)
        {
            re = new FarmBuilding(pos, data);
        }
        else if(BuildingID.TYPE_TREE == data.type)
        {
            re = new TreeBuilding(pos, data);
        }
        else if( BuildingID.TYPE_DECO == data.type )
        {
            //装饰
            re = new DecoBuilding( pos, data );
        }
        else if(BuildingQuick.isProcessFactory(data.type))
        {
            //加工厂类
            re = new ProcessFactoryBuilding(pos, data);
        }
        else if(BuildingQuick.isDepot(data.buildingId))
        {
            //仓库
            re = new DepotBuilding(pos, data);
        }
        else if(BuildingQuick.isMerchantPerson(data.buildingId))
        {
            //旅行商人
            re = new MerchantPersonBuilding(pos, data);
        }
        else if( BuildingID.ORDER_BOARD == data.buildingId )
        {//订单面板
            re = new OrderBuilding(pos, data);
        }
        else if( BuildingID.MINE == data.buildingId )
        {//矿井
            re = new view.MineBuilding( pos, data );
        }
        else if( BuildingID.ACHIEVEMENT == data.buildingId )
        {//成就屋
            re = new view.AchievementBuilding( pos, data );
        }
        else if( BuildingID.AIRSHIP == data.buildingId )
        {//飞空艇
            re = new view.AirshipBuilding( pos, data );
        }
        else if( BuildingID.AIRSHIP_WAIT == data.buildingId )
        {//飞空艇码头
            re = new view.AirshipWaitBuilding( pos, data );
        }
        else
        {
            re = new BuildingIso(pos, data);
        }
        return re;
    }
}