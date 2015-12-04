/**
 * on 2015-04-13
 * by leo
 */

class Rubbish extends ItemIso
{
    private image:egret.Bitmap;

    public data:UserRubbish;

    public constructor(pos:Point3D, paramModel:ItemIsoModel)
    {
        super(pos, paramModel);


        this.image = new egret.Bitmap();
        this.addChild(this.image);
        this.image.texture = RES.getRes(this.getModel.img);
        this.image.x = this.getModel.offsetX;
        this.image.y = this.getModel.offsetY;
    }

    public initData(data:UserRubbish):void
    {
        this.data = data;
    }

    public click():void
    {

        TweenIt.tweenBubble(this, ()=>
        {
            Camera.getInstance().focus(this, ()=>
            {
                TweenIt.loopTween(this, {alpha:.6}, {alpha:1});
            });
        });


        UIMgr.instance.show(PanelName.TOOLS_PANEL, {direction:Direction.NONE, alpha:0}, ToolConst.PICKUP_RUBBISH, this);
    }

    public dispose():void
    {

    }

    public get getModel():RubbishModel
    {
        return <RubbishModel>(this.model);
    }
}