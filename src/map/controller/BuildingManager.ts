/**
 * on 2015-03-18
 * by leo
 */
class BuildingManager
{
    public constructor()
    {

    }

    public init(data:any[]):void
    {
        var pos2D:egret.Point;
        var one:any;
        var pos3D:Point3D;
        var mm:ItemIsoModel;
        var building:BuildingIso;
        var len:number = data.length;


        for(var i:number = 0; i < len; i++)
        {
            one = data[i];
            mm = BuildingModel.getModelById(one.buildingId);
            pos2D = PosUtils.getPos(one.position);
            pos3D = new Point3D(pos2D.x, 0, pos2D.y);
            building = BuildingFactory.generate(pos3D, mm);
            Lyrs.LYRS_ITEM_IN_SCENE.addChild(building);

            building.setBottomVisible(false);
            building.setPosByIso();
            building.updateData(one);
            DepthManager.getInstance().addItem(building, false);
            CollisionCheck.getInstance().change(building, MapConst.OP_ADD);
        }
    }

    public dispose():void
    {
        var i:number;
        var buildingList:BuildingIso[] = DepthManager.getInstance().getBuildings();
        var len:number = buildingList.length;
        var building:BuildingIso;

        for(i = 0; i < len; i++)
        {
            building = buildingList[i];
            building.dispose();
        }
    }

    //===============================================================
    private static _instance:BuildingManager;

    public static
    getInstance():BuildingManager
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new BuildingManager();
        }
        return this._instance;
    }
}