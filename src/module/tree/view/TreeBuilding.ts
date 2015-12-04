/**
 * on 2014-12-23
 * by leo
 */

class TreeBuilding extends BuildingIso
{
    public assistLogic:TreeLogic;


    public constructor(pos:Point3D, data:any)
    {
        super(pos, data);

        this.assistLogic = new TreeLogic(this);

    }

    public updateData(param:any):void
    {
        super.updateData(param);
        this.assistLogic.updateState(param);
    }

    public show(posX:number = 0, posY:number = 0, isFocus:boolean = true):void
    {
        super.show();
    }

    public afterFocus():void
    {
        this.assistLogic.show();

    }

    public setImageScale(scale:number):void
    {
        this.imageLyr.scaleX = this.imageLyr.scaleY = scale;
    }

    public get getModel():TreeModel
    {
        return <TreeModel>this.model;
    }
}