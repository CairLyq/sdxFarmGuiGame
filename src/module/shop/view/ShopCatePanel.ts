/**
 * Created by rodey on 14/12/5.
 *
 * 商店
 */

module game{

    export class ShopCatePanel extends egret.gui.SkinnableComponent implements IPanel
    {

        //追加一个tab内容容器的Scroller
        public scrollerDisplay: egret.gui.Scroller;
        public dataGroup: egret.gui.Group;
        public dataLayout: egret.gui.TileLayout;
        //追加 按钮
        public returnButton: egret.gui.UIAsset;
        public titleAsset: egret.gui.UIAsset;
        private _title: string;

        public arrowLeft: egret.gui.UIAsset;
        public arrowRight: egret.gui.UIAsset;

        public loadMoreAsset: egret.gui.UIAsset;
        private stiv: any;

        //追加一个 tab内容容器的数组
        private buyable: number = 1;
        private panel: number = PanelName.SHOPPING_PANEL;
        private data: any;
        private parentPanel: any;
        private stim: any;
        private time: number;

        //获取后台数据
        private _data_contents: any[] = [];

        constructor(){
            super();
            this.skinName = skins.uicompenet.Shopping.ShopCatePanelSkin;

            this.stim = true;
            this.time = 600;
        }

        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);

        }

        private returnPanel(evt: egret.TouchEvent): void{

            this.pageIndex = 1;

            var self = this;
            var target: egret.gui.UIAsset = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target, function(){
                UIMgr.instance.closeCurrentPanel(function(){
                    UIMgr.instance.show( self.panel, { 'direction': Direction.CENTER } );
                });
            });

        }

        /**
         * 获取配置数据
         * @type {egret.gui.ArrayCollection}
         * @private
         */
        private initModel(): void
        {

            //动画分离
            if(this.buyable === 1){
                this._data_contents = AnimalModel.itemList;
            }else{
                this._data_contents = this.levelSort(BuildingModel.getDataList('buyable', this.buyable));
            }

            if(this.dataGroup){
                //初始化DataGroup数据组建
                this.createListItem();
            }

        }

        private levelSort(data: BuildingModel[]): BuildingModel[]{

            if(this.buyable !== 5){
                return data;
            }

            var data: BuildingModel[] = data,
                i: number = 0,
                len: number = data.length;

            for( ; i < len; ++i ){
                var curLockLevel: number = BuildingModel.getUnlockLevel(data[i].buildingId);
                if(curLockLevel === data[i].currentUnlockLevel){
                    continue;
                }
                data[i].currentUnlockLevel = curLockLevel;
            }

            data.sort(function(a, b){ return a.currentUnlockLevel - b.currentUnlockLevel; });

            return data;

        }

        public isNewItem(imgId: string): boolean{

            var newItems: any = UserLevelModel.getItemNews();
            if(newItems && newItems.length && newItems.length > 0){

                for( var i: number = 0, len: number = newItems.length; i < len; ++i ){
                    if(imgId === newItems[i]){
                        return true;
                    }
                }
            }

            return false;
        }


        public onShow( ...args: any[] ):void
        {

            if(args[0]){
                this.parentPanel = args[0];
                this.data = args[0].data;
                this.buyable = this.data['buyable'];
                this.title = this.data['title'];

                if(this.buyable === 0 && !Global.SYS_BUILDING_SWITCH){
                    return;
                }

                if(this.stim){
                    this.time = 500;
                }else{
                    this.time = 100;
                }

                this.initModel();

                //新手引导
                GuideManager.getInstance().addForbiden();

                var stim: any = window.setTimeout(function(){

                    window.clearTimeout(stim);
                    UIMgr.instance.addPanelClose();

                    //新手引导 （养殖）
                    if(BreedGuideController.getInstance().isInBreedGuide()){
                        BreedGuideController.getInstance().nextStep();
                    }
                    //新手引导 （面包机）
                    else if(ProductGuideController.getInstance().isInProductGuide()){
                        ProductGuideController.getInstance().nextStep();
                    }
                    //新手引导 （饲料机）
                    else if(PlasticGuideController.getInstance().isInPlasticGuide()){
                        PlasticGuideController.getInstance().nextStep();
                    }


                    stim = null;
                    delete stim;

                }, 500);

            }

            if(this.scrollerDisplay){

                this.scrollerDisplay.verticalScrollPolicy = egret.gui.ScrollPolicy.OFF;
                this.scrollerDisplay.addEventListener(egret.gui.UIEvent.CHANGE_START, this.scrollerStart, this);

            }

        }
        public onClose( ...args: any[] ):void
        {
            this.scrollerDisplay.throwHorizontally( 0 );
            this.dataGroup.removeAllElements();
            this._data_contents = [];
            this.data = null;
            this.pageIndex = 1;
            this.pageTotal = 0;

            this.scrollerDisplay.removeEventListener(egret.gui.UIEvent.CHANGE_START, this.scrollerStart, this);
            this.scrollerDisplay.removeEventListener(egret.gui.UIEvent.CHANGING, this.scrollerMove, this);
            this.scrollerDisplay.removeEventListener(egret.gui.UIEvent.CHANGE_END, this.scrollerEnd, this);

        }
        public onUpdate( ...args: any[] ):void
        {


        }

        public get title(): string{
            return this._title;
        }
        public set title(value: string){
            if(value == this._title)
                return;
            this._title = value;
            if(this.titleAsset){
                this.titleAsset.source = value;
            }
        }

        public childrenCreated():void
        {
            super.createChildren();

            if(this.returnButton)
            {
                //======关闭窗口
                this.returnButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returnPanel, this);

            }

            if(this.scrollerDisplay){

                this.scrollerDisplay.verticalScrollPolicy = egret.gui.ScrollPolicy.OFF;
                this.scrollerDisplay.addEventListener(egret.gui.UIEvent.CHANGE_START, this.scrollerStart, this);

            }

            if(this.dataGroup){

                //初始化DataGroup数据组建
                this.createListItem();

            }
        }

        //====================拉取分页=====================
        private pageIndex: number = 1;
        private pageSize: number = 6;
        private pageTotal: number = 0;
        private startTime: number = 0;

        private scrollerStart( evt: egret.Event ): void{
            console.log('开始滚动...');
            this.scrollerDisplay.addEventListener(egret.gui.UIEvent.CHANGING, this.scrollerMove, this);
            this.scrollerDisplay.addEventListener(egret.gui.UIEvent.CHANGE_END, this.scrollerEnd, this);
            this.startTime = egret.getTimer();
        }
        private scrollerMove( evt: egret.Event ): void{
            /*console.log('滚动中...',
                this.scrollerDisplay._scroller.scrollLeft,
                this.scrollerDisplay.getMaxScrollLeft())*/

            //一定距离显示加载更多
            if(this.scrollerDisplay._scroller.scrollLeft - 30 >= this.scrollerDisplay.getMaxScrollLeft()){

                this.next();
                return;

            } else if(this.scrollerDisplay._scroller.scrollLeft + 30 <= 0){

                this.prev();
                return;

            }

        }
        private scrollerEnd( evt: egret.Event ): void{

            console.log('滚动结束...',
                this.scrollerDisplay._scroller.scrollLeft,
                this.scrollerDisplay.getMaxScrollLeft());

            this.removeEvents();

            this.hideLoadMore();

        }

        private next(): void{
            this.pageIndex++;
            if(this.pageIndex > this.pageTotal){
                this.arrowRight.visible = false;
                return;
            }
            this.showLoadMore(new egret.Point(430, 287));

            this.transition();
            this.removeEvents();

        }

        private prev(): void{
            this.pageIndex--;
            if(this.pageIndex < 1){
                this.pageIndex = 1;
                this.arrowLeft.visible = false;
                return;
            }
            this.showLoadMore(new egret.Point(45, 287));

            this.transition();
            this.removeEvents();

        }

        private removeEvents(): void{

            this.scrollerDisplay.removeEventListener(egret.gui.UIEvent.CHANGING, this.scrollerMove, this);
            //this.scrollerDisplay.removeEventListener(egret.gui.UIEvent.CHANGE_END, this.scrollerEnd, this);

        }

        private showLoadMore(point: egret.Point): void{
            var self = this;

            self.loadMoreAsset.visible = true;
            self.loadMoreAsset.x = point.x;
            self.loadMoreAsset.y = point.y;

            if(this.stiv){
                window.clearInterval(this.stiv);
            }
            this.stiv = window.setInterval(function(){
                self.loadMoreAsset.rotation += 5;
            }, 10);
        }

        private hideLoadMore(): void{
            if(this.stiv){
                window.clearInterval(this.stiv);
            }
            this.loadMoreAsset.visible = false;
            this.loadMoreAsset.x = 0;
        }

        /**
         * 创建多个item
         */
        private createListItem(): void{

            var self = this;

            if(this._data_contents.length == 0)
                return;

            this.pageTotal = Math.ceil(this._data_contents.length / this.pageSize);
            this.pageIndex = 1;

            this.transition();
            this.scrollerDisplay.viewport = this.dataGroup;

        }

        private transition(index?: number): void{

            var self = this;
            //this.scrollerDisplay.throwHorizontally(-400, 500);

            this.arrowRight.visible = true;
            this.arrowLeft.visible = true;

            //一些必需的判断
            console.log(this.pageIndex, this.pageTotal);
            if(this.pageIndex > this.pageTotal){
                this.pageIndex = this.pageTotal;
                return;
            }else if(this.pageIndex == this.pageTotal){
                this.arrowRight.visible = false;
            }

            if(this.pageIndex <= 0){
                this.pageIndex = 1;
                return;
            }else if(this.pageIndex == 1){
                this.arrowLeft.visible = false;
            }

            this.dataGroup && this.dataGroup.removeAllElements();

            var data: any[] = this.getItems(index || this.pageIndex);
            if(!data || !data.length || data.length === 0) return;

            //先渐隐前一页的
            self.removePage(function(){
                self.createPage(data);
            });

        }

        private createPage(data: any[]): void{

            var self = this;
            //console.log(data)

            var i: number = 0,
                len: number = data.length,
                item: any;

            for(; i < len; ++i){

                if(data[i].buyable == 100){
                    item = new game.ShoppingItemRenderAnimal();
                }else{
                    item = new game.ShoppingItemRender2();
                }

                item.data = data[i];
                item.alpha = 0;
                this.dataGroup.addElement(item);
                egret.Tween.get(item).wait(i * 50).to({ alpha: 1 }, i * 50 + 50);

            }

            if(this.buyable === 5){
                this.dataLayout.orientation = "rows";
            }else{

                if(data.length <= 4){
                    this.dataLayout.orientation = "rows";
                }else{
                    this.dataLayout.orientation = "columns";
                }

            }


            this.hideLoadMore();

        }

        private removePage(cb?: Function): void{

            var self = this, els: number = this.dataGroup.numElements;
            if(!this.dataGroup || els === 0 || this.pageIndex === 1){
                cb.call(this);
                return;
            }

            for( var i: number = 0; i < this.pageSize; ++i ){

                try{
                    egret.Tween.get(this.dataGroup.getElementAt(i)).wait( i * 50).to({ alpha: 0 }, i * 50 + 50);
                }catch (e){}

            }

            var stim: any = window.setTimeout(function(){
                window.clearTimeout(stim);
                cb.call(this);
                stim = null;
                delete stim;
            }, 2000);

        }

        private getItems( index?: number ): any[]{

            var currPage: number = index || this.pageIndex;
            var startIdx: number = (currPage - 1) * this.pageSize;
            var endIdx:number = startIdx + this.pageSize;

            //var data: any[] = this._data_contents.slice( startIdx, endIdx );

            //console.log(data);
            /*for(var i: number = 0; i < data.length; ++i){

                var unlockLv:number = BuildingModel.getUnlockLevel(data[i].buildingId);
                data[i]['currentUnlockLevel'] = unlockLv;
                console.log(unlockLv);

            }

            data.sort(function(a, b){
                return a['currentUnlockLevel'] - b['currentUnlockLevel'];
            });*/

            return this._data_contents.slice( startIdx, endIdx );

        }

        private throwHorizontally(): void{

            this.scrollerDisplay.throwHorizontally( 0 );

            var data: any[] = this._data_contents;
            if(!data || data.length === 0){
                return;
            }

            var index: number = 0;
            for(var i: number = 0, len: number = data.length; i < len; ++i){
                if(this.isNewItem(data[i].imgId)){
                    index = i;
                    break;
                }
            }

            if(index <= 5){
                return;
            }else{
                console.log((index / 2) * 136);
                this.scrollerDisplay.throwHorizontally( (index / 2) * 136, 200 );

            }

        }


        public getShopItem(index: number = 0): any{

            var els: number = this.dataGroup.numElements;
            if(els === 0) return null;

            for( var i: number = 0; i < els; ++i ){
                if( i === index){
                    return this.dataGroup.getElementAt(i);
                }
            }
            return null;

        }

        public getShopItemBuyBuildingId(buildingId: number = BuildingID.BREAD_PRODUCT): any{

            var els: number = this.dataGroup.numElements;
            if(els === 0) return null;

            for( var i: number = 0; i < this._data_contents.length; ++i ){
                if( buildingId === this._data_contents[i].buildingId){
                    return this.dataGroup.getElementAt(i);
                }
            }
            return null;
        }


        public getShopItemByAnimalId(animalId: number = BuildingID.ANIMAL_BIRD): any{

            var els: number = this.dataGroup.numElements;
            if(els === 0) return null;

            for( var i: number = 0; i < this._data_contents.length; ++i ){
                if( animalId === this._data_contents[i].animalId){
                    return this.dataGroup.getElementAt(i);
                }
            }
            return null;

        }


    }


}
