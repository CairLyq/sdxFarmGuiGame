/**
 * on 2014-12-23
 * by leo
 */

class FarmBuilding extends BuildingIso
{
    public stateLyr:egret.DisplayObjectContainer;
    //public cropState:egret.Bitmap;
    //===================================================
    public assistLogic:FarmLogic;


    public constructor(pos:Point3D, paramModel:BuildingModel)
    {
        super(pos, paramModel);
        //
        this.stateLyr = new egret.DisplayObjectContainer();
        this.addChild(this.stateLyr);
        //this.cropState = new egret.Bitmap();
        //this.stateLyr.addChild(this.cropState);


        this.assistLogic = new FarmLogic(this);
    }

    public updateData(param:any):void
    {
        super.updateData(param);

        this.assistLogic.updateState(param.product);
    }

    public show(posX:number = 0, posY:number = 0, isFocus:boolean = true):void
    {
        GuideManager.getInstance().addForbiden();

        super.show();
    }

    public afterFocus():void
    {
        super.afterFocus();

        this.assistLogic.show();
    }
}