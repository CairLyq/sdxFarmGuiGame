/**
 * on 2014-12-24
 * by leo
 */

class SeedItemRender extends egret.gui.Button
{
    public seedData: any;

    public seedModel:DepotModel;


    //public item_img:egret.gui.UIAsset;
    //public seedNum_lb:egret.gui.Label;
    public lock_img:egret.gui.UIAsset;
    public lock:boolean;

    public constructor()
    {
        super();
        this.skinName = skins.uicompenet.FarmV2.SeedItemRenderV2Skin;
    }

    public partAdded(partName:string, instance:any):void
    {
        super.partAdded(partName, instance);
        if(instance == this.lock_img)
        {
            this.lock_img.visible = this.lock;
        }
    }

}