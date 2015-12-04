/**
 * on 2014-12-17
 * by leo
 */

module game
{
    export class ConsumableToolsPanel extends egret.gui.SkinnableComponent implements IPanel
    {
        private logic:ConsumableToolsPanelLogic;
        public building:BuildingIso;
        public item_img:egret.gui.UIAsset;
        public itemNum_lb:egret.gui.Label;

        constructor()
        {
            super();

            this.skinName = skins.uicompenet.FarmV2.ConsumableToolsPanelSkin;

            this.logic = new ConsumableToolsPanelLogic();

            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startDrag, this);
        }

        private startDrag(e:egret.TouchEvent):void
        {
            this.logic.toStartItem(e);
        }

        public onShow(...args:any[]):void
        {
            this.building = args[0];

            this.logic.initPanel();

            this.alpha = 0;
            this.x = 0;
            this.y = Lyrs.SH;

            var desY:number = Lyrs.SH - 158;

            egret.Tween.get(this).to({y:desY, alpha:1}, Global.PANLE_TWEEN_TIME, egret.Ease.cubicOut).call(function()
            {
                UIMgr.instance.addPanelClose();
            }, this);
        }

        public onClose(...args:any[]):void
        {
            this.building = null;
        }

        public onUpdate(...args:any[]):void
        {

        }
    }

}
