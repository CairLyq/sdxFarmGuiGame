/**
 * Created by Gordon on 10/March/15.
 * @class AchievementOpenPanel
 * @constructor
 **/
module view
{
    export class AchievementOpenPanel extends egret.gui.SkinnableComponent implements game.IPanel
    {
        private isChildrenCreated:boolean = false;

        private title:egret.gui.Label;
        private discriptLable:egret.gui.Label;
        private awardLabel0:egret.gui.Label;
        private awardLabel1:egret.gui.Label;

        private awardIcon0:egret.gui.UIAsset;
        private awardIcon1:egret.gui.UIAsset;
        public bg:egret.gui.UIAsset;

        private intervalId:number;

        public constructor()
        {
            super();
            this.skinName = skins.uicompenet.achievement.AchieveOpenSkin;

            this.width = 458;
            this.height = 458;
        }

        /**
         * 初始化
         **/
        private showContent()
        {
            var userTrophy:model.UserTrophy = model.UserTrophy.getAwardData();
            if( null == userTrophy )
            {
                return;
            }
            var cfgTrophy:model.CfgTrophy = model.CfgTrophy.getTrophyById( userTrophy.id );

            this.title.text = cfgTrophy.name;
            this.awardLabel0.text = '' + cfgTrophy.getDiamondByLevel( userTrophy.level );
            this.awardLabel1.text = '' + cfgTrophy.getExpByLevel( userTrophy.level );

            var needNum:number = cfgTrophy.getNumByLevel( userTrophy.level );
            this.discriptLable.text = cfgTrophy.desc.replace( '%X%', '' + needNum );
        }
        public onShow( ...args:any[] ):void
        {
            if( !this.isChildrenCreated )
            {
                return;
            }
            this.showContent();

            this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this );

            this.anchorX = this.anchorY = 0;
            this.x = ( Lyrs.SW - this.width ) >> 1;
            this.y = ( Lyrs.SH - this.height ) >> 1;

            this.intervalId = window.setInterval( ()=> { this.bg.rotation++; }, 50 );
        }

        private onTouchTap( e:egret.TouchEvent ):void
        {
            UIMgr.instance.show( PanelName.ACHIEVEMENT_PANEL );
            var building = GetBuildingUtils.getInstance().getBuildingByBuildingId( BuildingID.ACHIEVEMENT );
            building.hideAlertIcon();
        }
        public onClose( ...args:any[] ):void
        {
            this.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this );
            clearInterval( this.intervalId );
        }

        public onUpdate( ...args:any[] ):void
        {

        }
        public childrenCreated():void
        {
            super.childrenCreated();
            this.isChildrenCreated = true;
            this.bg.cacheAsBitmap = true;

            this.onShow();
        }
    }
}