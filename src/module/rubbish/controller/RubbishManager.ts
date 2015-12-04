/**
 * on 2015-04-13
 * by leo
 */

class RubbishManager
{
    public constructor()
    {

    }

    public init(data:any[]):void
    {
        var pos2D:egret.Point;
        var one:UserRubbish;
        var pos3D:Point3D;
        var mm:RubbishModel;
        var rubbish:Rubbish;
        var len:number = data.length;
        var i:number;

        for(i = 0; i < len; i++)
        {
            one = new UserRubbish(data[i]);
            mm = RubbishModel.getModelById(one.rubbishId);
            pos2D = PosUtils.getPos(one.position);
            pos3D = new Point3D(pos2D.x, 0, pos2D.y);
            rubbish = new Rubbish(pos3D, mm);
            rubbish.initData(one);
            Lyrs.LYRS_ITEM_IN_SCENE.addChild(rubbish);

            rubbish.setPosByIso();
            DepthManager.getInstance().addItem(rubbish, false);
            CollisionCheck.getInstance().change(rubbish, MapConst.OP_ADD);
        }
    }

    public dispose():void
    {
        var i:number;
        var rubbishList:Rubbish[] = DepthManager.getInstance().getRubbish();
        var len:number = rubbishList.length;
        var rubbish:Rubbish;

        for(i = 0; i < len; i++)
        {
            rubbish = rubbishList[i];
            rubbish.dispose();
        }
    }

    //===============================================================
    private static
        _instance:RubbishManager;

    public static
    getInstance():RubbishManager
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new RubbishManager();
        }
        return this._instance;
    }
}