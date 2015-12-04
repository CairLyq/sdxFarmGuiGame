/**
 * Created by rodey on 15/1/24.
 */

module game{

    export class ProductComplateItemRender extends egret.gui.ItemRenderer{

        public glowAsset: egret.gui.UIAsset;
        public iconAsset: egret.gui.UIAsset;
        private _isHarvest: boolean = false;

        constructor(){
            super();
            this.skinName = skins.uicompenet.Production.ProductComplateItemRenderSkin;
        }

        public dataChanged(): void{
            this.iconAsset.source = this.data.imgId;
        }

        public partAdded(partName:string, instance:any):void{
            super.partAdded(partName, instance);
            if(this.glowAsset){
                TweenIt.loopTween(this.glowAsset, { alpha: .3 }, { alpha: 1 }, 600);
            }
        }

        public get isHarvest(): boolean{ return this._isHarvest; }
        public set isHarvest(value:boolean){
            if(value == this._isHarvest) return;
            this._isHarvest = value;
        }

    }

}
