/**
 * on 2014-12-23
 * by leo
 */

class FarmModel
{
    public static itemList:Array<FarmModel> = [];

    public buildingId:number;
    public itemId:number;
    public num:number;
    public time:number;//s
    public needItemArr:string[];
    public imgArr:string[];
    public stateTime:string[];

    public constructor(data:any)
    {
        this.buildingId = data.buildingId;
        this.itemId = data.itemId;
        this.num = data.itemNum;
        this.time = data.produceTime;

        var str:string = data.needTools;
        this.needItemArr = str.split(";");
        this.needItemArr.pop();

        str = data.statusImg;
        this.imgArr = str.split(";");
        this.imgArr.pop();

        str = data.statusTime;
        this.stateTime = str.split(";");
        this.stateTime.pop();
    }

    public static init(data:any):void
    {
        var i:number;
        var mm:FarmModel;
        for(i = 0; i < data.length; i++)
        {
            mm = new FarmModel(data[i]);
            FarmModel.itemList.push(mm);
        }
    }

    public static getModelByProductId(id:number):FarmModel
    {
        var i:number;
        var one:FarmModel;
        for(i = 0; i < FarmModel.itemList.length; i++)
        {
            one = FarmModel.itemList[i];
            if(one.itemId == id)
            {
                return one;
            }
        }
        return null;
    }

    public static getModelByItemId(id:number):FarmModel
    {
        var i:number;
        var one:FarmModel;
        for(i = 0; i < FarmModel.itemList.length; i++)
        {
            one = FarmModel.itemList[i];
            if(one.itemId == id)
            {
                return one;
            }
        }
        return null;
    }


    public static getArrById(buildingId:number):any[]
    {
        var re:any[] = [];
        var one:FarmModel;
        var i:number;
        for(i = 0; i < FarmModel.itemList.length; i++)
        {
            one = FarmModel.itemList[i];
            if(one.buildingId == buildingId)
            {
                re.push(one);
            }
        }
        return re;
    }

    //包括下一个未解锁的
    public static getUnlockModels(lv:number, buildingId:number):any[]
    {
        var re:any[] = [];
        var one:FarmModel;
        var i:number;
        var two:DepotModel;
        var isGetOneLock:boolean = false;
        for(i = 0; i < FarmModel.itemList.length; i++)
        {
            one = FarmModel.itemList[i];
            two = DepotModel.getModelById(one.itemId);
            if(one.buildingId == buildingId )
            {
                if(lv >= two.unlockLv)
                {
                    re.push(one);
                }
                else
                {
                    if(!isGetOneLock)
                    {
                        re.push(one);
                        isGetOneLock = true;
                    }
                }
            }
        }
        return re;
    }
}