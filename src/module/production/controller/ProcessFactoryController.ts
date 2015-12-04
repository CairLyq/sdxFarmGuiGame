/**
 * Created by rodey on 14/12/29.
 * 加工厂
 *
 */
class ProcessFactoryController{

    private _buildingId: number;
    private _userBuildingId: number;
    //是否完成
    public isHarvest: boolean = false;
    //存储当前生产进度缓存
    public doingTimeCahce: any[];

    public logic: ProcessFactoryLogic;
    public building: ProcessFactoryBuilding;

    //当前建筑数据
    public _data: any;
    public dataObject: any = {
        /*title: '生产建筑',
        message: '茄子，别称"茄"，是为数不多的紫色蔬菜之一，也是餐桌上十分常见的家常菜。浙江人称为落苏......',*/
        data: {
            buildingId: null,
            extendDiamod: 6,
            upperLimit: 0,
            //可生产的
            products: [
                //{ imgId: '2_06', message: '天下之大，无奇不有2', number: 10 }
            ],
            //正在生产的
            doingProduct: {  },
            //等待生产的
            waitProduct: [
                //{ imgId: '2_06', message: 'Wait ... 天下之大，无奇不有1', number: 10, isWait: 1 }
            ]
        }
    };
    //Panel
    public view: game.ProductionPanel;
    private buildItem: any;
    public doingProduct: any;
    public buildProducts: any[] = [];
    public buildProductModel: any[] = [];

    constructor(){
        this.doingTimeCahce = [];

    }

    //初始化
    public init(id: number): void{
        this._buildingId = id;
        this.open(id);
    }

    public open(id: number): void{

        //加载资源
        Loader.instance.loadGroups([GroupName.PRODUCTION_GROUP, GroupName.GOODS_GROUP], ()=>{

            UIMgr.instance.show( PanelName.PRODUCTION_PANEL, { 'direction': Direction.CENTER }, this.building);

        }, this);

    }

    /**
     * 收获
     */
    //当前完成的
    public currentHarvestItem: any;
    public harvest(id: number): void{
        this._buildingId = id;

        this.granteData();
        this.isHarvest = false;

        for(var i = 0; i < this._data.products.length; ++i){

            if(this._data.products[i]['status'] == 1 || this._data.products[i]['endDate'] <= Date.now()){

                this.isHarvest = true;
                this.sendHarvest();
                this.currentHarvestItem = this._data.products[i];
                return;

            }
        }

        //如果没有可收获的
        this.init(id);

    }

    public setData(building: any): void{
        this.building = building;
        this._data = building.data;
        this._data = this.formatData(this._data);
        this._buildingId = this._data['buildingId'];
        this._userBuildingId = this._data['userBuildingId'];

        //判断对应的逻辑类
        this.logic = this.building.logic;
        //获得对应的面板
        if(!this.view){
            this.view = UIMgr.instance.getPanel(PanelName.PRODUCTION_PANEL);
        }

        //判断是否停止动画
        if(this.building.haveProducting() == false){
            this.building.stopAnimate();
        }

        this.granteData();
        //console.log('[ProcessFactory]->setData->[this._data]: ', this._data);
    }

    public formatComplateProducts(): any[]{
        var products: any[] = this._data.products;
        var i: number = 0,
            len: number = products.length,
            dataList: any[] = [],
            goods: DepotModel;
        for( ; i < len; ++i){
            if(products[i]['status'] <= 0){
                goods = DepotModel.getGoodsById(products[i]['itemId']);
                products[i]['item'] = GameUtils.copyData(goods);
                products[i]['imgId'] = goods['imgId'];
                products[i]['message'] = goods['desc'];
                products[i]['name'] = goods['name'];
                products[i]['time'] = (products[i]['endDate'] - products[i]['startDate']) * .001;
                products[i]['speedDiamod'] = SpeedModel.getSpeed(products[i]['time']);
                dataList.push(products[i]);
            }
        }

        return dataList;
    }

    public granteData(): void{
        var poor: number;
        //每次清空
        this.buildProducts = [];
        //获取当前建筑
        //---
        this._userBuildingId = this._data['userBuildingId'];
        //获取当前建筑的 可生产列表
        this.buildProductModel = ProductionModel.getProductsByIdAsUnlockLevel(this._buildingId);

        //获取当前建筑的 正在生产列表
        if(this._data.products && this._data.products.length){

            //修改收获逻辑后...
            this.buildProducts = this.formatComplateProducts();
            poor = this._data['upperLimit'] - this.buildProducts.length;

            //添加可用生产数个
            for(var i = 0; i < poor; ++i){
                this.buildProducts.push({});
            }

        }else{

            poor = this._data['upperLimit'] || this._data['limit'];
            //添加可用生产数个
            for(var i = 0; i < poor; ++i){
                this.buildProducts.push({});
            }

        }

        this.doingProduct = this.buildProducts.shift();

    }
    public setPanelData(): void{
        this.dataObject.data['products'] = this.buildProductModel;
        this.dataObject.data['doingProduct'] = this.doingProduct;
        this.dataObject.data['waitProduct'] = this.buildProducts;
        this.dataObject.data['limit'] = this._data['limit'];
        this.dataObject.data['upperLimit'] = this._data['upperLimit'];
        this.dataObject.data['buildingId'] = this._buildingId;

    }

    public setDoingProduct(product: any): void{
        //获取当前建筑的 正在生产列表
        var buildProducts: any[] = this.formatProducts(this._data.products);
        if(buildProducts && buildProducts.length > 0){
            for(var i = 0; i < buildProducts.length; ++i){
                if(product['userProductId'] == buildProducts[i]['userProductId']){
                    buildProducts[i] = this.formatProduct(product);
                    break;
                }
            }
        }
    }

    public getDoingProduct(data: any): any{
        var data: any = data || { itemId: 0 };
        var goods: DepotModel = DepotModel.getGoodsById(data['itemId']);
        data['imgId'] = data.item['imgId'];
        data['message'] = data.item['desc'];
        data['name'] = data.item['name'];
        return {};
    }

    public getComplateProduct(data?: any[]): any[]{
        var listData: any[] = data || this._data.products;
        var data: any[] = [];
        for(var i = 0; i < listData.length; ++i){
            if(listData[i]['status'] == 1 || listData[i]['endDate'] <= Date.now()){
                var item: any = this.formatProduct(listData[i]);
                data.push(item);
            }
        }
        if(data.length > 6){
            data.splice(0, 6);
        }
        return data;
    }

    /**
     * 格式化socket的buildings数据
     */
    public formatData(data: any): any{
        var i: number = 0,
            data: any = data || {},
            buildItem: BuildingModel;
        buildItem = BuildingModel.getModelById(data['buildingId']);
        //data['buildItem'] = GameUtils.copyData(buildItem);
        data['limit'] = buildItem['limit'];
        data['maxLimit'] = buildItem['upperLimit'];
        return data;
    }

    public getProduct(buildingId: number): any{
        for(var i: number = 0; i < this._data.length; ++i){
            if(buildingId == this._data['buildingId']){
                return this._data['buildingId'];
            }
        }
        return null;
    }

    /**
     * 格式化正在生产的数据
     * @param products
     * @returns {any[]}
     */
    public formatProducts(products: any[]): any[]{
        var i: number = 0,
            len: number = products.length,
            dataList: any[] = [],
            goods: DepotModel;
        for( ; i < len; ++i){
            goods = DepotModel.getGoodsById(products[i]['itemId']);
            products[i]['item'] = GameUtils.copyData(goods);
            products[i]['imgId'] = goods['imgId'];
            products[i]['message'] = goods['desc'];
            products[i]['name'] = goods['name'];
            products[i]['time'] = (products[i]['endDate'] - products[i]['startDate']) * .001;
            products[i]['speedDiamod'] = SpeedModel.getSpeed(products[i]['time']);
            dataList.push(products[i]);
        }

        return dataList;
    }

    public formatProduct(product: any): any{
        if(!product) return;
        var product: any = product;
        var goods: DepotModel = DepotModel.getGoodsById(product['itemId']);
        product['item'] = GameUtils.copyData(goods);
        product['imgId'] = goods['imgId'];
        product['message'] = goods['desc'];
        product['name'] = goods['name'];
        product['time'] = (product['endDate'] - product['startDate']) * .001;
        product['speedDiamod'] = SpeedModel.getSpeed(product['time']);
        return product;
    }

    public recomData(): any{

        this.granteData();
        this.setPanelData();
        return this.dataObject;

    }


    /*------------------添加生产----------------*/

    //当前正要添加到生产队列的对象
    public addProductingObject: any;
    //是否是 购买不足物品后 自动添加生产的
    public isAutoAddProduct: boolean = false;
    public needToolsList: any[] = [];

    public sendBuildProduce(data: any): void{

        //显示最后一份
        this.showLastTips(data, ()=>{

            //先判断用户资源情况
            var data: any = data || this.addProductingObject;
            var needPoorList: any[] = this.veridateDeport(data);
            this.needToolsList = needPoorList;
            //console.log('needPoorList: ', needPoorList);
            if(needPoorList && needPoorList.length && needPoorList.length > 0)
            {
                //这里应该显示需要的不足物品和数量
                this.showNeedPoorList(needPoorList);
                return;
            }else {

                //清理当前正要添加的对象
                this.addProductingObject = null;

                var sdata:any = {
                    "act": "Building.produce",
                    "dt": {
                        userBuildingId: this._userBuildingId,
                        itemId: data['itemId']
                    }
                };
                SocketManager.getInstance().send(JSON.stringify(sdata));
            }

        }, ()=>{
           this.view.onUpdate(this.building);
        });

    }

    //取得所需物品列表
    public veridateDeport(data: any, isFlag: boolean = true): any[]{
        var needPoor: any[] = [];
        var itemId: number = data['itemId'];
        //当前添加到生产队列中的对象 所需要的 物品资源
        //( 只能根据可生产的物品 itemId 来取得所需要的对象 )
        var needTools: any[] = this.getProductNeedTools(itemId);

        //console.log('needTools: ', needTools);
        if(!needTools && needTools.length && needTools.length == 0){ return null; }

        var i: number = 0,
            len: number = needTools.length;
        for( ; i < len; ++i){
            var needItem: any = needTools[i]['needItem'];
            var currentNum: any = DepotController.instance.getItemNumByItemId(needItem['itemId']);

            var needNum: number = needTools[i]['needNum'];
            var poor: number = currentNum - needNum;
            if(isFlag){
                if(poor < 0){
                    needPoor.push({
                        'item': needItem,
                        'itemId': needItem['itemId'],
                        'current': currentNum,
                        'needNum': needNum,
                        'poor': Math.abs(poor) //needNum
                    });
                }
            }else{
                needPoor.push({
                    'item': needItem,
                    'itemId': needItem['itemId'],
                    'current': currentNum,
                    'needNum': needNum,
                    'poor': Math.abs(poor) //needNum
                });
            }

        }
        return needPoor;
    }

    private showLastTips(data: any, okFunc?: Function, ceFunc?: Function): void{

        var needPoor: any[] = [];
        var itemId: number = data['itemId'];
        //当前添加到生产队列中的对象 所需要的 物品资源
        //( 只能根据可生产的物品 itemId 来取得所需要的对象 )
        var needTools: any[] = this.getProductNeedTools(itemId);

        if(!needTools && needTools.length == 0) { return; }

        var i:number = 0,
            len:number = needTools.length;
        for (; i < len; ++i) {
            var needItem:any = needTools[i]['needItem'];
            var currentNum:number = DepotController.instance.getItemNumByItemId(needItem['itemId']) || 0;
            if(currentNum !== 1 || needItem['type'] !== 3){
                continue;
            }
            var needNum: number = needTools[i]['needNum'];
            var poor: number = currentNum - needNum;
            needPoor.push({
                'item': needItem,
                'itemId': needItem['itemId'],
                'current': currentNum,
                'needNum': needNum,
                'poor': Math.abs(poor) //needNum
            });
        }

        ShowItemTips.instance.init(needPoor, okFunc, ceFunc, this);
        return;

    }

    //显示不足
    public showNeedPoorList(data: any[]): void{
        var self = this;

        GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_SHORTAGE_BUY, true, {
            'data': data,
            'panel': PanelName.PRODUCTION_PANEL,
            'args': { building: this.building },
            'callback': function(){
                self.autoAddProduct();
            }
        });

        return;
    }

    /**
     * 自动添加生产
     */
    public autoAddProduct(): void{
        console.log('...自动添加生产的物品...', this.addProductingObject);

        this.isAutoAddProduct = true;
        //自动添加生产
        this.sendBuildProduce(this.addProductingObject);
    }

    /**
     * 获取 生产所需物品
     * @param itemId
     * @returns {any}
     */
    public getProductNeedTools(itemId: number): any[]{
        if(!itemId) return;
        var i: number = 0,
            len: number = this.buildProductModel.length;
        for( ; i < len; ++i){
            if(this.buildProductModel[i]['itemId'] == itemId){
                return this.buildProductModel[i]['needList'];
            }
        }
    }

    //添加生产
    public addBuildProduct(data: any): void{
        //console.log(data);
        var userBuildingId: number = this._userBuildingId;
        var product: any = this.formatProduct(data['userProduct']);
        //console.log(product);

        this.needToolsList = [];

        this.building = GetBuildingUtils.getInstance().getBuilding(userBuildingId);
        this.building.data.products.push(product);

        var i: number = 0;
        //更新本地资源，消耗的资源
        var ProductObject: any = data['userProduct'];
        var needTools: any[] = this.getProductNeedTools(ProductObject['itemId']);
        //console.log('needTools: ', needTools);


        //获取当前建筑的 正在生产列表
        if(data['userProduct'] && !this.logic.cnt){
            //this.view.doingProduct = product;
            var time: number = GTimer.getInstance().serverTime - Math.floor(data['userProduct']['endDate'] * .001);
            if(time < 0)
            {

                time = Math.abs(time);
                this.logic.startCnt(time);
                this.view.createTimeBar();

                this.building.doingProduct = product;

            }
        }

        //判断是否为 购买物品后 自动添加生产的
        if(this.isAutoAddProduct == true){

            //更新仓库资源
            this.removeNeedTools(needTools);

            this.setData(this.building);
            this.init(this.building.model.buildingId);

        }else{

            this.view.onUpdate(this.building);

            //播放消耗的资源动画
            this.view.consume(needTools);
        }

        //是否播放动画
        this.building.imgMC.mcDisplay.stop();
        this.building.playAnimate();

        //播放正在生产的音效
        SoundMgr.instance.playAudio(this.building.productAudio);

        //新手引导
        if(ProductGuideController.getInstance().isInProductGuide()){
            ProductGuideController.instance.nextStep();
        }
        else if(PlasticGuideController.getInstance().isInPlasticGuide()){
            PlasticGuideController.getInstance().nextStep();
        }


    }

    public removeNeedTools(data: any[]): void{

        if(data && data.length){
            var i: number = 0;
             var count: number = data.length;
             for( ; i < count; ++i){
                 var itemId: number = data[i]['needItem']['itemId'];
                 var needNum: number = data[i]['needNum'];
                 DepotController.instance.addItemNum(itemId, -needNum);
             }
         }

    }

    public removeBuildProduct(): void{
        if(this.view && this.view.doingItemRender){
            this.view.doingItemRender.icon = null;
        }
    }

    public buyNeedToolsList(): void{

        var self = this;
        GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_SHORTAGE_BUY, true, {
            'data': this.needToolsList,
            'panel': PanelName.PRODUCTION_PANEL,
            'args':{'building': this.building},
            'callback': function(){
                self.autoAddProduct();
            }
        });

    }

    /*---------------------------------收获-----------------------------*/
    public sendHarvest(item?: any): void{

        if(item && item['itemId']){
            var productItem: any = ProductionModel.getProductItemByItemId(this._buildingId, item['itemId']);
            var productNum: number = productItem['itemNum'];
            if(DepotController.instance.isBlast(productItem['itemId'], productNum)){
                return;
            }
        }

        //console.log('sendHarvest>>>>>>>>>', Date.now());

        BuildingController.harvestProduct( this._userBuildingId );

    }

    public updateHarvest(data: any): void{
        this.isHarvest = false;

        //消除已完成的对象
        this.building.data.products.shift();
        //删除面板中的对象
        this.view.removeHarvestProduct();
        //当前的对象
        var productItem: any = this.view.currentHarvestItem;
        var itemId: number = data.item['itemId']; //productItem.data['itemId'];
        var itemNum: number = data.item['itemNum']; //productItem.data['itemNum']; //生产的数量

        //收取物品动画
        var popupItemPos:egret.Point = productItem.localPoint;
        GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE, true, new ResChange(0, 0, data['exp'], popupItemPos));
        GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_CHANGE, true, new ItemChange(itemId, itemNum, popupItemPos));

        //新手引导
        if(ProductGuideController.getInstance().isInProductGuide()){
            ProductGuideController.instance.nextStep();
        }
        else if(PlasticGuideController.getInstance().isInPlasticGuide()){
            PlasticGuideController.getInstance().nextStep();
        }

    }

    /********----------------------------生产加速---------------------------**********/
    private currentSpeedUpItem: any;
    public sendSpeedUp(item: any): void{

        //console.log('ProcessFactory-->| SpeedUp | --> ( userBuildingId ) =' + this._userBuildingId, '');
        this.currentSpeedUpItem = item.data;
        console.log('当前加速的对象：', this.currentSpeedUpItem);
        var sdata: any = {
            "act": "Building.speedUp",
            "dt": {
                "moduleType": SpeedupType.SPEEDUP_PRODUCT,
                "userBuildingId": this._userBuildingId,
                "userProductId": item.data['userProductId']
            }
        };
        SocketManager.getInstance().send(JSON.stringify(sdata));

    }

    public updateSpeedUp(data: any): void{
        var self = this;
        var data: any = data;
        if(data['money'] > 0){
            //停止计时
            this.logic.stopCnt();
            //UserController.instance.updateDiamond(-data['money']);
            //播放消费的钻石动画
            var point: egret.Point = (this.view.doingItemRender.speedButton) && (this.view.doingItemRender.speedButton.localToGlobal());
            GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE_REMOVE, true, new ResChange(0, data['money'], 0, point, { waitTime: 500 }));
            //先设置此生产的状态
            this.updateProductStatus(this.currentSpeedUpItem['userProductId']);

            //生产上移动画 --- >  计时器关闭后还会执行一次 second 函数 , 所以重复了  ?????????
            this.upDoingToComplateGroup(this.currentSpeedUpItem, this.building);

        }
    }

    public upDoingToComplateGroup(doingItem: any, building: ProcessFactoryBuilding): void{

        var self = this;

        this.view.upDoingToComplateGroup(doingItem, function(){

            //将下一个生产提上来 开始计时
            building.startData(building.data);

            //直接更新面板数据=======
            self.setData(building);

            //--判断完成的是不是当前打开面板中的物品

            self.view.onUpdate(building);

            //新手引导 (面包机)
            //if(BuildingID.BREAD_PRODUCT === self._buildingId){
            if(BuildingID.BREAD_PRODUCT === building.model.buildingId){
                ProductGuideController.instance.autoComplate();
            }
            //新手引导 (饲料机)
            else if(BuildingID.PLASTIC_PRODUCT === building.model.buildingId){
                PlasticGuideController.getInstance().autoComplate();
            }


        });
    }

    //更新生产建筑状态
    public updateProductStatus(userProductId: number, building?: ProcessFactoryBuilding): void{
        var i: number = 0,
            len: number = this._data['products'].length;

        this.building = building || GetBuildingUtils.getInstance().getBuilding(this._userBuildingId);

        if(len && len > 0){
            for( ; i < len; ++i){
                if(userProductId == this._data['products'][i]['userProductId']){
                    this._data['products'][i]['status'] = 1;
                    this._data['products'][i]['endDate'] = Date.now() - 1000;
                    this.building.data['products'][i]['status'] = 1;
                    this.building.data['products'][i]['endDate'] = Date.now() - 1000;

                    break;
                }
            }
        }

        //停止动画
        if(this.building.haveProducting() == false){
            this.building.stopAnimate();
        }

        //显示可收获标识
        if(this.building.haveComplateProduct() == true){
            this.building.createHarvestAsset();
        }

    }

    /*--------------------扩充---------------------*/
    public sendExpend(diamond?: number): void{
        //console.log('ProcessFactory-->| sendExpend | --> ( userBuildingId ) =' + this._userBuildingId, '');
        var diamond: number = diamond || this.dataObject.data.extendDiamod;
        if(!diamond || 0 == diamond) return;
        var sdata: any = {
            "act": "Building.expand",
            "dt": {
                "userBuildingId": this._userBuildingId,
                "diamond": diamond
            }
        };
        SocketManager.getInstance().send(JSON.stringify(sdata));
    }

    public updateExpend(data?: number, rc?: number): void{
        if(rc == SocketError.RC_BUILDING_NOT_EXITS){
            //建筑不存在
        }else if(rc == SocketError.RC_BUILDING_PRODUCER_OUT_LIMIT){
            //已达扩展最大上限
        }
        //更新数据
        this.updateDataLimit(this._userBuildingId);
        //更新界面
        this.view.addExtendItem(data['diamond']);
    }

    //扩充后更新本地数据
    public updateDataLimit(userBuildingId: number, num?: number): void{
        var num: number = num || 1;

        this.building.data.upperLimit += num;
        this.building.data[ 'limit' ] += num;
        this.dataObject.data.extendDiamod = (this._data.limit - 1) * 6;
    }

    private static _instance: ProcessFactoryController;
    public static getInstance(): ProcessFactoryController{
        if(!ProcessFactoryController._instance){
            ProcessFactoryController._instance = new ProcessFactoryController();
        }
        return ProcessFactoryController._instance
    }


}