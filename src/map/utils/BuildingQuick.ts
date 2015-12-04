/**
 * on 2014-12-26
 * by rodey
 */

class BuildingQuick
{

    //加工厂
    public static isProcessFactory(type:number):boolean
    {
        var re:boolean = false;
        //if( BuildingID.PROCESS_FACTORY.indexOf(buildingId) > -1)
        if( MapConst.BUILDING_TYPE_PRODUCT == type)
        {
            re = true;
        }

        return re;
    }

    //仓库
    public static isDepot(buildingId:number):boolean
    {
        var re:boolean = false;
        if( BuildingID.DEPOT_ROOM.indexOf(buildingId) > -1)
        {
            re = true;
        }
        return re;
    }

    //旅行商人
    public static isMerchantPerson(buildingId:number):boolean
    {
        var re: boolean = false;
        if( BuildingID.MERCHANT_PERSON == buildingId)
        {
            re = true;
        }
        return re;
    }

    //路边摊
    public static isRoadsite(buildingId:number):boolean{
        var re: boolean = false;
        if( BuildingID.ROADSITE === buildingId ){
            re = true;
        }
        return re;
    }

}