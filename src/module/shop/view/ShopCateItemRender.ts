/**
 * Created by rodey on 15/1/23.
 */

module game{

    export class ShopCateItemRender extends egret.gui.ItemRenderer{

        //追加一个 商品图
        public iconAsset:egret.gui.UIAsset;
        public newLabelButton: egret.gui.Button;

        constructor()
        {
            super();
            this.skinName = skins.uicompenet.Shopping.ShopCateItemRenderSkin;
            this.touchChildren = false;
            this.touchEnabled = true;

            /**
             * 将内容放置到地图中......
             */
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toShowPanel, this);
        }


        /**
         * 默认处理数据填充函数，
         * 覆写
         */
        public dataChanged():void{

            this.iconAsset.source = this.data.imgId;
            this.labelDisplay.text = this.data.name;

            if(this.newLabelButton){
                this.updateNewLabel(this.getNews());
            }

        }

        public getNews(): number{

            //根据当前类型进行判断 buyable
            return (this.getNewsByBuyable()).length;

        }

        public getNewsByBuyable(): any{

            var rsData: any[] = [];
            var data: any = this.data;
            var newItems: any = UserLevelModel.getItemNews();
            if(newItems && newItems.length && newItems.length > 0){

                for( var i: number = 0, len: number = newItems.length; i < len; ++i ){
                    var buildingModel: any;

                    if(data.buyable !== 1){
                        buildingModel = <BuildingModel>BuildingModel.getModelByImgId(newItems[i]);
                        if(buildingModel && data.buyable == buildingModel.buyable){
                            rsData.push(buildingModel);
                        }
                    }else{
                        buildingModel = <AnimalModel>AnimalModel.getModelByImgId(newItems[i]);
                        if(buildingModel){
                            rsData.push(buildingModel);
                        }
                    }

                }

            }

            return rsData;
        }

        public updateNewLabel(newNum: number): void{

            if(newNum > 0){
                this.newLabelButton.visible = true;
                this.newLabelButton.label = String(newNum);
            }else{
                this.newLabelButton.visible = false;
                this.newLabelButton.label = '';
            }

        }


        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
        }



        /**
         * 用户点击商品的时候，首先创建一个商品编辑状态下的显示对象实例
         * --》根据当前地图(也可以是规定初始放置位置)来放置商品到地图层
         * @param evt
         */
        private toShowPanel(evt: egret.TouchEvent): void{
            var self = this;
            GameEvent.BubbEvent(evt);

            //新手引导
            GuideManager.getInstance().addForbiden();

            var target: game.ShopCateItemRender = evt.currentTarget || evt.target;
            TweenIt.tweenBigThenNormal(target.iconAsset, function(){
                if(self.data.panel){
                    UIMgr.instance.closeCurrentPanel(function(){
                        if(self.data.panel == PanelName.SHOP_CATE_PANEL){
                            UIMgr.instance.show( self.data.panel, { 'direction': Direction.CENTER }, self );
                        }else{
                            UIMgr.instance.show( self.data.panel, { 'direction': Direction.CENTER }, 1 );
                        }
                    });
                }
            });

        }

    }

}