/**
 * on 2015-01-05
 * by leo
 *//*


module game
{
    export class TimeProgress extends egret.gui.SkinnableComponent implements IPanel
    {

        private rtMask:egret.Rectangle;


        //private progress:egret.gui.UIAsset;
        private dNum_lb:egret.gui.Label;
        private time_lb:egret.gui.Label;
        private speed_btn:egret.gui.UIAsset;

        public constructor()
        {
            super();

            this.skinName = skins.uicompenet.Commons.TimeProgressSkin;


            this.rtMask = new egret.Rectangle(6, 4, 77, 24);
        }

        public partAdded(partName:string, instance:any):void
        {
            super.partAdded(partName, instance);


            if(instance == this.speed_btn)
            {
                this.speed_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onSpeed, this);
            }
        }

        private where:number;
        private leftTime:number;

        //animal and its animal
        private animal:Animal;
        private animal:BreedingPlantBuilding;
        //farm
        private farm:FarmBuilding;
        //tree
        private tree:TreeBuilding;


        public onShow(...args:any[]):void
        {
            this.where = args[0];
            //var p:egret.Point;
            var total:number
            var cur:number


            if(Constant.WHERE_ANIMAL == this.where)
            {
                this.animal = args[1];
                this.animal = args[2];

                total = this.animal.mm.produceTime;
                cur = this.animal.normalS.cnt;
                this.update(cur, total);

                //p = Lyrs.LYRS_ITEM_IN_SCENE.localToGlobal(this.animal.x, this.animal.y);

                //Global.useTimeProgressObj = this.animal.hashCode;
            }
            else if(Constant.WHERE_FARM == this.where)
            {
                this.farm = args[1];

                total = this.farm.assistLogic.assistModel.time;
                cur = this.farm.assistLogic.cnt;
                this.update(cur, total);

                //p = Lyrs.LYRS_ITEM_IN_SCENE.localToGlobal(this.farm.x, this.farm.y);

                //Global.useTimeProgressObj = this.farm.hashCode;
            }
            else if(Constant.WHERE_TREE == this.where)
            {
                this.tree = args[1];

                total = this.tree.assistLogic.model.time;
                cur = this.tree.assistLogic.passCnt;
                this.update(cur, total);

                //p = Lyrs.LYRS_ITEM_IN_SCENE.localToGlobal(this.tree.x, this.tree.y);

                //Global.useTimeProgressObj = this.tree.hashCode;
            }


            this.alpha = 0;
            this.x = 0;
            this.y = Lyrs.SH;

            var desY:number = Lyrs.SH - 157;
            egret.Tween.get(this).to({y:desY, alpha:1}, Global.PANLE_TWEEN_TIME, egret.Ease.cubicOut).call(function()
            {
                UIMgr.instance.addPanelClose();
            }, this);
        }

        public update(cur:number, total:number):void
        {
            if(cur < total)
            {
                this.rtMask.width = 117 * cur / total;
            }
            else if(total == cur)
            {
                this.rtMask.width = 117;
                UIMgr.instance.closeCurrentPanel();
            }
            else
            {
                console.log("logic error");
            }
            this.leftTime = total - cur;
            //this.time_lb.text = TimeUtils.getTime(this.leftTime);
            this.dNum_lb.text = String(SpeedModel.getSpeed(this.leftTime));
        }

        public onSpeed(e:egret.TouchEvent):void
        {
            if(UserController.instance.isDiamondEnough(SpeedModel.getSpeed(this.leftTime)))
            {
                if(Constant.WHERE_ANIMAL == this.where)
                {
                    //BreedingPlantController.getInstance().speed(this.animal, this.animal);
                }
                else if(Constant.WHERE_FARM == this.where)
                {
                    FarmController.getInstance().speed(this.farm);
                }
                else if(Constant.WHERE_TREE == this.where)
                {
                    TreeController.getInstance().speed(this.tree);
                }
                UIMgr.instance.closeCurrentPanel()
            }
        }

        public onClose(...args:any[]):void
        {
            this.where = 0;
            this.animal = null;
            this.animal = null;
            this.leftTime = 0;
            this.farm = null;
            //Global.useTimeProgressObj = 0;
        }

        public onUpdate(...args:any[]):void
        {

        }
    }
}*/
