/**
 * Created by Gordon on 03/March/15.
 * @class MineToolPanel
 * @constructor
 **/
module game
{
    export class MineToolPanel extends egret.gui.SkinnableComponent implements IPanel
    {
        private isChildrenCreated:boolean = false;

        public static instance:MineToolPanel;
        private icon0:view.MineToolIcon;
        private icon1:view.MineToolIcon;
        private icon2:view.MineToolIcon;

        private span:number = 142;

        public constructor()
        {
            super();
            this.skinName = skins.uicompenet.mine.MineToolSkin;
        }

        public onShow( ...args:any[] ):void
        {
            if( !this.isChildrenCreated )
            {
                return;
            }
            this.y = Lyrs.SH;
            var desY:number = Lyrs.SH - 158;
            egret.Tween.get(this).to( { y:desY }, Global.PANLE_TWEEN_TIME, egret.Ease.cubicOut ).call(
                ()=>
                {
                    UIMgr.instance.addPanelClose();
                } );
            this.icon0.setTextColor();
            this.icon1.setTextColor();
            this.icon2.setTextColor();
            this.alpha = 1;
        }

        public onClose( ...args:any[] ):void
        {

        }

        public onUpdate( ...args:any[] ):void
        {

        }
        public childrenCreated():void
        {
            this.isChildrenCreated = true;
            this.icon0.data = 51;
            this.icon1.data = 52;
            this.icon2.data = 53;
            this.onShow();
        }
    }
}