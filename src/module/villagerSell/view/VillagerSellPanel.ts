/**
 * on 2015-03-12
 * by leo
 */
module game
{
    export class VillagerSellPanel extends egret.gui.SkinnableComponent implements IPanel
    {
        public txt_dialog:egret.gui.Label;

        public txt_sellNum:egret.gui.Label;
        public txt_ownNum:egret.gui.Label;
        public txt_goldNum:egret.gui.Label;

        public img_itemBig:egret.gui.UIAsset;
        public img_itemSmall:egret.gui.UIAsset;

        public btn_sell:egret.gui.UIAsset;
        public btn_refuse:egret.gui.UIAsset;
        public btn_close:egret.gui.UIAsset;

        private img_villager:egret.gui.UIAsset;

        private villager:Villager;

        private itemData:any;

        public constructor()
        {
            super();

            this.skinName = skins.uicompenet.villagerSell.VillagerSellPanelSkin;

            this.width = 480;
            this.height = 350;

        }

        public childrenCreated():void
        {
            super.childrenCreated();

            for(var i:number = 0; i < this._children.length; i++)
            {
                this._children[i].touchEnabled = false;
            }
            this.btn_close.touchEnabled = this.btn_sell.touchEnabled = this.btn_refuse.touchEnabled = true;

            //没问题
            this.btn_sell.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSell, this);
            //拒绝
            this.btn_refuse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRefuse, this);
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosePanel, this);
        }

        private onSell(e:egret.TouchEvent):void
        {
            if( UserController.instance.isIndulgeState2() ){
                AntiAddictionController.showPanel();
                return;
            }

            var isLack:boolean = false;
            var data:any[];
            var needNum:number;

            if(this.itemData)
            {
                needNum = this.villager.data.itemNum;
                var ownNum:number = this.itemData.itemNum;
                if(needNum > ownNum)
                {
                    isLack = true;
                    data = [{
                        "itemId":this.villager.data.itemId,
                        "poor":needNum - ownNum,
                        "needNum":needNum
                    }];
                }
            }
            else
            {
                isLack = true;
                needNum = this.villager.data.itemNum;
                data = [{
                    "itemId":this.villager.data.itemId,
                    "poor":needNum,
                    "needNum":needNum
                }];
            }
            if(isLack)
            {
                GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_SHORTAGE_BUY, true, {
                    'data':data,
                    'panel':PanelName.VILLAGER_SELL_PANEL,
                    'param':{"direction":Direction.NONE},
                    'args':this.villager
                });

                /*BuyGoodsView.getInstance().init([{
                 "itemId":seedModel.itemId,
                 "poor":1
                 }], PanelName.SEED_PANEL, {"direction":Direction.NONE}, this.panel.building);*/

                return;
            }
            VillagerSellController.getInstance().sell(this.villager);

        }

        private onRefuse(e:egret.TouchEvent):void
        {
            VillagerSellController.getInstance().refuse(this.villager);
        }

        private onClosePanel(e:egret.TouchEvent):void
        {
            UIMgr.instance.closeCurrentPanel();
        }

        public onShow(...args:any[]):void
        {
            this.villager = args[0];

            this.villager.suspend();

            var needId:number = this.villager.data.itemId;
            var needNum:number = this.villager.data.itemNum;

            var dm:DepotModel = DepotModel.getModelById(needId);

            this.img_itemBig.source = dm.imgId;
            this.img_itemSmall.source = dm.imgId;
            this.img_villager.source = this.villager.getModel.body;

            this.txt_goldNum.text = String(this.villager.data.price);

            this.txt_dialog.text = model.NpcDialog.getDialogById(this.villager.data.dialogId);

            this.itemData = DepotController.instance.searchLocalDataAsItemId(needId);
            var ownNum:number;
            if(this.itemData)
            {
                ownNum = this.itemData.itemNum;
            }
            else
            {
                ownNum = 0;
            }

            if(ownNum >= needNum)
            {
                this.txt_ownNum.textColor = Color.COLOR_RES_FULL;
            }
            else
            {
                this.txt_ownNum.textColor = Color.COLOR_RES_LACK;
            }

            this.txt_ownNum.text = String(ownNum);
            this.txt_sellNum.text = String(needNum);
            //===================================================
            this.alpha = 0;
            this.x = 0;
            this.y = Lyrs.SH;

            var desY:number = Lyrs.SH - this.height;

            egret.Tween.get(this).to({y:desY, alpha:1}, Global.PANLE_TWEEN_TIME, egret.Ease.cubicOut).call(function()
            {
                UIMgr.instance.addPanelClose();
                VillagerGuideController.getInstance().nextStep();
            }, this);
        }

        public onClose(...args:any[]):void
        {
            this.villager.startup();
            this.villager = null;
        }

        public onUpdate(...args:any[]):void
        {

        }

        public getSellBtnInVillagerGuide():egret.DisplayObject
        {
            return <egret.DisplayObject>this.btn_sell;
        }
    }
}