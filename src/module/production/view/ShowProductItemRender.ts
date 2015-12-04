/**
 * Created by rodey on 15/1/24.
 */

module game{

    export class ShowProductItemRender extends egret.gui.ItemRenderer{

        public needLabel: egret.gui.Label;
        public currentLabel: egret.gui.Label;
        public iconAsset: egret.gui.UIAsset;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Production.ShowProductItemRenderSkin;

        }

        public dataChanged(): void{
            this.iconAsset.source = this.data.item.imgId;
            this.currentLabel.text = String(this.data.current);
            this.needLabel.text = String(this.data.needNum);
            if(this.data.current >= this.data.needNum){
                this.currentLabel.textColor = 0x68AA35;
            }else{
                this.currentLabel.textColor = 0xC93503;
            }
        }

    }

}
