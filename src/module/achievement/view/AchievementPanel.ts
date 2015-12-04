/**
 * Created by Gordon on 09/March/15.
 * @class AchievementPanel
 * @constructor
 **/
module view
{
    export class AchievementPanel extends egret.gui.SkinnableComponent implements game.IPanel
    {
        static intance:AchievementPanel;
        private isChildrenCreated:boolean = false;

        private closeBtn:egret.gui.UIAsset;

        public dataGroup: egret.gui.DataGroup;
        private arrayCollection: egret.gui.ArrayCollection;

        public constructor()
        {
            super();
            this.skinName = skins.uicompenet.achievement.AchievementSkin;
            this.init();
            AchievementPanel.intance = this;
        }

        /**
         * 初始化
         **/
        private init():void
        {
            this.arrayCollection = new egret.gui.ArrayCollection( model.UserTrophy.userTrophies );
        }
        public onShow( ...args:any[] ):void
        {
            if( !this.isChildrenCreated )
            {
                return;
            }
            this.closeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );

            var building = GetBuildingUtils.getInstance().getBuildingByBuildingId( BuildingID.ACHIEVEMENT );
            building.hideAlertIcon();
        }
        public setPosition( index:number ):void
        {
            if( !this.isChildrenCreated )
            {
                return;
            }
            if( index < 2 )
            {
                this.dataGroup.horizontalScrollPosition = 0;
                return;
            }
            setTimeout( ()=>{
                this.dataGroup.horizontalScrollPosition = index * 146 - 146.5;
            }, 100 );

            //this.dataGroup.horizontalScrollPosition = index * 140 + ( index - 1 ) * 6 - 210.5 + 70;
            /*
            1308 = 140 * num + 6 * ( num - 1 ) 总长度 this.dataGroup.contentWidth
            140 单个宽度
            421 容器宽度
            6 间隔
            */
        }
        public refreshItems():void
        {
            if( !this.isChildrenCreated )
            {
                return;
            }
            var num:number = this.dataGroup.numElements;
            for( var i:number = 0; i < num; i++ )
            {
                var item:any = this.dataGroup.getVirtualElementAt( i );
                if( null == item )
                {
                    continue;
                }
                item.dataChanged();
            }
        }

        public onClose( ...args:any[] ):void
        {
            this.closeBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );
            model.UserTrophy.hasAward( false );
        }

        public onUpdate( ...args:any[] ):void
        {

        }
        private clickHandler( e:egret.TouchEvent ):void
        {
            TweenIt.tweenBigThenNormal( this.closeBtn, ()=>{ UIMgr.instance.closeCurrentPanel(); } );
        }
        public childrenCreated():void
        {
            this.isChildrenCreated = true;
            this.onShow();
            this.dataGroup.dataProvider = this.arrayCollection;
            this.createListItem();
        }
        private createListItem():void
        {
            if( this.arrayCollection.length = 0 )
                return;
            this.dataGroup.percentWidth = 100;
            this.dataGroup.percentHeight = 100;
            this.dataGroup.itemRenderer = new egret.gui.ClassFactory( view.AchievementItem );
        }
    }
}