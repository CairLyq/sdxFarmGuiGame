/**
 * Created by Gordon on 14/12/19.
 *
 * 定单面板
 */
module game{

    export class OrderDetail extends egret.gui.SkinnableComponent
    {
        private orderId:number;
        private userCarOrder:model.UserCarOrder;

        private achieve:boolean;
        public deleteBtn: egret.gui.Button;
        public completeBtn: egret.gui.Button;

        public experienceLabel: egret.gui.Label;
        public coinLabel: egret.gui.Label;
        private contentGroup:egret.gui.Group;

        //追加一个DataGroup部件
        public dataGroup: egret.gui.DataGroup;

        //追加一个ArrayConllect
        private arrayCollection: egret.gui.ArrayCollection;


        constructor()
        {
            super();
            this.skinName = skins.uicompenet.Order.OrderDetailSkin;

            this.arrayCollection = new egret.gui.ArrayCollection();
        }
        public onShow( ...args: any[] ):void
        {
            this.orderId = args[ 0 ];
            egret.Tween.removeTweens( this.completeBtn );
            this.refreshContent();
        }
        public onClose( ...args:any[] ):void
        {
            egret.Tween.removeTweens( this.completeBtn );
        }
        public onUpdate( ...args:any[] ):void
        {

        }
        private refreshContent():void
        {
            this.userCarOrder = model.UserCarOrder.getOrderById( this.orderId );
            this.coinLabel.text = this.userCarOrder.gold.toString();
            this.experienceLabel.text = this.userCarOrder.exp.toString();
            var items:string[] = this.userCarOrder.items.split( ';' );
            this.arrayCollection.replaceAll( items );

            this.completeBtn.scaleX = this.completeBtn.scaleY = 1;

            for( var idx:number = 0; idx < items.length; idx++ )
            {
                var itemStr:string[] = items[ idx ].split( "*" );
                this.achieve = DepotController.instance.isEnoughItem( Number( itemStr[ 0 ] ), Number( itemStr[ 1 ] ) );
                if( !this.achieve )
                {
                    return;
                }
            }
            if( 1 == this.userCarOrder.status )
            {
                return;
            }
            TweenIt.loopTween( this.completeBtn , {"scaleX":1.2, "scaleY":1.2}, {"scaleX":1, "scaleY":1} );
        }

        public childrenCreated():void
        {
            this.deleteBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onDelete, this );
            this.completeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onComplete, this );
            Icon.setAnchor( this.completeBtn );
        }
        private onDelete( e:egret.TouchEvent ):void
        {
            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            OrderController.instance.abandonCarOrder( this.orderId );
        }
        private onComplete( e:egret.TouchEvent ):void
        {
            //播放音效
            SoundMgr.instance.playAudio(SoundName.BTN_OK);

            if( UserController.instance.isIndulgeState2() )
            {
                AntiAddictionController.showPanel();
                return;
            }
            if( !this.achieve )
            {
                var items:string[] = this.userCarOrder.items.split( ';' );
                var itemList:Array<Object> = [];

                for( var idx:number = 0; idx < items.length; idx++ )
                {
                    var itemStr:string[] = items[ idx ].split( "*" );
                    itemList.push( { itemId:Number( itemStr[ 0 ] ), poor:Number( itemStr[ 1 ] ) } );
                }

                GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_SHORTAGE_BUY, true, {
                    'data': itemList,
                    'panel': PanelName.ORDER_PANEL,
                    'param': { 'direction': Direction.CENTER }
                });

                //BuyGoodsView.getInstance().init( itemList, PanelName.ORDER_PANEL, { 'direction': Direction.CENTER } );
                return;
            }
            if( 1 == this.userCarOrder.status )
            {
                this.userCarOrder.status = 0;
                OrderController.instance.recieveCarOrderReward( this.userCarOrder.orderId );
                return;
            }
            UIMgr.instance.closeCurrentPanel();
            this.userCarOrder.status = 1;

            var building:OrderBuilding = GetBuildingUtils.getInstance().getBuilding( OrderBuilding.OrderCarBuildingID );
            building.flyOut();

            //播放音效
            var stim: any = window.setTimeout(function(){
                window.clearTimeout(stim);
                SoundMgr.instance.playAudio(SoundName.ORDER_BIRD_FLY);
            }, 500);

            OrderGuideController.getInstance().nextStep();

        }
        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void
        {
            super.partAdded(partName, instance);
            if( instance == this.dataGroup )
            {
                this.createListItem();
            }
        }

        private onReturn( e:egret.TouchEvent ):void
        {
            UIMgr.instance.show( PanelName.ORDER_PANEL );
        }

        /**
         * 创建多个item
         */
        private createListItem(): void
        {
            this.dataGroup.dataProvider = this.arrayCollection;
            this.dataGroup.percentWidth = 100;
            this.dataGroup.percentHeight = 100;
            this.dataGroup.itemRenderer = new egret.gui.ClassFactory( game.OrderDetailItem );
            this.dataGroup.itemRendererSkinName = skins.uicompenet.Order.OrderDetailItemSkin;
        }

        public getCompleteBtn():egret.DisplayObject
        {
            return <egret.DisplayObject>this.completeBtn;
        }
    }
}
