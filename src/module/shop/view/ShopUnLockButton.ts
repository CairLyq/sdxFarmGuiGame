/**
* Created by rodey on 15/1/23.
*/

module game {

    export class ShopUnLockButton extends egret.gui.Button{

        private _text: string;
        public unlevelBmplabel: egret.gui.BitmapLabel;
        public levelAsset: egret.gui.UIAsset;
        public upperLabel: egret.gui.Label;
        private cb: Function;

        constructor(text?: string, cb?: Function){
            super();
            this.skinName = skins.uicompenet.Shopping.ShopUnLockButtonSkin;

            this._text = text;
            this.cb = cb;
        }

        public get text(): string{
            return this._text;
        }
        public set text(value: string){
            if(value == this._text)
                return;
            this._text = value;
            if(this.unlevelBmplabel){
                this.unlevelBmplabel.text = value;
            }
        }

        public partAdded(partName: string, instance: any): void{
            super.partAdded(partName, instance);

            if(instance == this.unlevelBmplabel){
                this.unlevelBmplabel.text = this._text;

                this.cb.apply(this);

            }
            else if(instance == this.levelAsset){
                //this.levelAsset.visible = false;
            }
            else if(instance == this.upperLabel){
                this.upperLabel.visible = false;
            }
        }


    }

}
