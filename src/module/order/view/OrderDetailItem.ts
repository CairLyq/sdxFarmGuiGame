/**
 * Created by Gordon on 14/12/19.
 *
 * 定单 item
 */
module game{
    export class OrderDetailItem extends egret.gui.ItemRenderer
    {
        private itemId:number;
        private itemNum:number;
        private itemConditionNum:number;
        public num:egret.gui.Label;
        public propIcon:egret.gui.UIAsset;
        private ready:egret.gui.UIAsset;

        constructor()
        {
            super();
            this.skinName = skins.uicompenet.Order.OrderDetailItemSkin;
        }

        /**
         * 数据填充
         */
        public dataChanged():void
        {
            if( null == this.data || "" == this.data )
            {
                return;
            }
            var items:any[] = this.data.split( "*" );
            this.itemId = Number( items[ 0 ] );
            this.itemConditionNum = Number( items[ 1 ] );
            var item = DepotController.instance.searchLocalDataAsItemId( this.itemId );
            this.itemNum = ( null == item ) ? 0 : item.itemNum;
            this.num.text = this.itemNum + ' / ' + this.itemConditionNum;

            if( this.itemNum >= this.itemConditionNum )
            {
                this.num.textColor = Color.GREEN;
                this.ready.visible = true;
            }
            else
            {
                this.num.textColor = Color.GRAY;
                this.ready.visible = false;
            }
            var model:DepotModel = DepotModel.getModelById( this.itemId );
            this.propIcon.source = model.imgId;
        }
    }
}