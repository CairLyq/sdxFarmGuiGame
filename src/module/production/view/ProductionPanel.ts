/**
 * Created by rodey on 14/12/11.
 *
 * 生成建筑（加工）面板
 *
 */


module game {

    export class ProductionPanel extends egret.gui.SkinnableComponent implements IPanel
    {
        /**
         * 自定义添加容器
         */
        //添加一个倒计时器
        public timeAsset: egret.gui.UIAsset;
        public timeBar: ProductProgressTimeBar;
//        private _time: number;

        //追加一个Group容器, 主要放置文字和图文消息
        private contentGroup:egret.gui.Group;
        private titleDisplay:egret.gui.Label;
        private _title: string;
        public closeButton: egret.gui.Button;

        //左右指南
        private arrowRight: egret.gui.UIAsset;
        private arrowLeft: egret.gui.UIAsset;

        //追加一个 可生产物滚动容器
        public scrollerDisplay: egret.gui.Scroller;
        //追加一个 正在生成滚动容器
        //public waitScrollerDisplay: egret.gui.Scroller;

        //追加一个 可生产物Group
        public dataGroupDisplay: egret.gui.Group;
        //追加一个 等待生产Group
        public waitDataGroupDisplay: egret.gui.Group;
        //追加一个 生产完成列表Group
        public complateGroup: egret.gui.Group;

        //可生成物 数据
        private _dataProduct: any = [];
        //等待生产 数据
        public _waitDataProduct: any = [];
        public waitItemRenderCache: any[] = [];
        //正在生产 数据
        private _doingDataProduct: any;
        //保存当前最后一个等待生产的坐标,方便后面扩展使用
        private _waitLastPoint: egret.Point;
        public _waitLastNum: number;
        //显示可生产的详情
        private showProductInfoItem: any;
        //当前收获的我物品
        public currentHarvestItem: game.ProductComplateItemRender;

        //当前扩充所需要的 钻石数
        private _extendDiamod: number;

        private controller: ProcessFactoryController;
        private building: ProcessFactoryBuilding;
        public isOpended: boolean = false;
        public firstProduction: game.ProductionItemRender;
        private callBack: any;

        private _data: any;

        //提示框位置
        private tipTextOffsetY: number = -30;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Production.ProductionPanelSkin;

            if(!this.controller){
                this.controller = ProcessFactoryController.getInstance();
            }
            this.timeAsset = new egret.gui.UIAsset();
            this.timeAsset.x = 45;
            this.timeAsset.y = 14;

            if(egret.MainContext.instance.stage.getChildByName('showProductInfoItem')){
                this.showProductInfoItem = egret.MainContext.instance.stage.getChildByName('showProductInfoItem');
                this.showProductInfoItem.visible = false;
            }else{
                this.showProductInfoItem = new ShowProductInfo();
                this.showProductInfoItem.name = 'showProductInfoItem';
                //this.showProductInfoItem.anchorX = 0;
                this.showProductInfoItem.anchorY = 1;
                this.showProductInfoItem.x = -200;
                this.showProductInfoItem.y = -200;
                this.showProductInfoItem.visible = false;
                egret.MainContext.instance.stage.addChild(this.showProductInfoItem);
            }

        }

        private init(): void{
            this._data = null;

            this._data = this.controller.recomData();
            this.setData(this._data);

        }
        //combine server data
        private setData(data: any): void{
            var data: any = data || this._data;
            console.log('设置面板数据: ', data);
            //标题
            this.title = BuildingModel.getModelById(data.data.buildingId).name || '建筑';

            this._waitLastPoint = new egret.Point();
            //可供生产的
            this._dataProduct = data.data.products;
            //正在生产的
            this._doingDataProduct = data.data.doingProduct;
            //当前扩充所需要的钻石数
            this._extendDiamod = data.data.extendDiamod;
            //可生产的位置数据
            this._waitDataProduct = data.data.waitProduct;
            this._waitLastNum = this._waitDataProduct.length;

            //更新倒计时
            if(this._doingDataProduct && this._doingDataProduct.time > 0) {
                //如果存在 正在生产

                if(!this.timeBar){
                    this.timeBar = new ProductProgressTimeBar();
                    this.contentGroup.addElement(this.timeAsset);
                    this.timeAsset.source = this.timeBar;
                }

                this.updateTime2(this.building);
            }

            this.render();

        }

        private render(): void{

            if(this.dataGroupDisplay){
                //创建可用的生产物
                this.createItemRender(this._dataProduct);
            }
            if(this.contentGroup){
                //创建 正在生产的item
                this.createDoingProcdutionItemRender();

                //创建等待的生产物
                this.createWaitProductionItemRender(this._waitDataProduct);

            }
            if(this.complateGroup){
                //创建已经生产完成的列表
                this.createComplateProductionItemRender();
            }


        }

        //新手引导
        private guide(): void{

            if( !ProductGuideController.getInstance().isInProductGuide()
                &&
                !PlasticGuideController.getInstance().isInPlasticGuide() ){
                return;
            }

            GuideManager.getInstance().addForbiden();

            var self = this;
            var stim: any = window.setTimeout(function(){
                window.clearTimeout(stim);

                if(ProductGuideController.getInstance().isInProductGuide()){

                    if(self.building.haveProducting()){
                        ProductGuideController.getInstance().setStep(8);
                        ProductGuideController.instance.nextStep();
                    }else if(self.building.haveComplateProduct()){
                        ProductGuideController.instance.autoComplate();
                    }else{
                        ProductGuideController.instance.nextStep();
                    }

                } else if(PlasticGuideController.getInstance().isInPlasticGuide()){

                    if(self.building.haveProducting()){
                        PlasticGuideController.getInstance().setStep(8);
                        PlasticGuideController.instance.nextStep();
                    }else if(self.building.haveComplateProduct()){
                        PlasticGuideController.instance.autoComplate();
                    }else{
                        PlasticGuideController.instance.nextStep();
                    }

                }

                stim = null;
                delete stim;

            }, 800);

        }

        /**
         * @param args
         *  args[ 0 ] = building
         */
        public onShow( ...args:any[] ): void
        {

            this.width = 480;

            this.isOpended = true;
            this.building = args[0];
            if(args[1]){
                this.callBack = args[1];
            }

            this.init();

            //新手引导
            this.guide();

        }
        public onClose( ...args: any[] ):void
        {

            this.isOpended = false;
            //停止的声音
            if(this.building){
                this.building.stopAudio();
            }
            this.building = null;

            this.showProductInfoItem.x = -200;
            this.showProductInfoItem.y = -200;
            this.showProductInfoItem.visible = false;

            this.dataGroupDisplay.removeAllElements();
            this.waitDataGroupDisplay.removeAllElements();
            this.complateGroup.removeAllElements();

            if(this.extendItemRender){
                if(this.contentGroup.getChildIndex(this.extendItemRender) !== -1){
                    this.contentGroup.removeElement(this.extendItemRender);
                }
            }
            this.extendItemRender = null;

            if(this.doingItemRender){
                if(this.contentGroup.getChildIndex(this.doingItemRender) !== -1){
                    this.contentGroup.removeElement(this.doingItemRender);
                }
            }
            this.doingItemRender = null;

            if(this.timeBar){
                if(this.contentGroup.getChildIndex(this.timeAsset) !== -1){
                    this.contentGroup.removeElement(this.timeAsset);
                }
            }

            this._data = null;
            this.timeBar = null;
            //可供生产的
            this._dataProduct = null;
            //正在生产的
            this._doingDataProduct = null;
            //当前扩充所需要的钻石数
            this._extendDiamod = 0;
            //可生产的位置数据
            this._waitDataProduct = null;
            this._waitLastNum = 0;
            /**
             *  清理 添加一个 生产物品
             */
            this._emptyWaitItem = null;
            this._emptyWaitIndex = 0;
            this._isAdd = false;
            this._isDoingAdd = false;
            this._poor = 0; // 拖动间的差值

            this.callBack = null;

            //------
            this.isTapCurrentTarget = null;
            this.isTaped = false;

        }
        public onUpdate( ...args:any[] ): void
        {

            this.onClose();
            this.isOpended = true;
            this.building = args[0];
            if(args[1]){
                this.callBack = args[1];
            }
            this.init();
        }

        public get title(): string{
            return this._title;

        }
        public set title(value: string){
            if(value == this._title) return;
            this._title = value;
            if(this.titleDisplay){
                this.titleDisplay.text = value;
            }
        }

        /**
         * 获取或设置 正在生产物
         * @returns {any}
         */
        public get doingProduct(): any{
            return this._doingDataProduct;
        }
        public set doingProduct(value: any){
            if(value == this._doingDataProduct)
                return;
            this._doingDataProduct = value;
        }


        public childrenCreated():void
        {
            super.childrenCreated();
        }

        private closeHandler(evt: egret.TouchEvent){
            var target: egret.gui.UIAsset = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target, function(){
                UIMgr.instance.closeCurrentPanel();
            });
        }

        /**
         * 实现
         * @param partName
         * @param instance
         */
        public partAdded(partName: string, instance: any): void{
            super.partAdded(partName, instance);

            if(this.closeButton)
            {
                //======关闭窗口
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);

            }else if(instance == this.scrollerDisplay){
                //创建滚动
                this.scrollerDisplay.viewport = this.dataGroupDisplay;
                this.scrollerDisplay.verticalScrollPolicy = egret.gui.ScrollPolicy.OFF;

                this.scrollerDisplay.addEventListener(egret.gui.UIEvent.CHANGING, this.scrollerMove, this);
            }
            else if( instance == this.titleDisplay )
            {
                this.titleDisplay.text = this._title;
            }

        }

        private scrollerMove( evt: egret.Event ): void{
            /*console.log('滚动中...',
             this.scrollerDisplay._scroller.scrollLeft,
             this.scrollerDisplay.getMaxScrollLeft(),
             this.dataGroupDisplay.width
             )*/

            if(this.scrollerDisplay._scroller.scrollLeft >= this.scrollerDisplay.getMaxScrollLeft()){
                //隐藏右边的
                this.arrowRight && (this.arrowRight.visible = false);
            } else {
                //显示右边的
                this.arrowRight && (this.arrowRight.visible = true);
            }

            if(this.scrollerDisplay._scroller.scrollLeft <= 1){
                //隐藏左边的
                this.arrowLeft && (this.arrowLeft.visible = false);
            } else {
                //显示左边的
                this.arrowLeft && (this.arrowLeft.visible = true);
            }

        }


        /*===========@ 创建 Item Start @===========================================================*/
        /**
         * 创建对个 item（可生成物）
         * @param data
         */
        private createItemRender(data?: any[]):void{
            var data = data;
            var i: number = 0, j: number = 0;
            var len: number = data.length;
            if(data && data.length){

                //生成2行 n列的格子
                for(; i < len; ++i){
                    var item: game.ProductionItemRender = new game.ProductionItemRender();
                    item.data = data[i];
                    this.dataGroupDisplay.addElement(item);
                    item.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toStartItem, this);
                }
            }
            this.scrollerDisplay.viewport = this.dataGroupDisplay;

        }

        public getFirstProduct(): any{
            return this.dataGroupDisplay.getElementAt(0);
        }

        /**
         * 创建当前正在生产的 item
         */
        public doingItemRender: game.ProductionDoingItemRender;
        private createDoingProcdutionItemRender(): void{
            if(this.doingItemRender){
                this.contentGroup.removeElement(this.doingItemRender);
            }

            this.doingItemRender = new game.ProductionDoingItemRender();
            this.contentGroup.addElement(this.doingItemRender);
            this.doingItemRender.x = 0;
            this.doingItemRender.y = 0;

            console.log(this._doingDataProduct);

            if(this._doingDataProduct){
                this.doingItemRender.data = this._doingDataProduct;

                if(this._doingDataProduct.imgId){
                    //this.doingItemRender.cap = true;
                    this.doingItemRender.capWall(true);
                    this.doingItemRender.start();
                    this.doingItemRender.speedButton.title = '加速';
                }else{
                    //this.doingItemRender.cap = false;
                    this.doingItemRender.capWall(false);
                    this.doingItemRender.stop();
                    this.doingItemRender.speedButton.title = '添加';
                }

            }else{

                this.doingItemRender.speedButton.label = '0';
                this.doingItemRender.cap = false;
                this.doingItemRender.stop();
                this.doingItemRender.speedButton.title = '添加';

            }
            this.doingItemRender.addEventListener(GameEvent.SPEED_UP_DOING_PRODUCT, this.toSpeedDoingItem, this);

            //------点击生产
            this.doingItemRender.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toTapDoingItemRender, this);

        }

        /**
         * 点击生产 （点击即可添加生产）
         * @param evt
         */
        private toTapDoingItemRender(evt: egret.TouchEvent): void{

            if(this.doingItemRender.cap){
                //TipText.instace.play('已经有物品正在生产了，请在排队中添加');
                return;
            }

            if(!this.isTaped || !this.isTapCurrentTarget){
                //TipText.instace.play('请先选择需要生产的物品');
                TipText.instace.play( Language.getString( 3, 40 ), null, null, { offsetY:  this.tipTextOffsetY } );
                return;
            }

            if( !this._doingDataProduct.time || this._doingDataProduct.time < 0){
                this._isDoingAdd = true;
                this.doingItemRender.icon = this.isTapCurrentTarget.data.imgId;
                this.doingItemRender.cap = true;
                this.doingItemRender.start();
                //发送socket
                this.controller.sendBuildProduce(this.isTapCurrentTarget.data);

            }

        }

        public getSpeedButton(): any{
            return this.doingItemRender.speedButton;
        }

        public getDoingItemRender(): any{
            return this.doingItemRender;
        }

        /**
         * 创建一个扩充生产个数的按钮
         */
        public extendItemRender: egret.gui.Button;
        public extendIndex: number;
        private createExtendProductionItemRender(): void{
            //其余的都是扩建按钮
            var i: number = 0,
                len: number = 6 - this._waitDataProduct.length;
            var itemRender: game.ProductionExtendItemRender;
            var waitProductLen: number = this._waitDataProduct.length;

            for( ; i < len; ++i){
                itemRender = new game.ProductionExtendItemRender();

                itemRender.label = String( (this._data.data.upperLimit - 1) * 6 + i * 6 ); //当前扩充生产个数需要的钻石数
                this.waitDataGroupDisplay.addElement(itemRender);
                itemRender.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toExtendItem, this, false);

                //console.log( (this.building.data.upperLimit + i - this.building.model.limit) + this.building.data.level );
                itemRender.unLockLevel = (this.building.data.upperLimit + i - this.building.model.limit) + this.building.data.level;

                if(i > 0){
                    itemRender.alpha = .2;
                    itemRender.touchEnabled = false;

                }else{
                    itemRender.touchEnabled = true;
                    itemRender.alpha = 1;
                }
            }

        }

        /**
         * 创建等待生成的位置 item
         * @param data
         */
        private createWaitProductionItemRender(data?: any): void{
            this.waitDataGroupDisplay.removeAllElements();
            this.waitItemRenderCache = [];
            var data: any = data || this._waitDataProduct;
            var i: number =0;
            var len: number = data.length;
            var item: game.ProductionWaitItemRender;
            if(data && data.length && data.length !== 0){
                for(; i < len; ++i){
                    item = new game.ProductionWaitItemRender();
                    item.data = data[i] || {};
                    item.status = false;
                    if(data[i].imgId && '' !== data[i].imgId){
                        item.status = true;
                    }
                    //item.label = String(i + 1);
                    item.index = i + 1;
                    item.name = 'waitItem_' + i;
                    item.x = 95 * i;
                    item.y = 0;
                    this.waitDataGroupDisplay.addElement(item);
                    this.waitItemRenderCache.push(item);
                    //点击生产（为点击生产而添加）
                    item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toTapWaitingProduct, this);
                }
            }

            this._waitLastPoint.x = 95 * len;

            //创建扩建按钮列表
            this.createExtendProductionItemRender();
        }

        private toTapWaitingProduct(evt: egret.TouchEvent): void{

            //新手引导
            if(GuideManager.getInstance().isInGuide()){
                return;
            }

            if( !this._doingDataProduct.time || this._doingDataProduct.time < 0 || !this.doingItemRender.cap){
                //TipText.instace.play('请先添加到前一个生产队列中...');
                TipText.instace.play( Language.getString( 3, 46 ), null, null, { offsetY:  this.tipTextOffsetY } );
                return;
            }

            var target: game.ProductionWaitItemRender = evt.currentTarget || evt.target;
            console.log('当前被点击的排队位置： ', target);

            if(target.status && target.data && target.data.itemId){
                return;
            }

            if(!this.isTaped || !this.isTapCurrentTarget){
                //TipText.instace.play('请先选择需要添加生产的物品...', null, 2000);
                TipText.instace.play( Language.getString( 3, 46 ), null, 2000, { offsetY:  this.tipTextOffsetY } );
                return;
            }

            //即使更新状态
            target.status = false;
            target.icon = this.asset.source;
            target.cap = true;
            this.controller.sendBuildProduce(this.isTapCurrentTarget.data);

        }

        /**
         * 创建已生产完成的列表
         */
        private createComplateProductionItemRender(): void{

            this.complateGroup.removeAllElements();
            var data: any[] = this.controller.getComplateProduct();
            if(data && data.length > 0){
                var i: number = 0,
                    len: number = data.length;
                var itemRender: game.ProductComplateItemRender;
                for( ; i < len; ++i){
                    itemRender = new game.ProductComplateItemRender();
                    itemRender.data = data[i];
                    itemRender.scaleX = itemRender.scaleY = .9;
                    this.complateGroup.addElement(itemRender);
                    //itemRender.addEventListener(egret.TouchEvent.TOUCH_TAP, this.haveComplateProduct, this, false);
                    itemRender.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.haveComplateProduct, this, false);
                }
            }

            //滑动收获
            //this.complateGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toHarvestBegin, this);

            if(this.callBack && typeof this.callBack === 'function'){
                this.callBack.call(this, this.building);
            }

        }

        public getFirstComplateProduct(): any{
            if(this.complateGroup.numElements === 0){
                return;
            }
            try{
                return this.complateGroup.getElementAt(this.complateGroup.numElements - 1);
            }catch (e){}

        }

        /*===========@ 创建 Item End @===========================================================*/

        /*===========@ 收获 Item Start @===========================================================*/

        //是否是点击收获(超过生产位置)
        private isTapHarvest: boolean = false;

        private toHarvestBegin(evt: egret.TouchEvent):void{

            GameEvent.BubbEvent(evt);

            //新手引导
            if(GuideManager.getInstance().isInGuide()){
                return;
            }
            GuideManager.getInstance().addForbiden();

            if( UserController.instance.isIndulgeState2() )
            {
                AntiAddictionController.showPanel();
                return;
            }
            //爆仓提示
            if(this.blastWarehouse() == true){
                this.blastHandler();
                return;
            }

            this.complateGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toHarvestMove, this);
            this.complateGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.toHarvestEnd, this);
            /*Lyrs.STAGE.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toHarvestMove, this);
             Lyrs.STAGE.addEventListener(egret.TouchEvent.TOUCH_END, this.toHarvestEnd, this);*/
        }

        private toHarvestMove(evt: egret.TouchEvent): void{
            var target: any = evt.currentTarget || evt.target;

            if(this.complateGroup.numElements > 0){

                var childs: number = this.complateGroup.numElements;
                for(var i: number = 0; i < childs; ++i){

                    var itemRender: any = this.complateGroup.getElementAt(i);
                    if(itemRender.hitTestPoint(evt.stageX, evt.stageY, !Global.MQQ_BROWSER)){

                        if(!itemRender.isHarvest){
                            itemRender.isHarvest = true;
                            this.haveComplateProduct(null, itemRender, { x: evt.stageX, y: evt.stageY });
                        }
                        continue;
                    }

                }

            }
        }

        private toHarvestEnd(evt: egret.TouchEvent): void{

            this.complateGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toHarvestMove, this);
            this.complateGroup.removeEventListener(egret.TouchEvent.TOUCH_END, this.toHarvestEnd, this);
            /*Lyrs.STAGE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toHarvestMove, this);
             Lyrs.STAGE.removeEventListener(egret.TouchEvent.TOUCH_END, this.toHarvestEnd, this);*/

        }

        private haveComplateProduct(evt: egret.TouchEvent, itemParma?: any, parmas?: any): void{

            if( UserController.instance.isIndulgeState2() )
            {
                AntiAddictionController.showPanel();
                return;
            }

            this.isTapHarvest = true;

            //爆仓提示
            if(this.blastWarehouse() == true){
                this.blastHandler();
                return;
            }

            //播放音效
            SoundMgr.instance.playAudio(SoundName.CROP_GET);

            var target: any;
            var item: any;

            if(evt){
                target = evt.currentTarget || evt.target;
                item = target.data;
                target['localPoint'] = new egret.Point(evt.stageX, evt.stageY)
            }else{
                target = itemParma;
                item = itemParma;
                if(parmas){
                    target['localPoint'] = new egret.Point(parmas.x, parmas.y);
                }
            }
            if(!target || !target.hashCode){
                return;
            }

            //将坐标附加传递
            this.currentHarvestItem = target;
            this.controller.sendHarvest(item);
        }

        public removeHarvestProduct(): void{
            var self = this;
            var itemId: number = self.currentHarvestItem.data.itemId;
            var itemNum: number = self.currentHarvestItem.data.itemNum;
            if(this.complateGroup.getElementIndex(this.currentHarvestItem) !== -1){
                //egret.Tween.get(this.currentHarvestItem).to({ x: this.currentHarvestItem.x - 50, alpha: 0 }, 300).call(function(){

                //更新当前面板的仓库数量
                var productItems: any[] = self.dataGroupDisplay._children;
                //console.log(productItems);

                for(var i: number = 0; i < productItems.length; ++i){
                    if(productItems[i].data.itemId == itemId){
                        var item: any = self.dataGroupDisplay._children[i];
                        item.itemNum += itemNum;
                        break;
                    }
                }
                try{
                    self.complateGroup.removeElement(self.currentHarvestItem);
                }catch (e){}

                //});
            }

            if(this.building.haveComplateProduct() == false){
                this.building.removeHarvestAsset();
            }

            if( this.building.haveComplateProduct() == true
                && this.isTapHarvest == true
                && (!this.building.logic.cnt || this.building.logic.cnt <= 0) ){

                this.isTapHarvest = !this.isTapHarvest;
                //开始下一个生产
                //this.building.startProduct();
                //继续生产下一个
                this.building.startData(this.building.data);
                //刷新面板
                this.onUpdate(this.building);

            }

            if(self.dataGroupDisplay.numElements <= 0){
                this.onUpdate(this.building);
            }

        }

        //爆仓提示
        public blastWarehouse(): boolean{

            //根据仓库类型获取对样数据 (收获都是货仓)
            //货仓
            var max: number = DepotController.instance.searchLocalDataAsKey('warehouseMax');
            var current: number = DepotController.instance.searchLocalDataAsKey('warehouseNum');
            if(current + 1 > max){
                return true;
            }else{
                return false;
            }

        }

        private blastHandler(): void{
            var title: string = Language.getString( 3, 6 ); //'资源提示';
            var message: string = Language.getString( 3, 8 ); //'货仓快满了，是否要扩建该货仓？';
            /*UIMgr.instance.show( PanelName.CONFIRM_PANEL, {direction:Direction.CENTER}, title, message );
            GameEvent.watcher.addEventListener(GameEvent.CONFIRM, function(){
                //调用控制器
                DepotExtendController.getInstance().init( 2 );
            }, this);*/

            Confirm.instance.show( title, message, ()=>{
                //调用控制器
                DepotExtendController.getInstance().init( 2 );
            }, this );

        }

        /*===========@ 收获 Item End @===========================================================*/



        /*========@ 事件回调 Start @===========================================================*/

        //加速生产
        private toSpeedDoingItem(evt: egret.TouchEvent): void{
            GameEvent.BubbEvent(evt);

            //新手引导
            GuideManager.getInstance().addForbiden();

            var self = this;
            var target = evt.currentTarget || evt.target;
            if(!target || target.data === null || !target.data.userProductId)
                return;

            var diamond: number = Number(self.doingItemRender.speedButton && self.doingItemRender.speedButton.label) || 0;

            //判断当前的钻石数量
            if(!UserController.instance.isDiamondEnough(diamond)){
                return;
            }

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            if(this.controller.getComplateProduct().length >= 6){
                //TipText.instace.play('收获队列已满，请先收获物品吧！', null, 3000);
                TipText.instace.play(Language.getString( 3, 15 ), null, 3000, { offsetY:  this.tipTextOffsetY });
                return;
            }

            TweenIt.tweenBigThenNormal(this.doingItemRender.speedButton, function(){
                if(target && target.data){
                    console.log('加速正在生产的物品需要花费您' + target.data.speedDiamod + '个钻石');

                    self.controller.sendSpeedUp(target);
                }
            });

        }

        //生产完成后移动动画
        public upDoingToComplateGroup(data: any, cb?: Function): void{

            var point: egret.Point;
            var imgId: string;

            GuideManager.getInstance().addForbiden();

            //飞入动画
            if(this.doingItemRender && this.doingItemRender.iconAsset){
                point = this.doingItemRender.iconAsset.localToGlobal(this.doingItemRender.x, this.doingItemRender.y);
                imgId = this.doingItemRender.data['imgId'];
            }else{
                point = new egret.Point(69, 383);
                imgId = (data && data.imgId) || null;
            }

            var asset: egret.Bitmap = new egret.Bitmap(RES.getRes(imgId));
            Lyrs.LYRS_UI.addChild(asset);
            asset.x = point.x;
            asset.y = point.y;

            if(this.doingItemRender){
                this.contentGroup.removeElement(this.doingItemRender);
                this.doingItemRender = null;
            }

            if(this.complateGroup){
                Icon.moveTo(asset, this.complateGroup, cb, 189, 0, { alpha: 0, time: 500 });
            }

        }

        /**
         * 扩展一个 生产位置
         * @param evt
         */
        private toExtendItem(evt: egret.TouchEvent): void{

            GameEvent.BubbEvent(evt);
            var target: game.ProductionExtendItemRender = <game.ProductionExtendItemRender>(evt.currentTarget || evt.target);

            /**
             * 根据生产建筑的解锁等级来扩充
             * 后面的格子解锁的等级为 当前建筑解锁等级 + 1
             */

            console.log('当前扩充需要的解锁等级: ', target.unLockLevel);

            if(target.unLockLevel > UserController.instance.level){
                //TipText.instace.play( '达到{}等级才可解锁该格子' );
                TipText.instace.play( Language.getString( 3, 42, target.unLockLevel ), null, null, { offsetY:  this.tipTextOffsetY } );
                return;
            }

            //新手引导
            if(GuideManager.getInstance().isInGuide()){
                return;
            }
            //判断是否已开放
            if(target.alpha < 1){ return; }

            //判断当前钻石数
            if(!UserController.instance.isDiamondEnough(Number(target.label))){
                return;
            }

            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            //取出当前对象在父容器中的索引
            this.extendIndex = this.waitDataGroupDisplay.getElementIndex(target);
            this.extendItemRender = target;
            console.log('当前扩建对象在其父级的索引：', this.extendIndex);
            console.log('增加一个可生产位置需要花费您' + target.label + '个钻石');

            //请求后台，
            this.controller.sendExpend(Number(target.label));

        }

        public addExtendItem(diamond: number): void{

            var diamond: number = diamond;
            var last: string = String(this._waitLastNum + 1);
            this.extendItemRender.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toExtendItem, this, false);

            var point: egret.Point = this.extendItemRender.parent.localToGlobal(this.extendItemRender.x, this.extendItemRender.y);

            var waitItem: game.ProductionWaitItemRender = new game.ProductionWaitItemRender();
            this.waitDataGroupDisplay.removeElementAt(this.extendIndex);
            this.waitDataGroupDisplay.addElementAt(waitItem, this.extendIndex);
            waitItem.name = 'waitItem_' + last;
            waitItem.data = { imgId: null, message: '', number: 0, isWait: 0 };
            this.waitItemRenderCache.push(waitItem);

            this._waitLastPoint.x = this._waitLastPoint.x + 95;
            this._waitLastNum++;

            //显示下一个扩充按钮
            try{
                var nextExtendIR: game.ProductionExtendItemRender = <game.ProductionExtendItemRender>this.waitDataGroupDisplay.getElementAt(this.extendIndex + 1);
                if(nextExtendIR){
                    nextExtendIR.alpha = 1;
                    nextExtendIR.touchEnabled = true;
                }
            }catch (e){}

            //TipText.instace.play('第' + last + '生产位置添加成功！');
            TipText.instace.play(Language.getString( 3, 22, last ), null, null, { offsetY:  this.tipTextOffsetY });

            //钻石减少动画
            GameEvent.watcher.dispatchEventWith(GameEvent.RES_CHANGE_REMOVE, true, new ResChange(0, diamond, 0, point));

        }

        /**
         *  开始 添加一个 生产物品-----------------------------------------------------------++++++++++++++++++++
         */
        private asset: egret.gui.UIAsset;
        public _emptyWaitItem: any;
        public _emptyWaitIndex: number;
        private _start: egret.Point = new egret.Point();
        private _isAdd: boolean = false;
        private _isDoingAdd: boolean = false;
        private _poor: number = 0; // 拖动间的差值
        private currentTarget: game.ProductionItemRender;
        private currentItemRender: egret.Point;
        private spaceGap: number = -170;
        private isTaped: boolean = false; //------点击生产
        private isTapCurrentTarget: any = null;

        /**
         * 显示可生产物的详情
         * @param item
         * @param point
         */
        private showProductInfoFunc(item: any, point: egret.Point): void{

            if(!item){
                return;
            }

            var needList: any[] = this.controller.veridateDeport(item, false);

            var name: string = item.name;
            var time: number = item.produceTime;
            this.showProductInfoItem.data = needList;
            this.showProductInfoItem.name = name;
            this.showProductInfoItem.time = time;

            if(point.x + this.showProductInfoItem.width > Lyrs.SW){
                this.showProductInfoItem.x = Lyrs.SW - this.showProductInfoItem.width;
                this.showProductInfoItem.bgAsset.scaleX = -1;
            }else{
                this.showProductInfoItem.x = point.x;
                this.showProductInfoItem.bgAsset.scaleX = 1;
            }
            this.showProductInfoItem.y = point.y;
            this.showProductInfoItem.visible = true;

        }

        private toStartItem(evt: egret.TouchEvent): void{
            var self = this;
            GameEvent.BubbEvent(evt);

            //新手引导
            GuideManager.getInstance().addForbiden();

            var target: game.ProductionItemRender = evt.currentTarget || evt.target;

            this.resetProductionItemRender(target);

            //播放音效
            SoundMgr.instance.playAudio(SoundName.ITEM_SELECTED);

            //判断解锁等级
            if(UserController.instance.level < target.data.item.unlockLv){
                //TipText.instace.play('将于' + target.data.item.unlockLv + '级解锁！');
                TipText.instace.play(Language.getString( 3, 21, target.data.item.unlockLv ), null, null, { offsetY:  this.tipTextOffsetY });
                return;
            }

            if(this.controller.getComplateProduct().length >= 6){
                //TipText.instace.play('收获队列已满，请先收获物品吧！', null, 3000);
                TipText.instace.play(Language.getString( 3, 15 ), null, 3000, { offsetY:  this.tipTextOffsetY });
                return;
            }

            //新手引导
            if(ProductGuideController.getInstance().isInProductGuide()){
                ProductGuideController.getInstance().nextStep();
            }
            else if(PlasticGuideController.getInstance().isInPlasticGuide()){
                PlasticGuideController.getInstance().nextStep();
            }

            //------点击可以生产
            this.isTaped = true;
            this.isTapCurrentTarget = target;

            //显示当前详情
            this.showProductInfoFunc(target.data, new egret.Point(evt.stageX - 50, evt.stageY - 30));

            this._start.x = evt.stageX;
            this._start.y = evt.stageY;
            this._isAdd = false;

            if(!this.currentItemRender){
                this.currentItemRender = new egret.Point(evt.stageX, evt.stageY);
            }

            //放大本身
            egret.Tween.get(target.shadowAsset).to({ scaleX: 1.5, scaleY: 1.5 }, 100, egret.Ease.elasticOut);

            //为控制器 调值
            this.currentTarget = target;
            this.controller.addProductingObject = target.data;
            this.controller.isAutoAddProduct = false;

            //--
            this.asset = new egret.gui.UIAsset(target.data.itemImgId || target.data.imgId);
            this.asset.x = evt.stageX;
            this.asset.y = evt.stageY;
            this.asset.anchorX = this.asset.anchorY = .5;
            Lyrs.LYRS_UI.addChild(this.asset);

            egret.Tween.get(this.asset).to({ scaleX: 1.5, scaleY: 1.5 }, 100, egret.Ease.elasticOut).call(function(){
                self.asset.scaleX = self.asset.scaleY = 1.5;
            }, this);

            Lyrs.STAGE.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMoveItem, this);
            Lyrs.STAGE.addEventListener(egret.TouchEvent.TOUCH_END, this.toEndItem, this);

        }

        /**
         * 拖动中 添加生产序列
         * @param evt
         */
        private toMoveItem(evt: egret.TouchEvent): void{
            //优先处理
            GameEvent.BubbEvent(evt);
            this.showProductInfoItem.visible = false;

            var self = this;
            //------点击可以生产
            if(!this.isTaped){
                return;
            }
            //将被碰撞对象的当前显示左边转换为当前舞台左边
            this.asset.x = evt.stageX;
            this.asset.y = evt.stageY;

            var p: egret.Point = this.getEmptyWaitItemPoint();

            //找差值
            this._poor = evt.stageY - this._start.y;

            //如果没有任何生产队列, 则开始拖动后放入正在生产的区域中
            if(!this._doingDataProduct.time){

                //只要是向上拖动80像素
                if(this._poor < this.spaceGap && !this._isAdd){
                    console.log('已加入生产队列......');
                    if(!this._isDoingAdd) {
                        this.doingItemRender.cap = true;
                        this.doingItemRender.icon = this.asset.source;
                    }
                    //scalePre = 1.5;
                    this._isAdd = true;

                }else if(this._poor > this.spaceGap && this._isAdd){
                    console.log('已取消加入生产队列......');
                    if(!this._isDoingAdd){
                        this.doingItemRender.cap = false;
                        this.doingItemRender.icon = null;
                    }
                    this._isAdd = false;
                }
            }else{
                //只要是向上拖动80像素

                if(this._poor < this.spaceGap && !this._isAdd){
                    console.log('已加入生产队列......');
                    //即使更新状态

                    //队列判断
                    if(!this.waitItemRenderCache[this._waitLastNum - 1].data.imgId){

                        this._emptyWaitItem.status = false;
                        this._emptyWaitItem.icon = this.asset.source;
                        this._emptyWaitItem.cap = true;
                        this.waitItemRenderCache[this._emptyWaitIndex].data.imgId = this.asset.source;
                        this._isAdd = true;
                        this._poor = evt.stageY - this._start.y;

                    }else{

                        TipText.instace.play(Language.getString( 3, 16 ), null, 3000, { offsetY:  this.tipTextOffsetY });
                        this.removeListens();
                        return;
                    }

                }else if(this._poor > this.spaceGap && this._isAdd){
                    console.log('已取消加入生产队列......');
                    //取消的动作
                    this._isAdd = false;
                    var an: any;
                    var pos: number;
                    if(this._emptyWaitIndex > 0){
                        pos = this._emptyWaitIndex - 1;
                    }else{
                        pos = this.waitItemRenderCache.length - 1;
                    }
                    an = this.waitDataGroupDisplay.getElementAt(pos);
                    an.icon = null;
                    an.status = false;
                    an.cap = false;
                    this.waitItemRenderCache[pos].data.imgId = null;
                }
            }

            this.currentItemRender.x = evt.stageX;
            this.currentItemRender.y = evt.stageY;

        }

        /**
         * 停止拖动
         * @param evt
         */
        private toEndItem(evt: egret.TouchEvent): void{
            GameEvent.BubbEvent(evt);
            this.showProductInfoItem.visible = false;

            var self = this;


            if(this.waitItemRenderCache[this._waitLastNum] && this.waitItemRenderCache[this._waitLastNum].data.imgId){
                this.queueIsFull(Language.getString( 3, 16 ));
                return;
            }


            if((!this._doingDataProduct || this._doingDataProduct.length == 0) && this._isAdd){
                this._isDoingAdd = true;
                //发送socket
                if(this.currentTarget){

                    this.controller.sendBuildProduce(this.currentTarget.data);
                }

            }else if(this._isAdd){
                if(this.currentTarget){

                    this.controller.sendBuildProduce(this.currentTarget.data);
                }
            }else{
                //新手引导
                if(ProductGuideController.getInstance().isInProductGuide()){
                    ProductGuideController.getInstance().rewind();
                }
                else if(PlasticGuideController.getInstance().isInPlasticGuide()){
                    PlasticGuideController.getInstance().rewind();
                }

            }

            this.currentTarget = null;
            //this.controller.addProductingObject = null;

            //------点击生产
            //this.isTaped = false;

            this._isAdd = false;
            this.removeListens();

        }

        private removeListens(): void{
            var self = this;
            Lyrs.STAGE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMoveItem, this);
            Lyrs.STAGE.removeEventListener(egret.TouchEvent.TOUCH_END, this.toEndItem, this);
            egret.Tween.get(this.asset).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 100).call(function(){
                Lyrs.LYRS_UI.removeChild(self.asset);
            });
        }

        /**
         * 重置所选
         * @param target  ProductionItemRender
         */

        private resetProductionItemRender(pit: game.ProductionItemRender): void{

            var nums: number = this.dataGroupDisplay.numElements;
            for(var i: number = 0; i < nums; ++i){
                try{
                    var pit: game.ProductionItemRender = <game.ProductionItemRender>this.dataGroupDisplay.getElementAt(i);
                    pit.shadowAsset.width = pit.shadowAsset.height = 64;
                    pit.shadowAsset.scaleX = pit.shadowAsset.scaleY = 1;
                }catch (e){}
            }

        }


        /**
         * 播放消耗的资源动画
         */
        public consume(needTools: any[]): void{
            if(!needTools || !needTools.length || needTools.length == 0){
                return;
            }

            var point: egret.Point = this.currentItemRender;
            point.x = point.x - 50;
            point.y = point.y - 50;
            GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_CHANGE_REMOVE, true, new ItemChangeRemove(needTools, null, point));

        }


        /**
         * 获取当前空着的 生产位置
         * @returns {egret.Point}
         */
        private getEmptyWaitItemPoint(): egret.Point{
            var self = this;
            var point: egret.Point = new egret.Point();
            var index: number = 0;
            var searchItem: any;
            for(var i = 0; i < this._waitLastNum; ++i){
                if(!this.waitItemRenderCache[i].data.imgId){
                    index = i;
                    break;
                }
            }

            try{
                searchItem = self.waitDataGroupDisplay.getElementAt(index);
            }catch (e){}

            this._emptyWaitIndex = index;
            this._emptyWaitItem = searchItem;

            point = this._emptyWaitItem.localToGlobal(this._emptyWaitItem.x, this._emptyWaitItem.y);
            return point;
        }

        /*========@ 事件回调 End @===========================================================*/

        private queueIsFull(msg?: string): void{
            var self = this;

            this.currentTarget = null;
            this._isAdd = false;
            Lyrs.STAGE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMoveItem, this);
            Lyrs.STAGE.removeEventListener(egret.TouchEvent.TOUCH_END, this.toEndItem, this);
            if(this.asset){
                egret.Tween.get(this.asset).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 100).call(function(){
                    Lyrs.LYRS_UI.removeChild(self.asset);
                });
            }

            //TipText.instace.play(msg || '生产队列已满!', null, 5000);
            TipText.instace.play(msg || Language.getString( 3, 16 ), null, 5000, { offsetY:  this.tipTextOffsetY });

        }


        /**
         * 创建一个 倒计时
         * @param time
         */
        public updateTime2(building:BuildingIso)
        {
            if(building != this.building)
            {
                return;
            }
            if(this.timeBar)
            {
                this.timeBar.updateTime(this.building.logic.cnt, this._doingDataProduct.time);
                if(this.doingItemRender){
                    this.doingItemRender.speedButton.label = String(SpeedModel.getSpeed(this.building.logic.cnt));
                }
            }
        }

        public createTimeBar(): void{
            if(!this.timeBar && this._doingDataProduct){
                this.timeBar = new ProductProgressTimeBar();
                this.updateTime2(this.building);
                this.contentGroup.addElement(this.timeAsset);
                this.timeAsset.source = this.timeBar;
            }
        }

        public getBuilding(): ProcessFactoryBuilding{
            return this.building;
        }
    }

}