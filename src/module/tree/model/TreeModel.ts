/**
 * on 2014-12-23
 * by leo
 */

class TreeModel
{
    public static itemList:Array<TreeModel> = [];

    public buildingId:number;
    //砍伐工具的id
    public fellId:number;
    //收获物品的id
    public harvestItemId:number;
    public num1:number;
    public num2:number;
    public num3:number;
    public time:number;
    public imgArr:string[];

    public constructor(data:any)
    {
        this.buildingId = data.id;
        this.fellId = data.cutItemId;
        this.harvestItemId = data.havItemId;
        this.num1 = data.levelNum1;
        this.num2 = data.levelNum2;
        this.num3 = data.levelNum3;
        this.time = data.produceTime;

        var str:string = data.statusImg;
        this.imgArr = str.split(";");
        this.imgArr.pop();
    }

    public static init(data:any):void
    {
        var i:number;
        var mm:TreeModel;
        for(i = 0; i < data.length; i++)
        {
            mm = new TreeModel(data[i]);
            TreeModel.itemList.push(mm);
        }
    }

    public static getModelByBuildingId(id:number):TreeModel
    {
        var i:number;
        var one:TreeModel;
        for(i = 0; i < TreeModel.itemList.length; i++)
        {
            one = TreeModel.itemList[i];
            if(one.buildingId == id)
            {
                return one;
            }
        }
        return null;
    }

    public static getFellIdByBuildingId(id:number):number
    {
        var model:TreeModel = TreeModel.getModelByBuildingId(id);
        if(model)
        {
            return model.fellId;
        }
        return 0;
    }
}