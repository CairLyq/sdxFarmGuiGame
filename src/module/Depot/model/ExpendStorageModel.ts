/**
 * Created by rodey on 14/12/25.
 */

class ExpendStorageModel{

    public needTool1: number = 0;
    public storeType: number = 0;
    public needTool3: number = 0;
    public storeMax: number = 0;
    public needTool2: number = 0;

    public static itemList: any[] = [];

    constructor(){}

    public setData(data?: any): void{
        this.needTool1 = data.needTool1;
        this.needTool2 = data.needTool2;
        this.needTool3 = data.needTool3;
        this.storeMax = data.storeMax;
        this.storeType = data.storeType;
    }

    public static init(data:any):void
    {
        var i: number;
        var mm:ExpendStorageModel;
        for(i = 0; i < data.length; i++)
        {
            mm = new ExpendStorageModel();
            mm.setData(data[i]);
            ExpendStorageModel.itemList.push(mm);
        }
    }

    public static getExpendListByType(type: number): any[]{

        var type: number = type || DepotController.instance.getType();
        var dataList: any[] = [];
        ([].slice.call(ExpendStorageModel.itemList)).forEach(function(item, index){
            if(type == item['storeType']){
                dataList.push(item);
            }
        });

        return dataList;
    }

    public static getNextMaxItem(type: number, current: number): any{

        var data: any[] = ExpendStorageModel.getExpendListByType(type);
        for(var i: number = 0, len: number = data.length; i < len; ++i){
            if(data[i]['storeMax'] > current ){
                return data[i];
            }
        }

    }

    public static getNextMax(type: number, current: number): number{

        var data: any[] = ExpendStorageModel.getExpendListByType(type);
        for(var i: number = 0, len: number = data.length; i < len; ++i){
            if(data[i]['storeMax'] > current ){
                return data[i]['storeMax'];
            }
        }

    }

}

