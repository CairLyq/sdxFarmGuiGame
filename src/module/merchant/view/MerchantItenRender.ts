/**
 * Created by rodey on 15/3/6.
 */

module game
{

    export class MerchantItenRender extends egret.gui.ItemRenderer
    {

        constructor()
        {
            super();
            this.skinName = skins.uicompenet.MerchantPerson.MerchantItemRenderSkin;

        }

        public nickNameLabel:egret.gui.Label;
        public itemNameLabel:egret.gui.Label;
        public itemNumLabel:egret.gui.Label;
        public priceLabel:egret.gui.Label;
        public buyButton:egret.gui.Button;
        public iconAsset:egret.gui.UIAsset;
        public headAsset:egret.gui.UIAsset;
        public lockAsset:egret.gui.UIAsset;
        public labelButton: egret.gui.Button;

        public dataChanged():void
        {

            if(this.data.npcId)
            {
                var npc:NPCModel = NPCModel.getNPCById(this.data.npcId);

                this.nickNameLabel.text = npc.npcName;
                this.headAsset.source = npc.head || 'SZ_tx';
            }

            if(this.data.itemId)
            {
                var item:DepotModel = DepotModel.getModelById(this.data.itemId);
                this.itemNameLabel.text = item.name;
                this.iconAsset.source = item.imgId;
            }

            this.itemNumLabel.text = String(this.data.itemNum);
            this.priceLabel.text = String(this.data.price);

            if(this.data.status)
            {
                this.lockAsset.visible = (this.data.status == 1) ? false : true;
            }

            //折扣
            if(this.data.rate){
                var mm: MerchantModel = MerchantModel.getModelById(this.data.rate);
                this.labelButton.icon = mm.imgId;
                this.labelButton.label = mm.tag;
                if(this.data.rate == 10){
                    this.labelButton.visible = false;
                }
            }

        }


        public childrenCreated(): void{
            if(this.buyButton){
                this.buyButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goBuyHandler, this);
            }
        }

        public partAdded(partName:string, instance:any): void{

            super.partAdded(partName, instance);
            if(instance == this.lockAsset)
            {
                this.lockAsset.visible = false;
            }
        }

        public get status():number
        {
            return this.data.status || null;
        }

        public set status(value:number)
        {
            if(this.data.status == value) return;
            this.data.status = value;
            if(this.lockAsset)
            {
                this.lockAsset.visible = (this.data.status == 1)?false:true;
            }
        }

        private goBuyHandler(evt:egret.TouchEvent):void
        {
            GameEvent.BubbEvent(evt);
            var target:any = evt.currentTarget || evt.target,
                self = this;

            TweenIt.tweenBigThenNormal(target, () => {

                SoundMgr.instance.playAudio(SoundName.BTN_OK);

                if( UserController.instance.isIndulgeState2() ){
                    AntiAddictionController.showPanel();
                    return;
                }

                //金币不足提示
                if(!UserController.instance.isGoldEnough(Number(this.priceLabel.text))){
                    return;
                }

                //爆仓提示
                if(DepotController.instance.isBlast(self.data.itemId, self.data.itemNum)){
                    return;
                }

                MerchantPersonController.getInstance().buyTravelOrder(self.data);

                //GameEvent.watcher.dispatchEventWith(GameEvent.MERCHANT_BUY, true, self);
            });

        }

        public updateLockAsset():void
        {
            this.lockAsset.visible = !this.lockAsset.visible;
        }


    }

}
