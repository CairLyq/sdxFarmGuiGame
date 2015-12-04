/**
 * Created by rodey on 15/2/11.
 */

class PagetionItem extends egret.gui.ItemRenderer{

    public iconDisplay: egret.gui.UIAsset;
    private _icon: string;

    constructor(){
        super();
        this.skinName = skins.uicompenet.Commons.PagetionItemSkin;

    }

    public dataChanged(): void{

        this.iconDisplay.source = this.data.imgId;

    }

}