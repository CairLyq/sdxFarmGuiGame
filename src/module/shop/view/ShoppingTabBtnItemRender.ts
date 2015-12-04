/**
 * Created by rodey on 14/12/5.
 *
 * 商店 tab按钮 item
 */

module game{

    export class ShoppingTabBtnItemRender extends egret.gui.ItemRenderer{

        //追加一个图标
        public bgAsset: egret.gui.UIAsset;
        private _bgIcon: egret.Texture;

        //追加一个图标
        public iconAsset: egret.gui.UIAsset;
        private _icon: egret.Texture;

        //追加一个 tip 图标
        public tipIconAsset: egret.gui.UIAsset;
        private _tipIcon: egret.Texture;

        //追加一个 tip 文本
        public tipIconLabel: egret.gui.Label;
        private _tipText: string;

        //


        constructor(){
            super();
            this.skinName = skins.uicompenet.Shopping.ShoppingTabBtnItemRenderSkin;
            this.touchEnabled = true;
        }

        /**
         * 设置 按钮背景
         * @returns {egret.Texture}
         */
        public get bgIcon(): egret.Texture{
            return this._bgIcon;
        }
        public set bgIcon(value: egret.Texture){
            if(value == this._bgIcon)
                return;
            this._bgIcon = value;
            if(this.bgAsset){
                this.bgAsset.source = value;
            }
        }


        /**
         * 设置 按钮图标
         * @returns {egret.Texture}
         */
        public get icon(): egret.Texture{
            return this._icon;
        }
        public set icon(value: egret.Texture){
            if(value == this._icon)
                return;
            this._icon = value;
            if(this.iconAsset){
                this.iconAsset.source = value;
            }
        }

        /**
         * 设置图标标识
         * @returns {egret.Texture}
         */
        public get tipIcon(): egret.Texture{
            return this._tipIcon;
        }
        public set tipIcon(value: egret.Texture){
            if(value == this._tipIcon)
                return;
            this._tipIcon = value;
            if(this.tipIconAsset){
                this.tipIconAsset.source = value;
            }
        }

        /**
         * 设置图标上的文字
         * @returns {string}
         */
        public get tipText(): string{
            return this._tipText;
        }
        public set tipText(value: string){
            if(value == this._tipText)
                return;
            this._tipText = value;
            if(this.tipIconLabel){
                this.tipIconLabel.text = value;
            }
        }

        /**
         * 默认处理数据填充函数，
         * 覆写
         */
        public dataChanged():void{
            //console.log(this.data);
            //设置主图标
            this.iconAsset.source = this.data.icon;

            //设置图标标识
            if(this.data.tipIcon){
                this.tipIconAsset.source = this.data.tipIcon;
            }
            //设置标识文字
            if(this.data.tipText && '' != this.data.tipText){
                this.tipIconLabel.text = this.data.tipText;
            }

        }


        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);

            if(instance == this.bgAsset){
                this.bgAsset.touchEnabled = true;
            }
        }

    }

}
