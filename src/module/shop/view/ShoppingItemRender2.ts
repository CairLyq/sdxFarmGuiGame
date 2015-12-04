/**
 * Created by rodey on 14/12/5.
 *
 * 商店内容 item
 *
 */

module game
{

    export class ShoppingItemRender2 extends egret.gui.ItemRenderer
    {

        //追加一个 商品图
        public iconAsset:egret.gui.UIAsset;
//        private _icon:egret.Texture;

        //追加一个 数量显示
        public numLabel:egret.gui.Label;
//        private _numText:string;

        //追加一个 价格
        public priceLable:egret.gui.Label;
//        private _priceText:string;

        public lockAsset:egret.gui.UIAsset;
        public lockButton: game.ShopUnLockButton;

        public newLabelButton: egret.gui.Button;

        public jinbiAsset: egret.gui.UIAsset;

        constructor()
        {
            super();
            this.skinName = skins.uicompenet.Shopping.ShoppingItemRender2Skin;
            this.touchChildren = false;
            this.touchEnabled = true;

            this.lockButton = new game.ShopUnLockButton('');

            /**
             * 将内容放置到地图中......
             */
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toCreateShopEditView, this);
        }

        public childrenCreated(): void{
            super.childrenCreated();

            //如果是树
            if(this.data.type === 5){
                this.iconAsset.scaleX = this.iconAsset.scaleY = .6;
            }

            //重置宽高, 装饰物
            else if(this.data.type === 7){

                if(this.iconAsset.measuredWidth > 88){
                    this.iconAsset.scaleX = this.iconAsset.scaleY = 88 / this.iconAsset.measuredWidth;
                }
                else if(this.iconAsset.measuredHeight > 66){
                    this.iconAsset.scaleX = this.iconAsset.scaleY = 66 / this.iconAsset.measuredHeight;
                }
                else{
                    //console.log(this.iconAsset.measuredHeight, this.iconAsset.measuredWidth);
                }

            }

        }


        /**
         * 默认处理数据填充函数，
         * 覆写
         */
        public dataChanged():void
        {

            if(this.data.buyable == 1){
                this.iconAsset.source = this.data.imgId + '_shop';
            }else{
                this.iconAsset.source = this.data.imgId;
            }

            //this.numLabel.text = this.data.num;
            this.priceLable.text = String(this.getGold());
            this.labelDisplay.text = this.data.name;

            //是否是最新解锁 新标识
            if(this.isNewItem()){
                this.newLabelButton.visible = true;
                this.newLabelButton.label = '新';
            }else{
                this.newLabelButton.label = '';
                this.newLabelButton.visible = false;
            }

            var unlockLv:number = BuildingModel.getUnlockLevel(this.data.buildingId);
            if(UserController.instance.isLevelEnough(unlockLv))
            {
                //已解锁

                this.numLabel.visible = true;
                this.jinbiAsset.visible = true;
                this.priceLable.visible = true;

                if(this.lockButton && this.lockButton.unlevelBmplabel)
                    this.isLocked();

            }else{
                //未解锁
                this.lockAsset.visible = true;
                this.lockButton.visible = true;
                this.lockButton.text = String(unlockLv);
                this.numLabel.visible = false;
                this.jinbiAsset.visible = false;
                this.priceLable.visible = false;

            }

        }

        private isLocked(): void{
            var total:number = BuildingModel.getMax(this.data.buildingId, UserController.instance.level);
            var current:number = GetBuildingUtils.getInstance().getBuildingNumByBuildingId(this.data.buildingId);

            this.numLabel.text = current + '/' + total;

            if(current >= total){
                //this.alpha = .5;
                this.lockAsset.visible = true;
                this.lockButton.visible = true;
                this.lockButton.levelAsset.visible = false;
                this.lockButton.unlevelBmplabel.visible = false;
                this.lockButton.upperLabel.visible = true;

                this.numLabel.visible = false;
                this.jinbiAsset.visible = false;
                this.priceLable.visible = false;

            }else{
                this.lockAsset.visible = false;
                this.lockButton.visible = false;
                this.lockButton.upperLabel.visible = false;
                this.lockButton.levelAsset.visible = true;
                this.lockButton.unlevelBmplabel.visible = true;

            }
        }

        private getGold(): number{

            // ZJM_15
            var gold: number = BuildingModel.getGold(this.data.buildingId);
            if(gold === 0){
                gold = BuildingModel.getDiamond(this.data.buildingId);
                console.log(gold);
                this.jinbiAsset.source = 'ZJM_15';
            }else{
                this.jinbiAsset.source = 'Dd-jib';
            }

            return gold;

        }


        public isNewItem(): boolean{

            var newItems: any = UserLevelModel.getItemNews();
            if(newItems && newItems.length && newItems.length > 0){

                for( var i: number = 0, len: number = newItems.length; i < len; ++i ){
                    if(this.data.imgId === newItems[i]){
                        return true;
                    }
                }

            }

            return false;
        }


        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void
        {
            super.partAdded(partName, instance);
            if(instance == this.iconAsset)
            {
                //GameUtils.getScaleRect(this.iconAsset.width, this.iconAsset.height);
                /*this.iconAsset.width = 136;
                this.iconAsset.height = 128;*/
            }else if(instance == this.lockAsset){

                this.lockAsset.source = this.lockButton;

            }else if(instance == this.newLabelButton){
                this.newLabelButton.visible = false;
            }
            else if(instance == this.numLabel){
                this.numLabel.visible = false;
            }
        }


        /**
         * 用户点击商品的时候，首先创建一个商品编辑状态下的显示对象实例
         * --》根据当前地图(也可以是规定初始放置位置)来放置商品到地图层
         * @param evt
         */
        private toCreateShopEditView(evt:egret.TouchEvent):void
        {
            GameEvent.BubbEvent(evt);

            //新手引导
            GuideManager.getInstance().addForbiden();

            //消除本地标识
            if(this.isNewItem()){
                GameEvent.watcher.dispatchEventWith(GameEvent.UPGRADE_NEW_ITEMS_CHANGE, true, this.data.imgId);
            }

            //console.log('总量：', BuildingModel.getMax(this.data.buildingId, UserController.instance.level));
            //console.log('现量：', GetBuildingUtils.getInstance().getBuildingNumByBuildingId(this.data.buildingId));

            // move outside
            var curLv:number = UserController.instance.level;
            var unlockLv:number = BuildingModel.getUnlockLevel(this.data.buildingId);
            if(unlockLv <= curLv)
            {
                var cur:number = GetBuildingUtils.getInstance().getBuildingNumByBuildingId(this.data.buildingId);
                var total:number = BuildingModel.getMax(this.data.buildingId, curLv);

                if(cur == total)
                {
                    //TipText.instace.play("当前等级的建筑数量已达上限 ("+ cur + "/" + total +")");
                    TipText.instace.play(Language.getString( 3, 13, cur, total ));
                }
                else if(cur > total)
                {
                    console.log("==========================error 当前等级的建筑数量超过上限");
                }
                else
                {
                    //生产建造消耗金币

                    ModeLogic.getInstance().enterBuyMode(this.data);

                    UIMgr.instance.closeCurrentPanel();

                    //新手引导 （面包机）
                    if(this.data.buildingId === BuildingID.BREAD_PRODUCT){
                        ProductGuideController.getInstance().nextStep();
                    }
                    //新手引导 （饲料机）
                    else if(this.data.buildingId === BuildingID.PLASTIC_PRODUCT){
                        PlasticGuideController.getInstance().nextStep();
                    }

                }

            }
            else
            {
                //TipText.instace.play('将于' + unlockLv + '级解锁!');
                TipText.instace.play( Language.getString( 3, 21, unlockLv ));
            }

        }

    }

}
