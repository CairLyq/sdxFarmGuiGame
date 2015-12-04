/**
 * on 2014-12-10
 * by leo
 */

class BuildingModel extends ItemIsoModel
{
    public offsetX:number = 0;
    public offsetY:number = 0;
    public imgId:string = '';


    public offsetX2:number = 0;
    public offsetY2:number = 0;
    public imgId2:string = '';

    public movable:number = 0;
    public type:number = 0;
    public flipable:number = 0;
    public upperLimit:number = 0;
    public limit:number = 0;
    public needTime:number = 0;
    public diamond:number = 0;
    public diamondAdd:number = 0;
    public name:string = "";
    public buyable:number = 0;
    public lock:string[] = null;
    public gold:number = 0;
    public goldAdd:number = 0;
    public buildingId:number = 0;
    public desc:string = "";


    public hTool:string = "";

    public animationId = '';

    //smoke
    public ifSmoke:number = 0;
    public smokeOffsetX:number = 0;
    public smokeOffsetY:number = 0;

    public exp:number = 0;
    public currentUnlockLevel: number;
    //
    public goldRecycle: number;

    public constructor(data:any)
    {
        super(data);

        this.offsetX = Number(data.offsetX);
        this.offsetX2 = Number(data.offsetX2);
        this.offsetY = Number(data.offsetY);
        this.offsetY2 = Number(data.offsetY2);
        this.imgId = data.imgId;
        this.imgId2 = data.imgId2;

        this.movable = data.movable;
        this.type = data.type;

        this.flipable = data.flipable;
        this.upperLimit = data.upperLimit;
        this.limit = data.limit;
        this.needTime = data.needTime;

        this.diamond = Number(data.diamond);
        this.diamondAdd = Number(data.diamondAdd);
        this.name = data.name;
        this.buyable = data.buyable;
        this.gold = data.gold;
        this.goldAdd = data.goldAdd;

        this.hTool = data.havTool;
        this.desc = data.desc;

        this.animationId = data.animationId;

        //smoke
        this.ifSmoke = data.ifSmoke;
        this.smokeOffsetX = data.smokeOffsetX;
        this.smokeOffsetY = data.smokeOffsetY;

        this.buildingId = data.buildingId;
        //砍伐果树的经验
        this.exp = data.exp;

        this.lock = this.splitLock(data.lock);

        var a:string[] = this.lock[0].split("*");

        this.currentUnlockLevel = Number(a[0]);

        this.goldRecycle = data.goldRecycle;

    }

    private splitLock(lock:string): string[]{
        var tmp:string = lock;
        var arr:string[];
        //lv = 1 6个
        //lv<= 50 每2级增加3个
        //lv > 50 每2级增加2个
        if("" == tmp)
        {
            arr = [];
            var lv:number;
            var num:number = 0;
            for(lv = 1; lv <= 100; lv += 2)
            {
                if(1 == lv)
                {
                    num = 6;
                }
                else
                {
                    if(lv <= 50)
                    {
                        num += 3;
                    }
                    else
                    {
                        num += 2;
                    }
                }
                arr.push(lv + "*" + num);
            }

        }
        else
        {
            arr = tmp.split(";");
            arr.pop();
        }

        return arr;
    }

    public static getGold(buildingId: number, bnum: number = null): number{

        var bm: BuildingModel = BuildingModel.getModelById(buildingId);
        var current:number;

        if(null !== bnum){
            current = bnum;
        }else{
            current = GetBuildingUtils.getInstance().getBuildingNumByBuildingId(buildingId);
        }

        var gold: number = Number( bm.gold + current * bm.goldAdd );
        return gold;

    }

    public static getDiamond(buildingId: number, bnum: number = null): number{
        var bm: BuildingModel = BuildingModel.getModelById(buildingId);
        var current:number;

        if(null !== bnum){
            current = bnum;
        }else{
            current = GetBuildingUtils.getInstance().getBuildingNumByBuildingId(buildingId);
        }

        var diamond: number = Number( bm.diamond + current * bm.diamondAdd );
        return diamond;
    }

    public static isGold(buildingId: number): boolean{
        var bm: BuildingModel = BuildingModel.getModelById(buildingId);
        if(bm.gold !== 0)
            return true;
        else
            return false;
    }

    public static isDiamond(buildingId: number): boolean{
        var bm: BuildingModel = BuildingModel.getModelById(buildingId);
        if(bm.diamond !== 0)
            return true;
        else
            return false;
    }

    //===================================================
    public static getMax(buildingId:number, lv:number):number
    {
        var mm:BuildingModel = this.getModelById(buildingId);
        var i:number;
        var one:string[];
        var max:number = 0;

        for(i = 0; i < mm.lock.length; i++)
        {
            one = mm.lock[i].split("*");
            if(lv >= Number(one[0]))
            {
                max = Number(one[1]);
            }
            else
            {
                break;
            }
        }
        return max;
    }

    public static getUnlockLevel(buildingId:number):number
    {
        var mm:BuildingModel = this.getModelById(buildingId);
        var a:string[] = String(mm.lock[0]).split("*");
        return Number(a[0]);
    }

    public static getMaxUnlockLevel(buildingId:number):number
    {
        var mm:BuildingModel = this.getModelById(buildingId);
        var a:string[] = [];
        if(mm.lock.length > 1){
            a = String(mm.lock[mm.lock.length - 1]).split("*");
        }else{
            a = String(mm.lock[0]).split("*");
        }

        return Number(a[0]);
    }


    public static getModelById( buildingId:number):BuildingModel
    {
        var i:number;
        var one:BuildingModel;
        for(i = 0; i < BuildingModel.itemList.length; i++)
        {
            one = BuildingModel.itemList[i];
            if( one.buildingId == buildingId )
            {
                return one;
            }
        }
        return null;
    }

    public static getModelByImgId(imgId:string):BuildingModel
    {
        var i:number;
        var one:BuildingModel;
        for(i = 0; i < BuildingModel.itemList.length; i++)
        {
            one = BuildingModel.itemList[i];
            if(one.imgId === String(imgId))
            {
                return one;
            }
        }
        return null;
    }

    public static getModelByBuyable(buyable:number):BuildingModel
    {
        var i:number;
        var item:BuildingModel;
        for(i = 0; i < BuildingModel.itemList.length; i++)
        {
            item = BuildingModel.itemList[i];
            if(item.buyable == buyable)
            {
                return item;
            }
        }
        return null;
    }

    public static getDataList(key:string, value:any):any
    {
        var key = key || 'id';
        var data:Array<BuildingModel> = [];
        var i:number;
        var item:BuildingModel;
        for(i = 0; i < BuildingModel.itemList.length; i++)
        {
            item = BuildingModel.itemList[i];
            //if(item[key] == value && item['type'] !== 1 && item['type'] !== 8)
            if(item[key] == value && item['type'] !== 8)
            {
                data.push(item);
            }
        }
        return data;
    }

    //动态添加字段
    public static addKey(key:string, val:any):void
    {
        var i:number = 0,
            len:number = BuildingModel.itemList.length;
        for(; i < len; ++i)
        {
            BuildingModel.itemList[i][key] = val;
        }
    }

    //===================================================
    public static init(data:any):void
    {
        var i:number;
        var mm:BuildingModel;
        for(i = 0; i < data.length; i++)
        {
            mm = new BuildingModel(data[i]);
            BuildingModel.itemList.push(mm);
        }

    }

    public static itemList:Array<BuildingModel> = [];

}