/**
 * Created by rodey on 14/12/31.
 */
class UserLevelModel
{

    private static _instance:UserLevelModel;

    public static getInstance():UserLevelModel
    {
        if(!UserLevelModel._instance)
        {
            UserLevelModel._instance = new UserLevelModel();
        }
        return UserLevelModel._instance;
    }

    public static itemList:Array<UserLevelModel> = [];

    public exp:number;
    public level:number;
    public expGap:number;
    public diamond:number;
    public gold:number;
    public items:string;

    //public buildingNumLimit:any[];
    public newBuildingIds:number[];

    constructor()
    {
        this.exp = 0;
        this.level = 0;
        this.expGap = 0;
        this.diamond = 0;
        this.gold = 0;
        this.items = '';

        //this.buildingNumLimit = [];
        this.newBuildingIds = [];
    }

    public static init(data:any[])
    {
        var i:number = 0,
            len:number = data.length;
        var item:UserLevelModel;
        if(data && len)
        {
            for(; i < len; ++i)
            {
                item = new UserLevelModel();
                item.setData(data[i]);
                UserLevelModel.itemList.push(item);
            }
        }

        //this.reform();
    }

    //private static reform():void
    //{
    //    var item:UserLevelModel, preItem:UserLevelModel;
    //    var i:number, j:number;
    //    var arr:string[];
    //    var one:string[];
    //    var two:any;
    //    var buildingModel:BuildingModel;
    //    for(i = 0; i < UserLevelModel.itemList.length; i++)
    //    {
    //        item = UserLevelModel.itemList[i];
    //
    //        arr = item.addBuilding.split(";");
    //        arr.pop();
    //
    //        if(i > 0)
    //        {
    //            preItem = UserLevelModel.itemList[i - 1];
    //
    //            for(j = 0; j < preItem.buildingNumLimit.length; j++)
    //            {
    //                two = GameUtils.copyData(preItem.buildingNumLimit[j])
    //                item.buildingNumLimit.push(two);
    //            }
    //        }
    //        else
    //        {
    //            for(j = 0; j < BuildingModel.itemList.length; j++)
    //            {
    //                buildingModel = BuildingModel.itemList[j];
    //                two = {"id":buildingModel.buildingId, "limit":0};
    //                item.buildingNumLimit.push(two);
    //            }
    //        }
    //
    //
    //        for(j = 0; j < arr.length; j++)
    //        {
    //            one = arr[j].split("*");
    //            this.updateBuildingNumLimit(item.buildingNumLimit, one);
    //        }
    //        //console.log("==========================", item.buildingNumLimit);
    //    }
    //}
    //
    //private static updateBuildingNumLimit(arr:any[], data:string[]):void
    //{
    //    var i:number;
    //    var one:any;
    //    for(i = 0; i < arr.length; i++)
    //    {
    //        one = arr[i];
    //        if(one.id == Number(data[0]))
    //        {
    //            one.limit += Number(data[1]);
    //            return;
    //        }
    //    }
    //
    //    arr.push({"id":Number(data[0]), "limit":Number(data[1])});
    //
    //}

    private setData(data:any)
    {
        this.exp = data.exp;
        this.expGap = data.expGap;
        this.level = data.level;
        this.diamond = data.diamond;
        this.gold = data.gold;
        this.items = data.items;

        var tmp:string[] = String(data.addBuilding).split(";");
        tmp.pop();

        this.newBuildingIds = tmp.map(Number);
    }

    /*private toNumber(str): number{
        return Number(str);
    }*/

    /**
     * 根据当前等级获取经验值
     * @param level
     * @returns {*}
     */
    public static getExpGap(level:number):number
    {
        var i:number = 0, len:number = UserLevelModel.itemList.length;
        for(; i < len; ++i)
        {
            if(UserLevelModel.itemList[i]['level'] == level)
            {
                return UserLevelModel.itemList[i]['expGap'];
            }
        }
        return 0;
    }

    public static getModelByLevel(level:number):UserLevelModel
    {
        var i:number = 0, len:number = UserLevelModel.itemList.length;
        var item:UserLevelModel;
        for(; i < len; ++i)
        {
            item = UserLevelModel.itemList[i];
            if(item['level'] == level)
            {
                return item;
            }
        }
        return null;
    }

    public static getModelByExp(exp: number): UserLevelModel{
        var i: number = 0, len: number = UserLevelModel.itemList.length;
        var item: UserLevelModel;
        for( ; i < len; ++i){
            item = UserLevelModel.itemList[i];
            if(item.exp >= exp){
                return item;
            }
        }
        return null;
    }

    //public static getBuildingLimit(lv:number, id:number):number
    //{
    //    var arr:any[] = this.itemList[lv - 1].buildingNumLimit;
    //    var one:any;
    //    var i:number;
    //    for(i = 0; i < this.itemList.length; i++)
    //    {
    //        one = arr[i];
    //        if(id == one.id)
    //        {
    //            return one.limit;
    //        }
    //    }
    //    return 0;
    //}


    //从本地取出新解锁的标识

    public static getItemNews(): any{
        var newItems: string = egret.localStorage.getItem(Global.NEW_ITEMS);
        try{
            newItems = JSON.parse(newItems);
        }catch (e){}

        return newItems;
    }

    public static getItemNewsNumber():number
    {
        var newItems: any = UserLevelModel.getItemNews();

        if(newItems && newItems.length && newItems.length > 0){
            return newItems.length;
        }

        return 0;
    }



}
