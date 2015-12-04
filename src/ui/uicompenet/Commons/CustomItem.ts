/**
 * on 2015-01-08
 * by leo
 */

class CustomItem extends egret.gui.SkinnableComponent
{

    public item_img:egret.gui.UIAsset;
    public num_lb:egret.gui.Label;

    public constructor()
    {
        super();
        this.skinName = skins.uicompenet.Commons.CustomItemSkin;

    }

    public partAdded(partName:string, instance:any):void
    {
        super.partAdded(partName, instance);

        if(instance == this.item_img)
        {

        }
        else if(instance == this.num_lb)
        {

        }
    }
}