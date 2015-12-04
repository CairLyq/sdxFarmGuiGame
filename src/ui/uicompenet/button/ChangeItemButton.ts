/**
 * Created by rodey on 15/1/21.
 */

class ChangeItemButton extends egret.gui.Button{

    constructor(icon?: string, label?: string){
        super();
        this.skinName = skins.uicompenet.Buttons.ChangeItemSkin;

        this.icon = icon;
        this.label = label;
    }

}
