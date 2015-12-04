/**
 * Created by rodey on 14/12/27.
 *
 * 生产建筑 配置模型
 */

class ProductionModel{

    private static _instance: ProductionModel;
    public static getInstance(): ProductionModel{
        if(!ProductionModel._instance){
            ProductionModel._instance = new ProductionModel();
        }
        return ProductionModel._instance;
    }

    public static itemList:any[] = [];

    private itemNum: number;
    private needTools: string;
    private statusImg: any[];
    private itemId: number;
    private produceTime: number;
    private statusTime: any[];
    private buildingId: number;
    //private needToolsList: any[];

    constructor(){
        this.itemId = 0;
        this.itemNum = 0;
        this.needTools = '';
        this.produceTime = 0;
        this.statusImg = [];
        this.statusTime = [];
        this.buildingId = 0;
        //this.needToolsList = [];
    }

    public static init(data: any): void{
        var i: number = 0,
            len: number = data.length,
            item: ProductionModel;
        for(; i < len; ++i){
            item = new ProductionModel();
            item.setData(data[i]);
            ProductionModel.itemList.push(item);
        }
    }

    public setData(data: any): void{
        this.buildingId = data.buildingId;
        this.statusTime = GameUtils.getListBySpace(data.statusTime, /\s*;\s*/i);
        this.statusImg = GameUtils.getListBySpace(data.statusImg, /\s*;\s*/i);
        this.produceTime = data.produceTime;
        this.needTools = data.needTools;
        this.itemNum = data.itemNum;
        this.itemId = data.itemId;
        //this.needToolsList = ProductionModel.getNeedToolsList(data.needTools);
    }

    /**
     * 根据ID获取可生产的物品
     * @param id
     * @returns {any[]}
     */
    public static getProductsById(id: number): any[]{
        var dataList: any[] = [];
        var i: number = 0,
            len: number = ProductionModel.itemList.length;
        var item: any = {};
        for(; i < len; ++i){
            item = GameUtils.copyData(ProductionModel.itemList[i]);
            if(id == item['buildingId']){

                //可生产的物品
                var goods: DepotModel = DepotModel.getGoodsById(item['itemId']);

                    item['item'] = GameUtils.copyData(goods);
                    item['imgId'] = goods['imgId'];
                    item['name'] = goods['name'];
                    item['message'] = goods['desc'];
                    item['needList'] = ProductionModel.getNeedToolsList(item['needTools']);
                    item['speedDiamod'] = SpeedModel.getSpeed(item['produceTime']);
                    dataList.push(item);

            }
        }
        return dataList;
    }

    public static getProductsByIdAsUnlockLevel(id: number): any[]{
        var data: any[] = ProductionModel.getProductsById(id);
        var i: number = 0,
            len: number = data.length,
            rs: any[] = [];

        for( ; i < len; ++i ){
            if(data[i].item.unlockLv <= UserController.instance.level){

                rs.push(data[i]);

            }else{

                rs.push(data[i]);
                break;

            }
        }

        return rs;
    }

    public static getItemsById(id: number): any[]{
        var dataList: any[] = [];
        var i: number = 0,
            len: number = ProductionModel.itemList.length;
        for(; i < len; ++i){
            var item: ProductionModel = ProductionModel.itemList[i];
            if(id == item['buildingId']){
                var goods: any = GameUtils.copyData(DepotModel.getGoodsById(item['itemId']));
                dataList.push(goods);
            }
        }
        return dataList;
    }

    public static getProductItemByItemId(buildingId: number, itemId: number): any{

        var datas: any[] = ProductionModel.getProductsById(buildingId);
        var i: number = 0, len: number = datas.length;

        for( ; i < len; ++i){
            if(itemId == datas[i]['item'].itemId){
                return datas[i];
            }
        }

        return null;

    }

    /**
     * 根据字符串获取生产物品所需要的物品原料
     * @param value  '3005*2;3006*1;202*1;1302*1;'
     */
    public static getNeedToolsList(value: string): any[]{
        if(!value || '' === value) return;
        var str: string = value;
        var groups: any[] = str.split(/\s*;\s*/gi);
        var dataList: any[] = [];
        if(groups && groups.length){
            groups.pop();
            var i: number = 0;
            var len: number = groups.length;
            for(; i < len; ++i){
               var item: any = ProductionModel.getNeedTools(groups[i]);
                dataList.push(item);
            }
        }

        return dataList;
    }

    /**
     * 根据字符串获取原料和原料数量
     * @param value  '3005*2'
     */
    public static getNeedTools(value: string): any{
        if(!value || '' === value) return;
        var str: string = value;
        var tool: any[] = str.split(/\s*\*\s*/gi);
        var data: any = {};
        if(tool && tool.length){
            var goods: any = DepotController.instance.searchLocalDataAsItemId(tool[0]);
            if(!goods){
                goods = GameUtils.copyData(DepotModel.getGoodsById(tool[0]));
                goods['itemNum'] = 0;
            }
            data['needItem'] = goods || null;
            data['needNum'] = parseInt(tool[1] || 0);
        }
        return data;
    }

}


