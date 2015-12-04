/**
 * Created by Gordon on 14/April/15.
 * @class AirshipWaitPanel
 * @constructor
 **/
module view
{
    export class AirshipWaitPanel extends egret.gui.SkinnableComponent implements game.IPanel
    {
        private isChildrenCreated:boolean = false;
        public isShowing:boolean = false;

        private item0:egret.gui.UIAsset;
        private item1:egret.gui.UIAsset;
        private item2:egret.gui.UIAsset;
        private closeBtn:egret.gui.UIAsset;
        private waitTime:egret.gui.Label;
        private refreshBtn:egret.gui.Group;
        public constructor()
        {
            super();
            this.skinName = skins.uicompenet.airship.AirshipWaitSkin;
        }

        public onShow( ...args:any[] ):void
        {
            if( !this.isChildrenCreated )
            {
                return;
            }
            this.closeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );
            this.refreshBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.refreshTime, this );
            GTimer.getInstance().register( this );
            this.isShowing = true;
        }
        private refreshTime( e:egret.TouchEvent ):void
        {
            TweenIt.tweenBigThenNormal( e.currentTarget, ()=>{
                AirshipController.elfShipSpeed();
            } );
        }

        public onElfShipSpeed( data:Object ):void
        {
            GameEvent.watcher.dispatchEventWith( GameEvent.RES_CHANGE, true, new ResChange( 0, -data[ 'diamond' ], 0, this.refreshBtn.localToGlobal( 0, 0 ) ) );

            UIMgr.instance.closeCurrentPanel();
            AirshipWaitBuilding.instance.flyBack();
            AirshipController.getElfShip();
        }
        public second():void
        {
            var interval:number = AirshipController.userElfShip.refreshDate - GTimer.getInstance().serverMiniTime;
            if( interval < 0 )
            {
                GTimer.getInstance().unRegister( this );
                return;
            }
            var date:Date = new Date( interval );
            this.waitTime.text = date.getUTCHours() + '小时' + date.getUTCMinutes() + '分' + date.getUTCSeconds() + '秒';
        }
        private clickHandler( e:egret.TouchEvent ):void
        {
            TweenIt.tweenBigThenNormal( e.target, ()=>{ UIMgr.instance.closeCurrentPanel(); } );
        }

        public onClose( ...args:any[] ):void
        {
            this.closeBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );
            this.refreshBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.refreshTime, this );
            GTimer.getInstance().unRegister( this );
            this.isShowing = false;
        }

        public onUpdate( ...args:any[] ):void
        {

        }

        public childrenCreated():void
        {
            this.isChildrenCreated = true;

            var arr:Array<String> = AirshipController.userElfShip.itemNotify.split( '*' );
            var length:number = arr.length;
            for( var i:number = 0; i < length; i++ )
            {
                var model:DepotModel = DepotModel.getModelById( Number( arr[ i ] ) );
                this[ 'item' + i ].source = model.imgId;
                this[ 'item' + i ].addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
            }

            this.onShow();
        }
        private onTap( e:egret.TouchEvent ):void
        {
            var arr:Array<String> = AirshipController.userElfShip.itemNotify.split( '*' );
            var i:number = 0;
            if( this.item0 === e.target )
            {
                i = 0;
            }
            else if( this.item1 === e.target )
            {
                i = 1;
            }
            else if( this.item2 === e.target )
            {
                i = 2;
            }

            var model:DepotModel = DepotModel.getModelById( Number( arr[ i ] ) );
            TipText.instace.play( '（' + model.name + '）' + model.desc )
        }
    }
}