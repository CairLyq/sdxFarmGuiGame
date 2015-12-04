/**
 * Created by rodey on 15/1/4.
 */

module game{

    export class UserUpgradeGainItem extends egret.gui.ItemRenderer{

        public iconAsset: egret.gui.UIAsset;
        public gainAsset: egret.gui.Group;
        public numBmpLabel: egret.gui.BitmapLabel;
        public newAsset: egret.gui.UIAsset;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Main.UserUpgradeGainItemSkin;

        }

        public dataChanged(): void{

            if(this.newAsset){
                this.newAsset.visible = this.data.itemNew;
            }

            if(this.iconAsset){
                this.iconAsset.source = this.data.imgId;
            }

            if(this.numBmpLabel){
                console.log(this.data.itemNum);
                this.numBmpLabel.text = String(this.data.itemNum);
            }

        }


    }

}
