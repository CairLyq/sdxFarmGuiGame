/**
 * Created by Gordon on 05/March/15.
 * @class MineToolIcon
 * @constructor
 **/
module view
{
    export class MineToolIcon extends  egret.gui.ItemRenderer
    {
        private icon:egret.gui.UIAsset;
        private num:egret.gui.Label;
        private hoeImage:BitmapEx;

        private bombImage:BitmapEx;

        private shovelImage:BitmapEx;

        private moveIcon:BitmapEx;

        public constructor()
        {
            super();
            this.skinName = skins.uicompenet.Commons.ToolIconSkin;
            this.init();
        }

        /**
         * 初始化
         **/
        private init():void
        {
            this.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this );
            //Lyrs.STAGE.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.hoeImage = new BitmapEx( '51_hezuichu', true, false );
            this.bombImage = new BitmapEx( '52_zhayao', true, false );
            this.shovelImage = new BitmapEx( '53_chanzi', true, false );
        }
        private onTouchBegin( e:egret.TouchEvent ):void
        {
            if( UserController.instance.isIndulgeState2() )
            {
                AntiAddictionController.showPanel();
                return;
            }
            if( DepotController.instance.getItemNumByItemId( this.data ) <= 0 )
            {
                var data:Object[] = [{
                    "itemId":this.data,
                    "poor":1,
                    "needNum":1
                }];

                GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_SHORTAGE_BUY, true, {
                    'data':data,
                    'panel':PanelName.MINE_TOOL_PANEL,
                    'param':{"direction":Direction.NONE,alpha:0}
                });
                return;
            }
            var target = e.target;
            if( this.data == 51 )
            {
                this.moveIcon = this.hoeImage;
            }
            else if( this.data == 52 )
            {
                this.moveIcon = this.bombImage;
            }
            else if( this.data == 53 )
            {
                this.moveIcon = this.shovelImage;
            }
            else
            {
                return;
            }

            //UIMgr.instance.closeCurrentPanel();
            this.moveIcon.x = e.stageX;
            this.moveIcon.y = e.stageY;
            Lyrs.LYRS_UI.addChild( this.moveIcon );

            Lyrs.STAGE.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMoveItem, this);
            Lyrs.STAGE.addEventListener(egret.TouchEvent.TOUCH_END, this.toEndItem, this);
        }
        private onTap(e:egret.TouchEvent):void
        {
            if( view.MineBuilding.instance.hitTestPoint( e.stageX, e.stageY, !Global.MQQ_BROWSER ) )
            {
                console.log( 'OK OK OK' );
                Lyrs.STAGE.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
                Lyrs.STAGE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMoveItem, this);
                Lyrs.STAGE.removeEventListener(egret.TouchEvent.TOUCH_END, this.toEndItem, this);
            }
        }
        private toMoveItem(e:egret.TouchEvent):void
        {
            GameEvent.BubbEvent( e );

            this.moveIcon.x = e.stageX;
            this.moveIcon.y = e.stageY;

            if( view.MineBuilding.instance.hitTestPoint( e.stageX, e.stageY, !Global.MQQ_BROWSER ) )
            {
                this.toEndItem( e );
                view.MineBuilding.instance.produce( this.data );

                UIMgr.instance.closeCurrentPanel();

                var needData: any[] = [ { 'itemId': this.data, 'needNum': 1 } ];
                var point: egret.Point = new egret.Point( e.stageX, e.stageY);
                GameEvent.watcher.dispatchEventWith(GameEvent.ITEM_CHANGE_REMOVE, true, new ItemChangeRemove(needData, null, point));
            }
        }
        /**
         * 拖动结束
         * @param evt
         */
        private toEndItem(evt:egret.TouchEvent):void
        {
            GameEvent.BubbEvent(evt);
            Lyrs.STAGE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toMoveItem, this);
            Lyrs.STAGE.removeEventListener(egret.TouchEvent.TOUCH_END, this.toEndItem, this);
            if( null != this.moveIcon && null != this.moveIcon.parent)
            {
                this.moveIcon.parent.removeChild(this.moveIcon);
                this.moveIcon = null;
            }
        }

        /**
         * 数据填充
         */
        public dataChanged():void
        {
            if( null == this.data )
            {
                return;
            }
            this.setTextColor();

            var model:DepotModel = DepotModel.getModelById( this.data );
            this.icon.source = model.imgId;
        }

        public setTextColor():void
        {
            var itemNum:number = DepotController.instance.getItemNumByItemId( this.data );
            this.num.textColor = ( itemNum == 0 ) ? Color.RED : Color.WHITE;
            this.num.text = String( itemNum );
        }
    }
}