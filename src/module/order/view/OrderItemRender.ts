/**
 * Created by Gordon on 14/12/19.
 *
 * 定单 item
 */
module game
{
    export class OrderItemRender extends egret.gui.ItemRenderer
    {
        private orderPanel:game.OrderPanel;
        private unfinished:egret.gui.UIAsset;
        private finished:egret.gui.UIAsset;
        private choose:egret.gui.UIAsset;
        private wait:egret.gui.UIAsset;
        private chooseWait:egret.gui.UIAsset;
        private avatar:egret.gui.UIAsset;

        private choosen:boolean = false;

        constructor()
        {
            super();
            this.skinName = skins.uicompenet.Order.OrderItemRenderSkin;
            this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onClick, this );
        }

        private onClick( e:egret.TouchEvent ):void
        {
            //播放音效
            SoundMgr.instance.playAudio(SoundName.ITEM_SELECTED);

            this.orderPanel.setChoose( this );
        }
        public setChecked():void
        {
            this.choosen = true;
            this.dataChanged();
        }
        public setUnchecked():void
        {
            this.choosen = false;
            this.dataChanged();
        }

        public childrenCreated():void
        {
            this.orderPanel = UIMgr.instance.getPanel( PanelName.ORDER_PANEL );
            Icon.setAnchor( this );
        }

        public setAvatar():void
        {
            this.avatar.source = NPCModel.getNPCById( this.data.npcId ).head;
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
            var serverTime:number = GTimer.getInstance().serverTime;
            if( null != this.data.refreshEndDate && this.data.refreshEndDate / 1000 > serverTime )
            {   //等待
                this.killTween();
                this.wait.visible = !this.choosen;
                this.chooseWait.visible = this.choosen;
                this.choose.visible = false;
                this.unfinished.visible = false;
                this.finished.visible = false;
                this.avatar.visible = false;
                return;
            }
            this.wait.visible = false;
            this.chooseWait.visible = false;
            this.avatar.visible = true;

            var items:string[] = String( this.data.items ).split( ';' );
            for( var idx:number = 0; idx < items.length; idx++ )
            {
                var itemStr:any[] = items[ idx ].split( "*" );
                var item = DepotController.instance.searchLocalDataAsItemId( Number( itemStr[ 0 ] ) );
                var achieve:boolean = ( ( null == item ) ? 0 : item.itemNum ) >= Number( itemStr[ 1 ] );
                if( !achieve )
                {
                    this.finished.visible = false;
                    this.unfinished.visible = true;
                    this.choose.visible = this.choosen;
                    return;
                }
            }
            this.finished.visible = true;
            this.unfinished.visible = false;
            this.choose.visible = this.choosen;
        }
        public tween():void
        {
            if( this.finished.visible )
            {
                TweenIt.loopTween( this , {"scaleX":1.2, "scaleY":1.2}, {"scaleX":1, "scaleY":1} );
            }
        }
        public killTween():void
        {
            if( this.finished.visible )
            {
                egret.Tween.removeTweens( this );
            }
        }
    }
}