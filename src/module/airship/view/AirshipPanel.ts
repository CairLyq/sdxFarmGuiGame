/**
 * Created by Gordon on 14/April/15.
 * @class AirshipPanel
 * @constructor
 **/
module view
{
    export class AirshipPanel extends egret.gui.SkinnableComponent implements game.IPanel, IGTimer
    {
        static intance:AirshipPanel;
        private isChildrenCreated:boolean = false;

        private closeBtn:egret.gui.UIAsset;

        private arrowLeft:egret.gui.UIAsset;
        private arrowRight:egret.gui.UIAsset;
        private item:egret.gui.UIAsset;
        private waitTime:egret.gui.Label;
        private num:egret.gui.Label;
        private gold:egret.gui.Label;
        private exp:egret.gui.Label;
        private goldIcon:egret.gui.UIAsset;
        private expIcon:egret.gui.UIAsset;
        private allGold:egret.gui.Label;
        private allExp:egret.gui.Label;
        private launchBtn:egret.gui.Group;
        private packBtn:egret.gui.Group;
        private helpBtn:egret.gui.Group;

        private dataGroup:egret.gui.DataGroup;
        private arrayCollection:egret.gui.ArrayCollection;
        private elfShip:model.UserElfShip;

        private orderIdx:number = 2;

        public isShowing:boolean = false;

        public constructor()
        {
            super();
            this.skinName = skins.uicompenet.airship.AirshipSkin;
            this.elfShip = AirshipController.userElfShip;
            this.arrayCollection = new egret.gui.ArrayCollection( this.elfShip.userShipOrders );

            AirshipPanel.intance = this;
        }

        /**
         * 初始化
         **/
        private init():void
        {
            this.allExp.text = String( this.elfShip.exp );
            this.allGold.text = String( this.elfShip.gold );
        }
        public setItem( index:number = 0 ):void
        {
            if( this.orderIdx == index )
            {
                return;
            }
            var itemRender:AirshipItemRender = <AirshipItemRender>this.dataGroup.getVirtualElementAt( this.orderIdx );
            itemRender.childrenCreated();
            this.orderIdx = index;
            var shipOrder:model.UserShipOrder = this.elfShip.userShipOrders[ index ];
            this.packBtn.visible = this.expIcon.visible = this.goldIcon.visible = this.num.visible = this.exp.visible = this.gold.visible = this.item.visible = ( 0 == shipOrder.status );
            var num:number = DepotController.instance.getItemNumByItemId( shipOrder.itemId );
            this.num.textFlow = <Array<egret.ITextElement>>[
                { text:num, style: {"textColor":num >= shipOrder.itemNum ? 0x00FF00 : 0xFF0000 } },
                { text:' / ' + shipOrder.itemNum }
            ];
            this.exp.text = String( shipOrder.exp );
            this.gold.text = String( shipOrder.gold );

            var model:DepotModel = DepotModel.getModelById( shipOrder.itemId );
            this.item.source = model.imgId;
        }

        public onShow( ...args:any[] ):void
        {
            if( !this.isChildrenCreated )
            {
                return;
            }
            this.launchBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onLaunch, this );
            this.packBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.pack, this );
            this.helpBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onHelp, this );
            this.closeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );

            var shipOrder:model.UserShipOrder = this.elfShip.userShipOrders[ this.orderIdx ];
            var num:number = DepotController.instance.getItemNumByItemId( shipOrder.itemId );
            this.num.text = num + ' / ' + shipOrder.itemNum;

            GTimer.getInstance().register( this );

            this.isShowing = true;
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
        private onLaunch( e:egret.TouchEvent ):void
        {
            TweenIt.tweenBigThenNormal( e.currentTarget, ()=>{
                if( AirshipController.allPack() )
                {
                    AirshipController.elfShipTakeOff();
                    return;
                }

                if( AirshipController.allEmpty() )
                {
                    Confirm.instance.show( '', Language.getString( 1, 14 ), this.elfShipTakeOff, this );
                    return;
                }
                TipText.instace.play( Language.getString( 1, 17 ) );
            } );
        }
        private elfShipTakeOff():void
        {
            UIMgr.instance.closeCurrentPanel( ()=>{
                AirshipController.elfShipTakeOff();
            });
        }
        private pack( e:egret.TouchEvent ):void
        {
            TweenIt.tweenBigThenNormal( e.currentTarget, ()=>{
                var shipOrder:model.UserShipOrder = this.elfShip.userShipOrders[ this.orderIdx ];
                var num:number = DepotController.instance.getItemNumByItemId( shipOrder.itemId );
                if( num >= shipOrder.itemNum )
                {
                    AirshipController.pack( this.orderIdx );
                    var itemRender:AirshipItemRender = <AirshipItemRender>this.dataGroup.getVirtualElementAt( this.orderIdx );
                    itemRender.packItem();
                    DepotController.instance.addItemNum( shipOrder.itemId, -shipOrder.itemNum );
                }
                else
                {
                    var itemList:Array<Object> = [];
                    itemList.push( { itemId:shipOrder.itemId, poor:shipOrder.itemNum } );
                    GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_SHORTAGE_BUY, true, {
                        'data': itemList,
                        'panel': PanelName.AIRSHIP_PANEL,
                        'param': { 'direction': Direction.CENTER }
                    });
                }
            } );
        }
        public onPack( data:Object ):void
        {
            GameEvent.watcher.dispatchEventWith( GameEvent.RES_CHANGE, true, new ResChange( data[ 'gold' ], 0, data[ 'exp' ], this.packBtn.localToGlobal( 0, 0 ) ) );
            this.packBtn.visible = this.expIcon.visible = this.goldIcon.visible = this.num.visible = this.exp.visible = this.gold.visible = this.item.visible = false;
        }
        public onElfShipTakeOff( data:Object ):void
        {
            if( this.isShowing )
            {
                UIMgr.instance.closeCurrentPanel();
                GameEvent.watcher.dispatchEventWith( GameEvent.RES_CHANGE, true, new ResChange( data[ 'gold' ], 0, data[ 'exp' ], this.launchBtn.localToGlobal( 0, 0 ) ) );
            }
            else
            {
                GameEvent.watcher.dispatchEventWith( GameEvent.RES_CHANGE, true, new ResChange( data[ 'gold' ], 0, data[ 'exp' ], new egret.Point( Lyrs.SW >> 1, Lyrs.SH >> 1 ) ) );
            }
            view.AirshipWaitBuilding.instance.elfShipTakeOff();
            AirshipController.getElfShip( false, true, UIUtil.intersectStage( AirshipWaitBuilding.instance ) );
        }
        private onHelp( e:egret.TouchEvent ):void
        {
            TweenIt.tweenBigThenNormal( e.target, ()=>{

            } );
        }
        private clickHandler( e:egret.TouchEvent ):void
        {
            TweenIt.tweenBigThenNormal( e.target, ()=>{ UIMgr.instance.closeCurrentPanel(); } );
        }

        public onClose( ...args:any[] ):void
        {
            Confirm.instance.hide();
            this.launchBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.onLaunch, this );
            this.packBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.pack, this );
            this.helpBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.onHelp, this );
            this.closeBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );
            GTimer.getInstance().unRegister( this );
            this.isShowing = false;
        }

        public onUpdate( ...args:any[] ):void
        {

        }

        public childrenCreated():void
        {
            this.isChildrenCreated = true;
            this.init();
            this.createListItem();
            this.onShow();
            var itemRender:AirshipItemRender = <AirshipItemRender>this.dataGroup.getVirtualElementAt( 0 );
            itemRender.choosen.visible = true;
            this.setItem( 0 );
        }
        public refreshGroup():void
        {
            if( !this.isChildrenCreated )
            {
                return;
            }
            this.elfShip = AirshipController.userElfShip;
            this.arrayCollection.replaceAll( this.elfShip.userShipOrders );

            this.init();
            this.orderIdx = 1;
            var itemRender:AirshipItemRender = <AirshipItemRender>this.dataGroup.getVirtualElementAt( 0 );
            itemRender.choosen.visible = true;
            this.setItem( 0 );
        }
        private createListItem(): void
        {
            this.dataGroup.dataProvider = this.arrayCollection;
            this.dataGroup.percentWidth = 100;
            this.dataGroup.percentHeight = 100;
            this.dataGroup.itemRenderer = new egret.gui.ClassFactory( view.AirshipItemRender );
        }
    }
}