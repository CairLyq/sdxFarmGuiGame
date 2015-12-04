/**
 * on 2014-12-10
 * by leo
 */

class MoveCheck
{

    public constructor()
    {


    }

    public check(last:egret.Point, now:egret.Point):boolean
    {
        var lastIso:Point3D = TransUtils.screenToIso(last);
        var nowIso:Point3D = TransUtils.screenToIso(now);

        if(lastIso.x != nowIso.x || lastIso.z != nowIso.z)
        {
            return true;
        }
        return false;
    }
}