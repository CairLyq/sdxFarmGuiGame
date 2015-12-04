/**
 * Created by rodey on 14/12/23.
 *
 * 物品模型
 */

class DepotModel extends GoodsModel
{

    public static itemList:any[] = [];

    constructor()
    {
        super();
    }

    public static init(data:any):void
    {
        var i:number;
        var mm:DepotModel;
        for(i = 0; i < data.length; i++)
        {
            mm = new DepotModel();
            mm.setData(data[i]);
            DepotModel.itemList.push(mm);
        }
    }

    //根据 store_type 区分存储类型（粮仓 || 货仓）

    public static getDataList(key:string, value:any):any
    {
        var key = key || 'store_type';
        var data:any[] = [];
        var i:number = 0,
            len:number = DepotModel.itemList.length;
        var item:DepotModel;
        for(; i < len; ++i)
        {
            item = DepotModel.itemList[i];
            if(item[key] == value)
            {
                data.push(item);
            }
        }
        return data;
    }
    //物品id
    //根据 物品id取得物品属性数据
    public static getGoodsById(id: number): DepotModel{

        var id: number = id;
        var item: DepotModel;
        for( var i = 0, len = DepotModel.itemList.length; i < len; ++i){
            item = DepotModel.itemList[i];
            if(item['itemId'] == id)
            {
                return item;
            }
        }

    }


    public static getGoodsList(data: any[]): any[]{
        var data: any[] = data;
        var i: number = 0, len: number = data.length;
        for( ; i < len; i++){
            var item: any = DepotModel.getGoodsById(data[i].itemId);
            if(item){
                var cdata: any = GameUtils.copyData(item, data[i]);
                data[i] = cdata;
            }
        }
        return data;
    }

    public static getModelById(id:number):DepotModel {
        var i:number = 0, len:number = DepotModel.itemList.length;
        var one:DepotModel;
        for (i = 0; i < len; ++i) {
            one = DepotModel.itemList[i];
            if (one.itemId == id) {
                return one;
            }
        }
        return null;
    }

    public static formatGoods(datas: any[]): any[]{
        var data: any[] = datas;
        var i: number = 0,
            len: number = data.length;
        for( ; i < len; ++i){
            var model: DepotModel = DepotModel.getGoodsById(data[i]['itemId']);
            var cdata: any = GameUtils.copyData(model, data[i]);
            data[i] = cdata;
        }
        return data;
    }

    public static getDiamond(itemId: number, poor?: number): number{

        var item: DepotModel = DepotModel.getModelById(itemId);

        if(!poor){
            return item.diamond;
        }else{
            return item.diamond * poor;
        }

    }
}
