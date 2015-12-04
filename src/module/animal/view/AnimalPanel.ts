/**
 * on 2015-04-28
 * by leo
 */

module game
{
    export class AnimalPanel extends egret.gui.SkinnableComponent implements IPanel
    {
        public txt_dialog:egret.gui.Label;
        public mc_animal:egret.gui.UIAsset;

        public gr_hungry:egret.gui.Group;
        public gr_normal:egret.gui.Group;
        public gr_full:egret.gui.Group;


        //gr_hungry
        public btn_feed:egret.gui.UIAsset;
        public img_itemBefore:egret.gui.UIAsset;
        public img_itemAfter:egret.gui.UIAsset;
        public txt_numBefore:egret.gui.Label;
        public txt_numAfter:egret.gui.Label;

        //gr_normal
        public btn_speed:egret.gui.UIAsset;
        public img_itemInNormal:egret.gui.UIAsset;
        public txt_itemNameInNormal:egret.gui.Label;
        public txt_leftTime:egret.gui.Label;
        public txt_diamond:egret.gui.Label;

        //gr_full
        public btn_harvest:egret.gui.UIAsset;
        public img_itemInFull:egret.gui.UIAsset;
        public txt_itemNameInFull:egret.gui.Label;

        public btn_close:egret.gui.UIAsset;


        private isCreated:boolean;
        private animal:Animal;

        private mc_hungry:egret.MovieClip;
        private mc_normal:egret.MovieClip;
        private mc_full:egret.MovieClip;

        public constructor()
        {
            super();
            this.skinName = skins.uicompenet.animal.AnimalPanelSkin;

            this.isCreated = false;
        }

        public childrenCreated():void
        {
            super.childrenCreated();

            this.isCreated = true;

            this.mc_animal.x = 60;
            this.mc_animal.y = 60;

            this.laterShow();
        }

        private hideAllGr():void
        {
            this.gr_hungry.visible = this.gr_normal.visible = this.gr_full.visible = false;
        }

        public onShow(...args:any[]):void
        {
            this.animal = args[0];

            this.mc_hungry = MovieClipMgr.createMC("animal_animation_json", "animal_animation_png", this.animal.getModel.animeHungryBig);

            this.mc_normal = MovieClipMgr.createMC("animal_animation_json", "animal_animation_png", this.animal.getModel.animeNormalBig);

            this.mc_full = MovieClipMgr.createMC("animal_animation_json", "animal_animation_png", this.animal.getModel.animeFullBig);

            if(this.isCreated)
            {
                this.laterShow();
            }
        }

        private laterShow():void
        {
            var dm:DepotModel;
            var itemData:any;

            this.btn_close.touchEnabled = true;
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosePanel, this);

            this.hideAllGr();

            if(this.animal.isHungry())
            {
                //animal喂食
                this.gr_hungry.visible = true;
                this.btn_feed.touchEnabled = true;
                this.btn_feed.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFeed, this);
                dm = DepotModel.getModelById(this.animal.getModel.feedItemId);

                this.img_itemBefore.source = dm.imgId;
                this.img_itemAfter.source = dm.imgId;

                itemData = DepotController.instance.searchLocalDataAsItemId(this.animal.getModel.feedItemId);

                if(itemData && itemData.itemNum > 0)
                {
                    this.txt_numBefore.text = String(itemData.itemNum);
                    this.txt_numAfter.text = String(itemData.itemNum - 1);

                    this.txt_numBefore.textColor = this.txt_numAfter.textColor = Color.COLOR_RES_FULL;
                }
                else
                {
                    this.txt_numBefore.text = String(0);
                    this.txt_numAfter.text = String(0);

                    this.txt_numBefore.textColor = this.txt_numAfter.textColor = Color.COLOR_RES_LACK;
                }

                this.mc_animal.source = this.mc_hungry;
                this.mc_hungry.play(-1);
                this.txt_dialog.text = this.animal.getModel.dialogHungry;
            }
            else if(this.animal.isNormal())
            {
                //弹出成熟剩余时间
                this.gr_normal.visible = true;
                this.btn_speed.touchEnabled = true;
                this.btn_speed.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSpeed, this);

                dm = DepotModel.getModelById(this.animal.getModel.itemId);
                this.img_itemInNormal.source = dm.imgId;

                this.txt_itemNameInNormal.text = dm.name + "X" + this.animal.getModel.itemNum;
                this.txt_leftTime.text = TimeUtils.getFormatTime(this.animal.getLeftCnt());
                this.txt_diamond.text = String(SpeedModel.getSpeed(this.animal.getLeftCnt()));

                this.mc_animal.source = this.mc_normal;
                this.mc_normal.play(-1);
                this.txt_dialog.text = this.animal.getModel.dialogNormal;
            }
            else if(this.animal.isFull())
            {
                //收割
                this.gr_full.visible = true;
                this.btn_harvest.touchEnabled = true;
                this.btn_harvest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHarvest, this);

                dm = DepotModel.getModelById(this.animal.getModel.itemId);
                this.img_itemInFull.source = dm.imgId;

                this.txt_itemNameInFull.text = dm.name + "X" + this.animal.getModel.itemNum;

                this.mc_animal.source = this.mc_full;
                this.mc_full.play(-1);
                this.txt_dialog.text = this.animal.getModel.dialogFull;
            }


            this.alpha = 0;
            this.x = 0;
            this.y = Lyrs.SH;

            var desY:number = Lyrs.SH - this.height;

            egret.Tween.get(this).to({y:desY, alpha:1}, Global.PANLE_TWEEN_TIME, egret.Ease.cubicOut).call(function()
            {
                UIMgr.instance.addPanelClose();
                BreedGuideController.getInstance().nextStep();
            }, this);

        }

        private onClosePanel(e:egret.TouchEvent):void
        {
            UIMgr.instance.closeCurrentPanel();
        }

        public updateTime(animal:Animal):void
        {
            if(this.animal == animal && this.gr_normal.visible)
            {
                this.txt_leftTime.text = TimeUtils.getFormatTime(this.animal.getLeftCnt());
            }
        }

        private onFeed(e:egret.TouchEvent):void
        {

            AnimalController.getInstance().feed(this.animal);
        }

        private onSpeed(e:egret.TouchEvent):void
        {
            var dNum:number = Number(this.txt_diamond.text);
            AnimalController.getInstance().speed(this.animal, dNum);
        }

        private onHarvest(e:egret.TouchEvent):void
        {

            AnimalController.getInstance().hAnimal(this.animal);
        }

        public onClose(...args:any[]):void
        {
            this.animal = null;
        }

        public onUpdate(...args:any[]):void
        {

        }

        //===================================================
        public getFeedBtn():egret.DisplayObject
        {
            return <egret.DisplayObject>this.btn_feed;
        }

        public getSpeedBtn():egret.DisplayObject
        {
            return <egret.DisplayObject>this.btn_speed;
        }

        public getHarvestBtn():egret.DisplayObject
        {
            return <egret.DisplayObject>this.btn_harvest;
        }

    }
}