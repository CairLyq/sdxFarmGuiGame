/**
 * Created by rodey on 14/12/5.
 *
 * 带有图标按钮
 *
 */

module game{

    export class IconButton extends egret.gui.Button{

        //追加一个图标
        public iconAsset: egret.gui.UIAsset;
        private _icon: egret.Texture;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Buttons.IconButtonSkin;
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
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);

            if(instance == this.iconAsset){
                this.iconAsset.source = this._icon;
            }

        }


    }

}
