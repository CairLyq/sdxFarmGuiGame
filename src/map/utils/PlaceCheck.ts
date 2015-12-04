/**
* on 2014-12-11
* by leo
*/

class PlaceCheck
{
    public map:egret.Rectangle[];
    public constructor()
    {
        this.map = [];
    }

    public check(item:BuildingIso):boolean
    {
        //var data:ItemIsoModel = item.model;
        //var i:number;
        //var j:number;
        //var k:number;
        //var obj:Object;
        //for(i = 0; i < data.row; i++)
        //{
        //    for(j = 0; j < data.col; j++)
        //    {
        //        for(k = 0; k < map.length; k++)
        //        {
        //            obj = map[k];
        //            key = Global.MAP_SIZE * item.pShort.z + tem.pShort.x + j;
        //            if(key == obj.key)
        //            {
        //
        //            }
        //
        //    }
        //}
        return true;
    }

    public add(item:BuildingIso):void
    {
        var rt:egret.Rectangle = new egret.Rectangle(item.pShort.x, item.pShort.z, item.model.row, item.model.col);
        this.map.push(rt);
    }

    private static _instance:PlaceCheck;

    public static getInstance():PlaceCheck
    {
        if(this._instance)
        {
            return this._instance;
        }
        else
        {
            this._instance = new PlaceCheck();
        }
        return this._instance;
    }
}