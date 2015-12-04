/**
 * Created by Gordon on 14/12/19.
 *
 * 定单面板
 */
module game
{
    export class OrderPanel extends egret.gui.SkinnableComponent implements IPanel, IGTimer
    {
        private isChildrenCreated:boolean = false;

        private itemList:game.OrderItemRender[];
        private currentItem:game.OrderItemRender;

        private orderNew:game.OrderNew;
        private orderDetail:game.OrderDetail;

        private chooseOrderId:number = -1;

        private npc:egret.gui.UIAsset;

        //一个打字显示对象
        private typeFont:game.TypeFont;
        private typing:egret.gui.UIAsset;
        private closeBtn:egret.gui.UIAsset;
        private dialogBg:egret.gui.UIAsset;
        private firstDialog:egret.gui.Label;

        constructor()
        {
            super();
            this.skinName = skins.uicompenet.Order.OrderPanelSkin;
        }
        public onShow( ...args: any[] ):void
        {
            if( !this.isChildrenCreated )
            {
                return;
            }
            var choosenOrder:boolean = ( -1 != this.chooseOrderId );
            this.firstDialog.visible = !choosenOrder;
            this.dialogBg.visible = choosenOrder;
            var typingText:string = '';
            if( choosenOrder )
            {
                var dialogId:number = model.UserCarOrder.getOrderById( this.chooseOrderId ).dialogId;
                typingText = model.NpcDialog.getDialogById( dialogId );;
            }

            this.typeFont.update( typingText );
            GTimer.getInstance().register( this );

            this.checkItemNum();

            if( this.orderDetail.visible )
            {
                this.orderDetail.onShow( this.chooseOrderId );
            }
            else if( this.orderNew.visible )
            {
                this.orderNew.onShow( this.chooseOrderId );
            }
            this.closeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );

            //新手引导
            var stim: any = window.setTimeout(function(){
                window.clearTimeout(stim);
                UIMgr.instance.addPanelClose();

                if(OrderGuideController.getInstance().isInOrderGuide()){
                    OrderGuideController.getInstance().nextStep();
                }

                stim = null;
                delete stim;

            }, 500);
        }
        public onClose( ...args: any[] ):void
        {
            if( null != this.typeFont )
            {
                this.typeFont.stop();
            }
            GTimer.getInstance().unRegister( this );
            if( this.orderDetail.visible )
            {
                this.orderDetail.onClose();
            }
            else
            {
                this.orderNew.onClose();
            }

            this.closeBtn.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );

            for( var index:number = 0, contentNum = this.itemList.length; index < contentNum; index++ )
            {
                var item:any = this.itemList[ index ];
                if( null == item )
                {
                    console.log( index + ':是null; OrderPanel::checkItemNum()');
                    continue;
                }
                item.killTween();
            }
        }
        public onUpdate( ...args: any[] ):void
        {
            this.currentItem.data = args[ 0 ];
            if( args[ 1 ] )
            {
                this.setChoose( this.currentItem );
            }
        }
        private clickHandler( e:egret.TouchEvent ):void
        {
            TweenIt.tweenBigThenNormal( this.closeBtn, ()=>{ UIMgr.instance.closeCurrentPanel(); } );
        }
        public second():void
        {
            var orderLength:number = model.UserCarOrder.userCarOrders.length;
            for( var index:number = 0; orderLength > index; index++ )
            {
                var userCarOrder:model.UserCarOrder = model.UserCarOrder.userCarOrders[ index ];
                if( null == userCarOrder.refreshEndDate || userCarOrder.refreshEndDate / 1000 < GTimer.getInstance().serverTime )
                {
                    continue;
                }
                var interval:number = userCarOrder.refreshEndDate - GTimer.getInstance().serverTime;
                if( interval <= 0 )
                {
                    userCarOrder.refreshEndDate = null;
                    model.UserCarOrder.refreshCarOrder( userCarOrder, false );
                }
            }
        }

        public childrenCreated():void
        {
            this.isChildrenCreated = true;
            this.firstDialog.text = Language.getString( 0, 8 );
            this.itemList = [
                this[ 'item0' ], this[ 'item1' ], this[ 'item2' ], this[ 'item3' ],
                this[ 'item4' ], this[ 'item5' ], this[ 'item6' ], this[ 'item7' ]
            ];
            this.createTypeFont();
            this.onShow();

            if( OrderGuideController.getInstance().isInOrderGuide() )
            {
                this.setChoose( this.itemList[ 0 ] );
            }
        }
        public setChoose( item:game.OrderItemRender ):void
        {
            this.firstDialog.visible = false;
            if( null != this.currentItem )
            {
                this.currentItem.setUnchecked();
            }
            this.currentItem = item;
            this.currentItem.setChecked();
            this.chooseOrderId = this.currentItem.data.orderId;

            var serverTime:number = GTimer.getInstance().serverTime;
            if( null != this.currentItem.data.refreshEndDate && this.currentItem.data.refreshEndDate / 1000 > serverTime )
            {
                this.orderNew.visible = true;
                this.orderNew.onShow( this.chooseOrderId );
                this.orderDetail.visible = false;
                this.orderDetail.onClose();

                this.dialogBg.visible = false;
                this.typeFont.visible = false;
                this.npc.visible = false;
            }
            else
            {
                this.orderNew.visible = false;
                this.orderNew.onClose();
                this.orderDetail.visible = true;
                this.orderDetail.onShow( this.chooseOrderId );

                this.dialogBg.visible = true;
                this.typeFont.visible = true;
                this.npc.visible = true;
                var chooseStr:string = model.NpcDialog.getDialogById( this.currentItem.data.dialogId );
                this.typeFont.update( chooseStr );
                this.npc.source = NPCModel.getNPCById( this.currentItem.data.npcId ).body;
            }
        }
        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void
        {
            super.partAdded(partName, instance);
            if( 'item' == partName.substr( 0, 4 ) )
            {
                var orderId:number = Number( partName.charAt( 4 ) ) + 1;//定单id从 1 开始
                instance.data = model.UserCarOrder.getOrderById( orderId );
                instance.setAvatar();
            }
        }

        /**
         * 创建 npc 对话
         * @param message
         */
        private createTypeFont():void
        {
            this.typeFont = new game.TypeFont( '' );
            this.typeFont.setFormat( { width:290, height:48, delay:50 } );
            this.typing.source = this.typeFont;
        }
        checkItemNum():void
        {
            for( var index:number = 0, contentNum = this.itemList.length; index < contentNum; index++ )
            {
                var item:any = this.itemList[ index ];
                if( null == item )
                {
                    console.log( index + ':是null; OrderPanel::checkItemNum()');
                    continue;
                }
                item.dataChanged();
                item.tween();
            }
        }

        public getCompleteBtn():egret.DisplayObject
        {
            return this.orderDetail.getCompleteBtn();
        }
    }
}
