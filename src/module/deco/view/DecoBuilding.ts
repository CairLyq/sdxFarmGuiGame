/**
 * on 2015-05-05
 * by leo
 */

class DecoBuilding extends BuildingIso
{
    public constructor(pos:Point3D, paramModel:BuildingModel)
    {
        super(pos, paramModel);
    }

    public show(posX:number = 0, posY:number = 0, isFocus:boolean = true):void
    {
        TweenIt.tweenBubble(this, ()=>
        {
            Camera.getInstance().focus(this, ()=>
            {
                TweenIt.loopTween(this, {"alpha":MapConst.ALPHA_START}, {"alpha":MapConst.ALPHA_END}, MapConst.ALPHA_TIME);
            });

        });

        DecoController.getInstance().showSellUI(this);
    }

    public get getModel():BuildingModel
    {
        return <BuildingModel>this.model;
    }
}