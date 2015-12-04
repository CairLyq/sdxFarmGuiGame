/**
 * Created by rodey on 14/12/4.
 *
 * gui BUTTON基类
 */

module game{

    export class GuiButtonBase extends egret.gui.Button{

        //追加一个UIAsset (作为bj)
        public btnAsset: egret.gui.UIAsset;
        private _btnAsset: egret.Texture;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Buttons.GuiButtonBaseSkin;
        }

        /**
         * 设置按钮背景
         * @returns {egret.Texture}
         */
        public get asset(): egret.Texture{
            return this._btnAsset;
        }
        public set asset(value: egret.Texture){
            if(value == this._btnAsset)
                return;
            this._btnAsset = value;
            if(this.btnAsset){
                this.btnAsset.source = value;
            }
        }



        /**
         * 继承实现
         * @param partName
         * @param instance
         */
        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(instance == this.btnAsset){
                //初始化滚动组建
                this.btnAsset.source = this._btnAsset;
            }else if(this.labelDisplay){
            }
        }


    }

}
