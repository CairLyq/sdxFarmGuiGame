/**
 * Created by rodey on 15/4/24.
 */


class WeekBonusModel{

    public id: number;
    public item: any;
    public gold: number;
    public diamond: number;

    public static itemList:Array<WeekBonusModel> = [];

    constructor(data: any){

        this.id = data.id;
        this.item = this.getItem(data.item);
        this.gold = data.gold;
        this.diamond = data.diamond;

    }

    public static init(data:any):void
    {
        var i:number;
        var mm:WeekBonusModel;
        for(i = 0; i < data.length; i++)
        {
            mm = new WeekBonusModel(data[i]);
            WeekBonusModel.itemList.push(mm);
        }
    }

    private getItem(item: string): any{

        var iar: string[] = item.split(';');
        iar.pop();
        var arr: string[] = iar[0].split('*');

        var itemId: number = Number(arr[0] || 0);
        var itemNum: number = Number(arr[1] || 0);
        var imgId: string = DepotModel.getModelById(itemId).imgId;

        return { itemId: itemId, itemNum: itemNum, imgId: imgId };

    }

    public static getModelById(id: number): WeekBonusModel{
        var i:number;
        var one:WeekBonusModel;
        for(i = 0; i < WeekBonusModel.itemList.length; i++)
        {
            one = WeekBonusModel.itemList[i];
            if( one.id == id )
            {
                return one;
            }
        }
        return null;
    }


}
