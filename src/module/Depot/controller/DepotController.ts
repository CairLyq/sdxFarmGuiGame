/**
 * Created by rodey on 14/12/23.
 *  仓库
 */
class DepotController{

    private static _instance: DepotController;
    private _data: any;
    private _localData: any = {};
    private _type: number = 1;
    private view: game.DepotPanel;
    private _isOpen: boolean;
    private depotHarvest: game.DepotHarvestV2;
    private stim: any;
    private sdtime: number = 2000;
    private depotObject: any;

    public building: DepotBuilding;

    private dataObject: any = {
        "food": {
            "data": {
                "current": 0,
                "max": 0,
                "list": []
            }
        },
        "good": {
            "data": {
                "current": 0,
                "max": 0,
                "list": []
            }
        }
    };

    private types: any = {
        "storage": {
            "type": 1,
            "name": Language.getString( 3, 3 ) //粮仓
        },
        "warehouse": {
            "type": 2,
            "name": Language.getString( 3, 4 ) //货仓
        }
    };

    constructor(){

        this._isOpen = false;

        //创建收获进度对象
        //this.createDepotHarvest();

        //GameEvent.watcher.addEventListener(GameEvent.ITEM_CHANGE, this.itemChangeHandler, this);

    }

    public static get instance(): DepotController{
        if(!DepotController._instance)
            DepotController._instance = new DepotController();
        return DepotController._instance;
    }

    public init(type?: number, building?: DepotBuilding): void{
        this._type = type;
        this.building = building;
        this.getItems(type);
        this.open();
    }

    public open(data?: any): void{
        data && (this._data = data);
//        打开面板
        //加载资源
        Loader.instance.loadGroups([
            GroupName.DEPOT_GROUP,
            GroupName.GOODS_GROUP
        ], ()=>{

            UIMgr.instance.show(PanelName.DEPOT_PANEL, { 'direction': Direction.CENTER }, this.dataObject, this.building);

        }, this);

    }

    public onError(): void{
        //UIMgr.instance.show(PanelName.CONFIRM_PANEL, { "direction": Direction.CENTER });
    }

    /**
     * 获取仓库数据
     * @param type
     */
    public getItems(type?: number): void{
        //console.log(this._data);
        this.dataObject= {
            "food": {
                "data": {
                    "current": this._data.storageNum,
                    "max": this._data.storageMax,
                    "list": this._data.storage
                }
            },
            "good": {
                "data": {
                    "current": this._data.warehouseNum,
                    "max": this._data.warehouseMax,
                    "list": this._data.warehouse
                }
            }
        };

    }

    public getData(): any{
        return this._data;
    }
    public getType(): number{
        return this._type;
    }
    public setType(value: number): void{
        if(this._type == value)
            return;
        this._type = value;
    }
    public setData(value: any): void{
        /*if(this._data == value)
            return;*/
        this._data = value;

        var list: any[] = DepotModel.formatGoods([].slice.call(this._data.storage).concat(this._data.warehouse));
        //console.log('当前仓库所有物品list: ', list);

        this._localData['list'] = list;
        this._localData['warehouseNum'] = this._data.warehouseNum;
        this._localData['warehouseMax'] = this._data.wareHouseMax;
        this._localData['storageNum'] = this._data.storageNum;
        this._localData['storageMax'] = this._data.storageMax;

        //爆仓提示
        if(this.blastWarehouse()){
            return;
        }

    }

    /**
     * 爆仓提示
     */
    public blastWarehouse(): boolean{
        var title: string = Language.getString( 3, 6 ); //资源提示
        var message: string;
        //货仓
        if(this._localData.storageNum > this._localData.storageMax){
            this._type = Global.DEPOT_STORAGE;
            message = Language.getString( 3, 7 ); //粮仓快满了，是否要扩建粮仓？
            this.showBlast(title, message);
            return true;

        }else if(this._localData.warehouseNum >= this._localData.warehouseMax){
            this._type = Global.DEPOT_WAREHOUSE;
            message = Language.getString( 3, 8 ); //货仓快满了，是否要扩建货仓？
            this.showBlast(title, message);
            return true;

        }
        return false;
    }

    //------------------判断是否爆仓------

    /**
     * 判断是否爆仓
     * @param itemId 增加的itemId
     * @param num  增量
     * @returns {boolean}  true: 爆仓;  false: 不爆仓
     */
    public isBlast(itemId: number = null, num: number = 0, param?: any): boolean{
        var storeType: number;
        if(itemId){
            storeType = DepotModel.getModelById(itemId).storeType;
        }else{
            storeType = 1; //粮仓
        }

        this._type = storeType;

        var title: string = Language.getString( 3, 6 ); //资源提示
        var message: string = '';

        if(storeType == Global.DEPOT_STORAGE){
            //console.log("==========================", this._localData.storageNum);
            if(this._localData.storageNum + num > this._localData.storageMax){
                message = Language.getString( 3, 7 ); //粮仓快满了，是否要扩建粮仓？
                this.showBlast(title, message, PanelName.DEPOT_EXTEND_PANEL, param);
                return true;
            }else{
                return false;
            }
        }else if(storeType == Global.DEPOT_WAREHOUSE){
            if(this._localData.warehouseNum + num > this._localData.warehouseMax){
                message = Language.getString( 3, 8 ); //货仓快满了，是否要扩建货仓？
                this.showBlast(title, message, PanelName.DEPOT_EXTEND_PANEL, param);
                return true;
            }else{
                return false;
            }
        }

        return false;

    }

    private showBlast(title: string = '', message: string = '', panel?: number, param?: any): void{

        var params: any = param || {};
        params['direction'] = Direction.CENTER;

        //UIMgr.instance.show( PanelName.CONFIRM_PANEL, params, title, message, null, null, param );

        Confirm.instance.show(title, message, this.blastHandler, this);

        // 侦听提示面板确认按钮发送事件
        //GameEvent.watcher.addEventListener(GameEvent.CONFIRM, this.blastHandler, this);
    }

    private blastHandler(evt: egret.TouchEvent): void{
        //var target: any = evt.currentTarget || evt.target;
        //调用控制器
        //DepotExtendController.getInstance().init(this._type || target.data.type);
        DepotExtendController.getInstance().init(this._type);
    }

    //本地item详细数据
    public getLocalData(): any{
        return this._localData;
    }
    public updateLocalDataAsItem(item: any): void{
        if(!item || item['itemId']) return;
        this.updateLocalDataAsItemId(item['itemId'], item);
    }
    public updateLocalDataAsItemId(itemId: number, data: any): void{
        if(!itemId) return;
        if(!data || data == {}) return;
        var i: number = 0, len: number = this._localData.list.length;
        for( ; i < len; ++i){
            if(itemId == (this._localData.list[i])['itemId']){
                for(var key in data){
                    if(key !== 'itemId')
                        (this._localData.list[i])[key] = data[key];
                }
            }
        }
    }
    public removeLocalDataAsItemId(itemId: number): void{
        if(!item || item['itemId']) return;
        var i: number = 0, len: number = this._localData.list.length;
        for( ; i < len; ++i){
            if(itemId == (this._localData.list[i])['itemId']){
                this._localData.list[i] = null;
                delete this._localData.list[i];
                this._localData.list.splice(1, i);
            }
        }
    }
    public searchLocalDataAsItemId(itemId: number): any{
        if(!itemId) return;
        var i: number = 0, len: number = this._localData.list.length;
        for( ; i < len; ++i){
            if(itemId == (this._localData.list[i])['itemId']){
                return this._localData.list[i];
            }
        }
    }

    /**
     * 是否有足够数量的道具
     * @param itemId    道具的id
     * @param num   查看道具的数量
     * @returns {*}
     */
    public isEnoughItem( itemId: number, num:number ):boolean
    {
        var item = this.searchLocalDataAsItemId( itemId );
        if( null == item && 0 != num )
        {
            return false;
        }
        return item.itemNum >= num;
    }
    public searchLocalkDataAsType(type: number): any{
        if(!type || typeof type !== 'number') return;
        var i: number = 0, len: number = this._localData.list.length;
        var data: any[] = [];
        for( ; i < len; ++i){
            if(type == (this._localData.list[i])['storeType']){
                data.push(this._localData.list[i]);
            }
        }
        return data;
    }
    public getLocalDataTotalNum(type: number): number{
        if(!type || typeof type !== 'number') return;
        var i: number = 0, len: number = this._localData.list.length;
        var total: number = 0;
        for( ; i < len; ++i){
            if(type == (this._localData.list[i])['storeType']){
                total += (this._localData.list[i])['itemNum'];
            }
        }
        return total;
    }
    public getLocalDataMax(type: number): number{
        if(!type || typeof type !== 'number') return;
        var typeKey: string = (type == 1) ? 'storageMax' : 'warehouseMax';
        return this._localData[typeKey];
    }
    public searchLocalDataAsItem(item: any): any{
        if(!item || !item['itemId'])
            return;
        var rs: any = this.searchLocalDataAsItemId(item['itemId']);
        if(rs){
            var cdata: any = GameUtils.copyData(rs);
            return cdata;
        }else{
            return item;
        }
    }
    public getItemNumByItemId(itemId: number): number{
        var i: number = 0,
            len: number = this._localData.list.length;
        for( ; i < len; ++i){
            if(itemId == this._localData.list[i]['itemId']){
                return this._localData.list[i]['itemNum'];
            }
        }
        return 0;
    }
    public searchLocalDataAsKey(key: string): any{
        return this._localData[key];
    }
    public updateLocalItemNum(itemId: number, itemNum: number){
        if(!itemId || !itemNum) return;

        var i: number = 0, len: number = this._localData.list.length;
        var item: any = DepotModel.getGoodsById(itemId);
        //存在该对象
        var isFlag: any = GameUtils.isItemAsList(item, this._localData.list, 'itemId');
        var goods: any = {};
        if(item){
            goods = GameUtils.copyData(item);
        }

        if(isFlag){

            /*goods = this.searchLocalDataAsItemId(goods['itemId']);
             goods['itemNum'] += itemNum;
             this.updateData(goods);*/
            this.addItemNum(itemId, itemNum);

        }else{
            goods['itemNum'] = itemNum;
            this.addData(goods);
        }

        //更新仓库总数
        this.updateCurrentNum(itemNum, goods['storeType']);
    }
    public addItemNum(itemId: number, itemNum: number): void{
        var self = this;
        var dataList: any[] = this._localData.list;
        var i: number = 0, len: number = dataList.length;
        //处理本地数据
        if(dataList && len > 0){

            for(; i < len; ++i){
                var item: any = dataList[i];
                if(item['itemId'] == itemId){
                    (self._localData.list[i])['itemNum'] += itemNum;
                    if((self._localData.list[i])['itemNum'] <= 0){
                        //移除显示
                        self._localData.list.splice(i, 1);
                    }
                    break;
                }
            }

        }

    }
    public updateLocalDataMax(): void{
        var key: string = (this._type == 1) ? 'food' : 'good';
        var localKey: string = (this._type == 1) ? 'storageMax' : 'warehouseMax';
        var item: any = ExpendStorageModel.getNextMaxItem(this._type, this._localData[localKey]);
        this._localData[localKey] = item['storeMax'];
        this.dataObject[key].data.max = item['storeMax'];

        //console.log('__localData [updateLocalDataMax] = ', this._localData);
    }
    public updateLocalDataNum(num: number): void{
        if(this._type == 1){
            this._localData.storageNum = num;
        }else if(this._type == 2){
            this._localData.wareHouseMax = num;
        }
        //console.log('__localData [updateLocalDataNum] = ', this._localData);
    }
    public addData(item: any): void{
        this._localData.list.push(item);
        var type: number = item['storeType'];
        if(type == 1){
            this.dataObject.food.data.list.push(item);
        }else if(type == 2){
            this.dataObject.good.data.list.push(item);
        }
    }
    public updateData(item: any): void{

        var key: string = (item['storeType'] == 1) ? 'food' : 'good';
        var data: any = this.dataObject[key].data.list;

        for(var i = 0; i < data.length; ++i){
            if(item['itemId'] == data[i]['itemId']){
                (this.dataObject[key].data.list)[i] = item;
                break;
            }
        }

    }
    //更新当前仓库物品总数
    public updateCurrentNum(value: number, type?: number): void{
        if(isNaN(value)) return;
        var type: number = type || this._type;
        if(type == 1){

            this.dataObject.food.data.current = this.getLocalDataTotalNum(this.types.storage['type']);
            this._localData['storageNum'] = this.getLocalDataTotalNum(this.types.storage['type']);

        }else if(type == 2){

            this.dataObject.good.data.current = this.getLocalDataTotalNum(this.types.warehouse['type']);
            this._localData['warehouseNum'] = this.getLocalDataTotalNum(this.types.warehouse['type']);

        }
    }

    public getDataByCurrentType(): any[]{
        if(this._type == 1){
            return this.dataObject.food;
        }else if(this._type == 2){
            return this.dataObject.good;
        }
    }
    public getItemById(id: number, data: any[]): any{

        for(var i = 0; i < this.dataObject.food.data.list.length; ++i){
            var current: any =  this.dataObject.food.data.list[i];
            if(item['itemId'] == current[i]['itemId']){
                /*for(var key in item){
                 current[key] = item[key];
                 }*/
                current = GameUtils.copyData(item, current);
                this.dataObject.food.data.list[i] = current;
            }
        }
    }

    /**
     * 主动推送
     * @param data
     */
    public pushItem(data: any[]): void{
        if(!data || !data['items'] ||  data['items'].length == 0)
            return;
        var type: number = data['type'];
        var i: number = 0,
            len: number = data['items'].length;
        var srcPos: egret.Point = new egret.Point( Lyrs.SW * .5, Lyrs.SH * .5 );

        for( ; i < len; ++i){
            //存在该对象
            //this.updateLocalItemNum(data['items'][i]['itemId'], data['items'][i]['itemNum']);

            /*if(this.isBlast(data['items'][i]['itemId'], data['items'][i]['itemNum'])){
                break;
            }*/

            GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_CHANGE, true, new ItemChange(data['items'][i]['itemId'], data['items'][i]['itemNum'], srcPos, { isBlash: 'No', waitTime: 120 }));
        }


    }

    public isMax(): boolean{

        if(this._localData.warehouseMax >= 2000){
            return true;
        }
        else if(this._localData.storageMax >= 2000){
            return true;
        }

        return false;
    }


    //重组数据
    public recomData(type?: number): any{
        var type: number = type || this._type;

        this.dataObject.food.data.current = this.getLocalDataTotalNum(this.types.storage['type']);
        this.dataObject.good.data.current = this.getLocalDataTotalNum(this.types.warehouse['type']);
        this.dataObject.food.data.max = this.getLocalDataMax(this.types.storage['type']);
        this.dataObject.good.data.max = this.getLocalDataMax(this.types.warehouse['type']);
        this.dataObject.food.data.list = this.searchLocalkDataAsType(this.types.storage['type']);
        this.dataObject.good.data.list = this.searchLocalkDataAsType(this.types.warehouse['type']);

        return this.dataObject;

    }

}
