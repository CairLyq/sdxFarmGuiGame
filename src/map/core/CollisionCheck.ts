/**
 * on 2014-12-11
 * by leo
 */

class CollisionCheck
{
    public map:number[][];
    public config:number[][] = MapData.data;

    public constructor()
    {

    }

    public init():void
    {
        var i:number;
        var j:number;

        this.map = [];
        for(j = 0; j < MapConst.MAP_SIZE; j++)
        {
            this.map[j] = [];
        }

        for(j = 0; j < MapConst.MAP_SIZE; j++)
        {
            for(i = 0; i < MapConst.MAP_SIZE; i++)
            {
                this.map[j][i] = this.config[i][j];
            }
        }
    }

    //新手引导设置点
    public setPoint(v:number):void
    {
        this.map[VillagerConstant.BP_MX_IN_GUIDE][VillagerConstant.BP_MZ_IN_GUIDE] = v;
        this.map[AnimalConst.BP_MX_IN_GUIDE][AnimalConst.BP_MZ_IN_GUIDE] = v;
    }

    //检测建筑所在的区域
    public check(item:BuildingIso):boolean
    {
        var startCol:number = item.pShort.x;
        var startRow:number = item.pShort.z;

        var i:number;
        var j:number;


        for(j = startCol; j < startCol + item.model.col; j++)
        {
            for(i = startRow; i < startRow + item.model.row; i++)
            {
                //console.log(i, startRow + item.model.row, i < startRow + item.model.row);
                if(MapConst.BUILD_NO_WALK_NO == this.map[j][i])
                //if(MapConst.BUILD_YES_WALK_YES != this.map[j][i])
                {
                    return false;
                }
            }
        }

        return true;
    }


    public change(item:ItemIso, op:string):void
    {
        var startCol:number = item.pShort.x;
        var startRow:number = item.pShort.z;

        var i:number;
        var j:number;


        for(j = startCol; j < startCol + item.model.col; j++)
        {
            for(i = startRow; i < startRow + item.model.row; i++)
            {

                if(MapConst.OP_ADD == op)
                {
                    this.map[j][i] = MapConst.BUILD_NO_WALK_NO;
                    if(MapConst.DEBUG_MAP)
                    {
                        MapDebug.tiles[j][i].setPass();
                    }
                }
                else if(MapConst.OP_REMOVE == op)
                {
                    this.map[j][i] = MapConst.BUILD_YES_WALK_YES;
                    if(MapConst.DEBUG_MAP)
                    {
                        MapDebug.tiles[j][i].setPass();
                    }
                }
            }
        }
    }

    public getState(col:number, row:number):number
    {
        return this.map[col][row];
    }

    public getRandPos():Point3D
    {
        var start:number, end:number;
        var px:number, pz:number;

        start = egret.getTimer();

        var depth:number = 0;
        for(; ;)
        {
            px = RandUtils.getValInRange(23, 76);
            pz = RandUtils.getValInRange(27, 43);
            //px = RandUtils.getVal(MapConst.MAP_SIZE);
            //pz = RandUtils.getVal(MapConst.MAP_SIZE);
            if(this.checkPos(px, pz))
            {
                break;
            }

            depth++;
            if(depth > 100)
            {
                console.log("==========================for too long");
                break;
            }
        }

        end = egret.getTimer();
        //console.log("==========================use time: ", (end - start) * .001);

        return new Point3D(px, 0, pz);
    }

    public checkPos(px:number, pz:number):boolean
    {
        if(MapConst.BUILD_NO_WALK_NO == this.map[px][pz])
        //if(MapConst.BUILD_YES_WALK_YES != this.map[px][pz])
        {
            return false;
        }
        return true;
    }

    //==================================================================
    private static _instance:CollisionCheck;

    public static getInstance():CollisionCheck
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new CollisionCheck();
        }
        return this._instance;
    }
}