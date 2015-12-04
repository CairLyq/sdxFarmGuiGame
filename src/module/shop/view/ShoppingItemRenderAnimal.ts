/**
 * Created by rodey on 14/12/5.
 *
 * 商店内容 item
 *
 */

module game
{

    export class ShoppingItemRenderAnimal extends egret.gui.ItemRenderer
    {

        //追加一个 商品图
        public iconAsset:egret.gui.UIAsset;

        //追加一个 数量显示
        public numLabel:egret.gui.Label;

        //追加一个 价格
        public priceLable:egret.gui.Label;

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

        }

        /**
         * 默认处理数据填充函数，
         * 覆写
         */
        public dataChanged():void
        {
            //console.log(this.data);
            this.iconAsset.source = this.data.imgId;
            //this.numLabel.text = this.data.num;
            this.priceLable.text = String(AnimalModel.getGold(this.data.animalId));
            this.labelDisplay.text = this.data.name;

            //是否是最新解锁 新标识
            if(this.isNewItem()){
                this.newLabelButton.visible = true;
                this.newLabelButton.label = '新';
            }else{
                this.newLabelButton.label = '';
                this.newLabelButton.visible = false;
            }

            var unlockLv:number = AnimalModel.getUnlockLevel(this.data.animalId);
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

            var total:number = AnimalModel.getMax(this.data.animalId, UserController.instance.level);
            var current:number = AnimalManager.getInstance().getAnimalNum(this.data.animalId);

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

            }else if(instance == this.lockAsset){

                this.lockAsset.source = this.lockButton;
                this.lockAsset.visible = false;

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

            // move outside
            var curLv:number = UserController.instance.level;
            var unlockLv:number = AnimalModel.getUnlockLevel(this.data.animalId);
            if(unlockLv <= curLv)
            {
                var cur:number = AnimalManager.getInstance().getAnimalNum(this.data.animalId);
                var total:number = AnimalModel.getMax(this.data.animalId, curLv);

                if(cur == total)
                {
                    TipText.instace.play("当前等级的动物数量已达上限 ("+ cur + "/" + total +")");
                    //TipText.instace.play(Language.getString( 3, 13, cur, total ));
                }
                else if(cur > total)
                {
                    console.log("==========================error: 动物数量超过上限");
                }
                else
                {
                    //购买动物消耗金币
                    //ModeLogic.getInstance().enterBuyMode(this.data);

                    UIMgr.instance.closeCurrentPanel( ()=>{
                        AnimalController.getInstance().buyAnimal(this.data.animalId);
                    } );

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
