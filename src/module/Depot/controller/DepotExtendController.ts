/**
 * Created by rodey on 14/12/25.
 * 仓库扩建
 */

class DepotExtendController{

    private static _instance: DepotExtendController;
    private _data: any;
    public _type: number = 1;
    private expendTotal: number = 0; //扩建需要的总数
    private view: game.DepotExtendPanel;
    public building: DepotBuilding;

    private dataObject: any = {
        title: Language.getString( 3, 9 ), //仓库扩建
        message:  Language.getString( 3, 10 ) + 500,//'扩建粮仓，将储量提升到500！',
        data: {
            current: 100,
            max: 200,
            nextMax: 250,
            list: []
        }
    };

    constructor(){
        //this.view = new game.DepotPanel();
    }

    public static getInstance(): DepotExtendController{
        if(!DepotExtendController._instance)
            DepotExtendController._instance = new DepotExtendController();
        return DepotExtendController._instance;
    }


    public init(type?: number, building?: DepotBuilding): void{
        this._type = type;
        this.building = building;
        this.ganertData();

        //加载资源
        Loader.instance.loadGroups([GroupName.DEPOT_GROUP, GroupName.GOODS_GROUP], ()=>{

            this.show();

        }, this);

    }

    private show(): void{

        UIMgr.instance.closeCurrentPanel( function()
        {
            UIMgr.instance.show( PanelName.DEPOT_EXTEND_PANEL, { 'direction': Direction.CENTER } );
        });

        this.view = UIMgr.instance.getPanel(PanelName.DEPOT_EXTEND_PANEL);
    }

    private ganertData(): void{
        var itemsData: any = DepotController.instance.getLocalData();
        var nextItem: any;
        if(this._type == 1){
            nextItem = this.getNextMax(this._type, itemsData['storageMax']);
            //粮仓
            this._data = {
                "current": itemsData.storageNum,
                "max": itemsData.storageMax,
                "nextMax": nextItem['storeMax']
            };
            this.dataObject.data = {
                "current": itemsData.storageNum,
                "max": itemsData.storageMax,
                "nextMax": nextItem['storeMax'],
                "list": [
                    { itemId: 21, total: nextItem['needTool1'] },
                    { itemId: 22, total: nextItem['needTool2'] },
                    { itemId: 23, total: nextItem['needTool3'] }
                ]
            }
        }else if(this._type == 2){
            nextItem = this.getNextMax(this._type, itemsData['warehouseMax']);
            this._data = {
                "current": itemsData.warehouseNum,
                "max": itemsData.warehouseMax,
                "nextMax": nextItem['storeMax']
            };
            this.dataObject.data = {
                "current": itemsData.warehouseNum,
                "max": itemsData.warehouseMax,
                "nextMax": nextItem['storeMax'],
                "list": [
                    { itemId: 24, total: nextItem['needTool1'] },
                    { itemId: 25, total: nextItem['needTool2'] },
                    { itemId: 26, total: nextItem['needTool3'] }
                ]
            }
        }
    }

    public getNextMax(type?: number, currentMax?: number): number{
        var nextItem: any = ExpendStorageModel.getNextMaxItem(type, currentMax);
        return nextItem;
    }

    /**
     * 发送数据 （确认扩建）
     * @param type
     */
    public sendExpendData(type?: number): void{
        var type: number = type || this._type;
        var sdata: any = {
            act: 'Item.expand',
            dt: {
                type: type
            }
        };
        sdata = JSON.stringify(sdata);
        SocketManager.instance.send(sdata);
    }

    public toExpend(): void{
        //console.log('needlist: ', this.needList);
        for(var i = 0; i < this.needList.length; ++i){
            var item: any = this.needList[i];
            if(item.current < item.total){
                return;
            }
            //console.log('need current: ', item.current, 'need total: ', item.total);
        }
        //在所有需要的条件满足下, 发送
        this.sendExpendData();
    }

    //先拿模型配置数据
    public getModelData(): void{

        for(var i = 0; i < this.dataObject.data.list.length; ++i){
            var item: any = this.dataObject.data.list[i];
            var itemModel: any = DepotModel.getGoodsById(item['itemId']);
            item = GameUtils.copyData(itemModel, this.dataObject.data.list[i]);
            this.dataObject.data.list[i] = item;
        }
    }

    public updateData(data?: any[]): void{
        var self = this;

        //this.dataObject.data.list = data;
        for(var i = 0; i < this.dataObject.data.list.length; ++i){
            var item: any = this.dataObject.data.list[i];
            var localItem: any = DepotController.instance.searchLocalDataAsItem(item);
            if(!localItem.hasOwnProperty('itemNum')){
                localItem['itemNum'] = 0;
            }
            this.dataObject.data.list[i] = GameUtils.copyData(localItem, this.dataObject.data.list[i]);
        }

    }

    //结合配置数据 和 后台数据
    public recomData(): any[]{

        this.getModelData();
        this.updateData();

        return this.dataObject;
    }

    /**
     * ------------------购买物品-----------------------------
     */

    //game.DepotExtendItemRender | game.BuyGoodsItemRender
    public currentDisplayObject: any;
    public needList: any[] = [];

    public sendBuyData(itemId: number, itemNum: number): void{
        if(!itemId) return;
        var sdata: any = {
            act: 'Item.buyGoods',
            dt: {
                itemId: itemId,
                itemNum: itemNum,
                buyType: 1,
                allowBlasting: 1
            }
        };
        sdata = JSON.stringify(sdata);
        SocketManager.instance.send(sdata);
    }

    //购买资源时更新
    public updateDisplayObject(data: any): void{
        var data: any = data;

        if(this.currentDisplayObject){
            this.currentDisplayObject.current = this.currentDisplayObject.total;
            this.needList.push(this.currentDisplayObject);

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_ARROW);
        }

        //更新本地物品数据数量
        DepotController.instance.updateLocalItemNum(data['userItem']['itemId'], data['userItem']['itemNum']);

        //更新本地扩建数据
        //this.updateExpendDataObject();

        //播放消耗钻石动画-------START
        var point: egret.Point = this.view.getPoint();
        GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE_REMOVE, true, new ResChange(0, data['money'], 0, point));
        //播放消耗钻石动画-------END

        //更新面板
        this.view.onUpdate();

    }


    /**
     * --------------------一次性购买多个物品-----------------------
     */
    public sendBuyItemsData(data: any[], diamond: number): void{
        if(!data || !data.length || data.length == 0) return;

        //判断钻石是否足够
        if(!UserController.instance.isDiamondEnough(diamond)){
            return;
        }

        var items: string = '';
        for(var i: number = 0; i < data.length; ++i){

            if(i != 0){
                items += ';' + (data[i]['itemId'] + '*' + data[i]['poor']);
            }else{
                items += (data[i]['itemId'] + '*' + data[i]['poor']);
            }

        }
        var sdata: any = {
            act: 'Item.buyItems',
            dt:{
                items: items,
                buyType: 1,
                allowBlasting: 1
            }
        };
        sdata = JSON.stringify(sdata);
        SocketManager.instance.send(sdata);
    }

    public updateDisplayObjects(data: any): void{
        if(!data['userItems'] || !data['userItems'].length || data['userItems'].length == 0){
            return;
        }
        var money = data['money'];
        UserController.instance.updateDiamond(data['money']);

        var i: number = 0,
            len: number = data['userItems'].length;
        for( ; i < len; ++i){
            var item: any = data['userItems'][i];
            //更新本地物品数据数量
            DepotController.instance.updateLocalItemNum(item['itemId'], item['itemNum']);
        }
    }





    //仓库扩建成功后更新------------------
    public updateExpendDataObject(data?: any): void{
        var self = this;
        this.updateLocalData(data['reduceItems']);
        DepotController.instance.updateLocalDataMax();
        console.log('仓库扩建后： ', this.dataObject);
        //留着继续扩建面板
        // this.init(this._type);

        //成功后返回 物品列表页面
        DepotController.instance.init(this._type);

        //播放扩仓所需物品动画-----------START
        var point: egret.Point = new egret.Point(Lyrs.SW * .5, Lyrs.SH * .5 + 80);
        console.log('扩充仓库物品消耗动画.......', this.dataObject.data.list);
        console.log('扩充仓库物品消耗动画位置.......', point);
        var itemRemoves: any[] = [];
        for(var i: number = 0; i < this.dataObject.data.list.length; ++i){
            var item: any = this.dataObject.data.list[i];
            itemRemoves.push({
                itemId: item['itemId'],
                needNum: item['total']
            });
        }

        GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_CHANGE_REMOVE, true, new ItemChangeRemove(itemRemoves, null, point, {waitTime: 300, updateItems: 'No'}));
        //播放扩仓所需物品动画-----------END

        //播放粒子效果--------START
        Loader.instance.loadGroups([GroupName.UPGRADE_GROUP], ()=>{
            this.createParticle();
        }, this);
        //播放粒子效果--------END

    }

    /**
     * 更新显示列表
     */
    public updateLocalData(data?: any[]): void{
        var self = this;
        var needList: any[] = data || this.dataObject.data.list;
        var total: number = 0;
        if(needList && needList.length > 0){
            needList.forEach(function(item, index){
                total += item['itemNum'];
                (self.dataObject.data.list[index])['itemNum'] -= item['itemNum'];
                DepotController.instance.updateCurrentNum(-item['itemNum'], item['storeType']);
                DepotController.instance.updateLocalItemNum(item['itemId'], -item['itemNum']);
            });
        }

        console.log('扩建将要减少的资源：', total);

    }

    public getType(): number{
        return this._type;
    }

    public praticleSystem: particle.GravityParticleSystem;
    private createParticle():void
    {
        if( !this.praticleSystem )
        {
            this.praticleSystem = new particle.GravityParticleSystem(RES.getRes(GroupName.STAR_YELLOW_KEYS[ 0 ] ), RES.getRes(GroupName.STAR_YELLOW_KEYS[ 1 ]));
            egret.MainContext.instance.stage.addChild( this.praticleSystem );

            this.praticleSystem.visible = false;

        }
        this.praticleSystem.visible = true;
        this.praticleSystem.start(3000);
    }

}

