/**
 * on 2014-12-17
 * by leo
 */

module game
{
    export class ToolsPanel extends egret.gui.SkinnableComponent implements IPanel
    {
        //private logic:ToolsPanelLogic;
        //private operation:number;
        public item_img:egret.gui.UIAsset;
        public itemNum_lb:egret.gui.Label;
        public building: ItemIso;

        constructor()
        {
            super();

            this.skinName = skins.uicompenet.FarmV2.ToolsPanelV2Skin;
        }

        public childrenCreated():void
        {
            super.childrenCreated();

            this.item_img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startDrag, this);

            if(this.itemNum_lb){
                if(Number(this.itemNum_lb.text) === 0){
                    this.itemNum_lb.textColor = 0xDE2424;
                }else{
                    this.itemNum_lb.textColor = 0xFFFFFF;
                }
            }

        }

        private startDrag(e:egret.TouchEvent):void
        {
            ToolsPanelLogic.getInstance().toStartItem(e);
        }

        public onShow(...args:any[]):void
        {
            var operation:number = args[0];
            var building:ItemIso = args[1];
            this.building = building;

            ToolsPanelLogic.getInstance().initPanel(this, building, operation);

            if(Number(this.itemNum_lb.text) === 0){
                this.itemNum_lb.textColor = 0xDE2424;
            }else{
                this.itemNum_lb.textColor = 0xFFFFFF;
            }

            //===================================================
            this.alpha = 0;
            this.x = 0;
            this.y = Lyrs.SH;

            var desY:number = Lyrs.SH - 158;

            egret.Tween.get(this).to({y:desY, alpha:1}, Global.PANLE_TWEEN_TIME, egret.Ease.cubicOut).call( ()=>
            {
                UIMgr.instance.addPanelClose();
                FarmGuideController.getInstance().nextStep();
            }, this);
        }

        public onClose(...args:any[]):void
        {
            //this.operation = 0;
            //this.logic.dispose();
            //this.logic = null;

            egret.Tween.removeTweens(this.building);
            (this.building && this.building.alpha) && (this.building.alpha = 1);

        }

        public onUpdate(...args:any[]):void
        {

        }
    }
}
