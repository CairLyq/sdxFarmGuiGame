/**
 * Created by rodey on 14/12/5.
 *
 * 商店内容  购买金币 item
 */


module game {


    export class BuyZSItemRender extends egret.gui.ItemRenderer{

        //追加一个 商品图
        public imgId: egret.gui.UIAsset;
        private _image: string;

        //追加一个 数量显示
        public incomeLabel: egret.gui.Label;
        private _incomeText: string;

        //追加一个 数量显示
        public giveLabel: egret.gui.Label;
        private _giveText: string;

        //追加一个 价格
        public priceLabel: egret.gui.Label;
        private _priceText: string;

        constructor(){
            super();
            this.skinName = skins.uicompenet.BuyGold.BuyZSItemRenderSkin;

            this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
        }

        /**
         * 默认处理数据填充函数，
         * 覆写
         */
        public dataChanged():void
        {
            //console.log(this.data);
            this.imgId.source = RES.getRes(this.data.imgId);
            this.incomeLabel.text = String(this.data.diamondBuy);
            this.priceLabel.text = '￥ ' + this.data.money;
            this.giveLabel.text = String('+' + this.data.diamondBonus); //'+' + Math.floor(this.data.diamondBonus / this.data.diamondBuy * 100) + '%';
        }
        private onTap( e:egret.TouchEvent ):void
        {
            Pay.createOrder()
        }
    }
}
