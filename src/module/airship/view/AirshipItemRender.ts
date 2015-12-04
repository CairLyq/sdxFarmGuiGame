/**
 * Created by Gordon on 14/April/15.
 * @class AirshipItemRender
 * @constructor
 **/
module view
{
    export class AirshipItemRender extends egret.gui.ItemRenderer
    {
        public choosen:egret.gui.UIAsset;
        private empty:egret.gui.UIAsset;
        private sealed:egret.gui.UIAsset;
        private item:egret.gui.UIAsset;
        private pack:egret.gui.UIAsset;

        private packY:number = -54;
        private packEndY:number = 1;

        constructor()
        {
            super();
            this.skinName = skins.uicompenet.airship.AirshipItemSkin;
            this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onClick, this );
        }

        private onClick( e:egret.TouchEvent ):void
        {
            SoundMgr.instance.playAudio(SoundName.ITEM_SELECTED);
            this.choosen.visible = true;
            AirshipPanel.intance.setItem( this.itemIndex );
        }

        public childrenCreated():void
        {
            this.choosen.visible = false;
        }

        public packItem():void
        {
            this.pack.y = this.packY;
            this.pack.visible = true;

            egret.Tween.get( this.pack ).to( { y:this.packEndY }, 400 ).call( ()=>{
                this.pack.visible = false;
                this.item.visible = this.empty.visible = false;
                this.sealed.visible = true;
                this.data.status = 1;
            })
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

            var shipOrder:model.UserShipOrder = this.data;

            var model:DepotModel = DepotModel.getModelById( shipOrder.itemId );
            this.item.source = model.imgId;

            this.item.visible = this.empty.visible = ( 0 == shipOrder.status );
            this.sealed.visible = !this.item.visible;
        }

    }
}