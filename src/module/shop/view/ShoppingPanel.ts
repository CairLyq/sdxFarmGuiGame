/**
 * Created by rodey on 14/12/5.
 *
 * 商店
 */

module game{

    export class ShoppingPanel extends egret.gui.SkinnableComponent implements IPanel
    {

        //追加一个tab内容容器的Scroller
        public scrollerDisplay: egret.gui.Scroller;
        public dataGroup: egret.gui.DataGroup;
        //追加 按钮
        public closeButton: egret.gui.UIAsset;

        //追加一个 tab内容容器的数组
        private _dataArray: egret.gui.ArrayCollection;

        //获取后台数据
        private _data_contents: any[] = [
            { name: '养殖', imgId: 'ZY_gengzhong', title: 'ZY_07', panel: PanelName.SHOP_CATE_PANEL, buyable: 1 }, //动物相关
            { name: '生产', imgId: 'ZY_zuofang', title: 'ZY_02', panel: PanelName.SHOP_CATE_PANEL, buyable: 2 },
            { name: '种植', imgId: 'ZY_zhognzhiwu', title: 'ZY_03', panel: PanelName.SHOP_CATE_PANEL, buyable: 3 },
            { name: '装饰', imgId: 'ZY_zuangshiwu', title: 'ZY_04', panel: PanelName.SHOP_CATE_PANEL, buyable: 5 },
            { name: '金币', imgId: 'ZY_jinbi', title: 'ZY_05', panel: PanelName.BUY_JB_PANEL, buyable: null },
            { name: '钻石', imgId: 'ZY_zuangsi', title: 'ZY_06', panel: PanelName.BUY_ZS_PANEL, buyable: null }
        ];

        constructor(){
            super();
            this.skinName = skins.uicompenet.Shopping.ShoppingPanelSkin;

            this._dataArray = new egret.gui.ArrayCollection(this._data_contents);
        }

        /**
         * 获取配置数据
         * @type {egret.gui.ArrayCollection}
         * @private
         */
        private initModel(): void
        {

            this._dataArray = new egret.gui.ArrayCollection(this._data_contents);

            if(this.dataGroup) {
                this.dataGroup.dataProvider = this._dataArray;
                this.createListItem();
            }

        }


        public onShow( ...args: any[] ):void
        {
            //this.initModel();

            this.onUpdate();

        }
        public onClose( ...args: any[] ):void
        {
        }
        public onUpdate( ...args: any[] ):void
        {

            //更新数据
            var elementLen: number = this.dataGroup.numElements;
            if(elementLen > 0){
                for( var i: number = 0; i < elementLen; ++i ){
                    var element: any = this.dataGroup.getElementAt(i);
                    if(element){
                        element.dataChanged();
                    }
                }
            }

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

        public childrenCreated():void
        {
            super.createChildren();
        }

        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            var self = this;

            if(this.closeButton)
            {
                //======关闭窗口
                this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function(evt: egret.TouchEvent){
                    var target: egret.gui.UIAsset = evt.currentTarget || evt.target;
                    TweenIt.tweenBigThenNormal(target, function(){
                        UIMgr.instance.closeCurrentPanel();
                    });
                }, this);

            }else if(instance == this.scrollerDisplay){
                this.scrollerDisplay.verticalScrollPolicy = egret.gui.ScrollPolicy.OFF;

            }else if(instance == this.dataGroup){

                //初始化DataGroup数据组建
                this.dataGroup.dataProvider = this._dataArray;
                this.createListItem();

            }
        }

        /**
         * 创建多个item
         */
        private createListItem(): void{
            if(this._dataArray.length = 0)
                return;
            //console.log(this._dataArray);
            this.dataGroup.percentWidth = 100;
            this.dataGroup.percentHeight = 100;
            this.dataGroup.itemRenderer = new egret.gui.ClassFactory(game.ShopCateItemRender);
            this.dataGroup.itemRendererSkinName = skins.uicompenet.Shopping.ShopCateItemRenderSkin;

        }


        public getShopCate(index: number = 1): any{

            var els: number = this.dataGroup.numElements;
            if(els === 0) return null;

            for(var i: number = 0; i < els; ++i){
                if(i === index){
                    return this.dataGroup.getElementAt(i);
                }
            }
            return null;

        }


    }


}
