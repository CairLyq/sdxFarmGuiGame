/**
 * Created by rodey on 14/12/5.
 *
 * 带有图标按钮
 *
 */

module game{

    export class IconRadioButton extends egret.gui.RadioButton{

        //追加一个图标
        public iconAsset: egret.gui.UIAsset;
        private _icon: egret.Texture;

        //追加一个 tip 图标
        public tipIconAsset: egret.gui.UIAsset;
        private _tipIcon: egret.Texture;

        //追加一个 tip 文本
        public tipIconLabel: egret.gui.Label;
        private _tipText: string;

        //追加一个 索引 文本
        public indexLabel: egret.gui.Label;
        private _index: number;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Buttons.IconRadioButtonSkin;
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
                if(value){
                    this.tipIconAsset.source = value;
                }
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
         * 设置索引上的文字
         * @returns {string}
         */
        public get index(): number{
            return this._index;
        }
        public set index(value: number){
            if(value == this._index)
                return;
            this._index = value;
            if(this.indexLabel){
                this.indexLabel.text = String(value);
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
            }else if(instance == this.tipIconAsset){
                this.tipIconAsset.source = this._tipIcon;
            }else if(instance == this.tipIconLabel){
                this.tipIconLabel.text = this._tipText;
            }else if(instance == this.indexLabel){
                this.indexLabel.text = String(this._index);
                this.indexLabel.alpha = 0;
            }

        }


    }

}
