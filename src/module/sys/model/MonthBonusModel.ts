/**
 * Created by rodey on 15/4/24.
 */


class MonthBonusModel{

    public id: number;
    public item: any;
    public gold: number;
    public diamond: number;

    public static itemList:Array<MonthBonusModel> = [];

    constructor(data: any){

        this.id = data.id;
        this.item = this.getItem(data.item);
        this.gold = ('' == data.gold) ? null : data.gold;
        this.diamond = ('' == data.diamond) ? null : data.diamond;

    }

    public static init(data:any):void
    {
        var i:number;
        var mm:MonthBonusModel;
        for(i = 0; i < data.length; i++)
        {
            mm = new MonthBonusModel(data[i]);
            MonthBonusModel.itemList.push(mm);
        }
    }

    private getItem(item: string): any{

        if('' === item){
            return null;
        }
        var iar: string[] = item.split(';');
        iar.pop();
        var arr: string[] = iar[0].split('*');

        var itemId: number = Number(arr[0] || 0);
        var itemNum: number = Number(arr[1] || 0);
        var imgId: string = DepotModel.getModelById(itemId).imgId;

        return { itemId: itemId, itemNum: itemNum, imgId: imgId };

    }

    public static getModelById(id: number): MonthBonusModel{
        var i:number;
        var one:MonthBonusModel;
        for(i = 0; i < MonthBonusModel.itemList.length; i++)
        {
            one = MonthBonusModel.itemList[i];
            if( one.id == id )
            {
                return one;
            }
        }
        return null;
    }


}
